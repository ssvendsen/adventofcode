const solve = (input) => {

    const nibbles = input.split("").map(c => parseInt(c, 16));

    class BitStream {
        constructor(nibbles) {
            this.nibbles = nibbles;
            this.bitOffset = 0;
        }
        peek = (bitCount) => {
            const offsetInNibble = this.bitOffset % 4;
            let nibbleOffset = (this.bitOffset - offsetInNibble) / 4;
            let output = this.nibbles[nibbleOffset++];
            output &= (0xF >> offsetInNibble);
            bitCount -= (4 - offsetInNibble);
            while (bitCount > 0) {
                output <<= 4;
                output |= this.nibbles[nibbleOffset++];
                bitCount -= 4;
            }
            output >>= -bitCount;
            return output;
        }
        read = (bitCount) => {
            const output = this.peek(bitCount);
            this.bitOffset += bitCount;
            return output;
        }
        position = () => {
            return this.bitOffset;
        }
    }

    const LITERAL = 4;

    const readPacket = (stream) => {
        const version = stream.read(3);
        const type = stream.read(3);
        if (type === LITERAL) {
            let cont = true;
            let value = 0;
            while (cont) {
                cont = stream.read(1) != 0;
                const nibble = stream.read(4);
                value = (value * 16) + nibble; // https://stackoverflow.com/questions/56702181/using-bitwise-operators-with-large-numbers-in-javascript
            }
            return { version, type, value };
        } else {
            const packets = [];
            const lengthType = stream.read(1);
            if (lengthType === 0) {
                const subStreamLength = stream.read(15);
                const subStreamEnd = stream.position() + subStreamLength;
                while (stream.position() < subStreamEnd) {
                    const packet = readPacket(stream);
                    packets.push(packet);
                }
                if (stream.position() !== subStreamEnd) {
                    throw "stream misalignment";
                }
            } else {
                let subPacketCount = stream.read(11);
                while (subPacketCount-- > 0) {
                    const packet = readPacket(stream);
                    packets.push(packet);
                }
            }
            return { version, type, packets };
        }
    }

    const sumVersions = (packet) => {
        if (packet.type === LITERAL) {
            return packet.version;
        } else {
            const versions = packet.packets.map(p => sumVersions(p));
            return packet.version + versions.reduce((sum, v) => sum + v, 0);
        }
    }

    const operator = (type, values) => {
        switch (type) {
            case 0:
                return values.reduce((sum, v) => sum + v, 0);
            case 1:
                return values.reduce((product, v) => product * v, 1);
            case 2:
                return Math.min(...values);
            case 3:
                return Math.max(...values);
            case 5:
                return values[0] > values[1] ? 1 : 0;
            case 6:
                return values[0] < values[1] ? 1 : 0;
            case 7:
                return values[0] === values[1] ? 1 : 0;
            default:
                throw "Unknown packet type";
        }
    }

    const evaluate = (packet) => {
        if (packet.type === LITERAL) {
            return packet.value;
        } else {
            const {type, packets} = packet;
            const values = packets.map(p => evaluate(p));
            const result = operator(type, values);
            return result;
        }
    }
  
    const stream = new BitStream(nibbles);
    const packet = readPacket(stream);

    const result1 = sumVersions(packet);
    const result2 = evaluate(packet);

    return [result1, result2];
}

const literalPacketExample = `D2FE28`;
const operatorPacketExample1 = `38006F45291200`;
const operatorPacketExample2 = `EE00D40C823060`;
const lastVersionSumExample = `A0016C880162017C3686B18A3D4780`;
const lastEvaluateExample = `9C0141080250320F1802104A08`;
const challenge = `E054831006016008CF01CED7CDB2D495A473336CF7B8C8318021C00FACFD3125B9FA624BD3DBB7968C0179DFDBD196FAE5400974A974B55C24DC580085925D5007E2D49C6579E49252E28600B580272379054AF57A54D65E1586A951D860400434E36080410926624D25458890A006CA251006573D2DFCBF4016919CC0A467302100565CF24B7A9C36B0402840002150CA3E46000042621C108F0200CC5C8551EA47F79FC28401C20042E0EC288D4600F42585F1F88010C8C709235180272B3DCAD95DC005F6671379988A1380372D8FF1127BDC0D834600BC9334EA5880333E7F3C6B2FBE1B98025600A8803F04E2E45700043E34C5F8A72DDC6B7E8E400C01797D02D002052637263CE016CE5E5C8CC9E4B369E7051304F3509627A907C97BCF66008500521395A62553A9CAD312A9CCCEAF63A500A2631CCD8065681D2479371E4A90E024AD69AAEBE20002A84ACA51EE0365B74A6BF4B2CC178153399F3BACC68CF3F50840095A33CBD7EF1393459E2C3004340109596AB6DEBF9A95CACB55B6F5FCD4A24580400A8586009C70C00D44401D8AB11A210002190DE1BC43872C006C45299463005EC0169AFFF6F9273269B89F4F80100507C00A84EB34B5F2772CB122D26016CA88C9BCC8BD4A05CA2CCABF90030534D3226B32D040147F802537B888CD59265C3CC01498A6B7BA7A1A08F005C401C86B10A358803D1FE24419300524F32AD2C6DA009080330DE2941B1006618450822A009C68998C1E0C017C0041A450A554A582D8034797FD73D4396C1848FC0A6F14503004340169D96BE1B11674A4804CD9DC26D006E20008747585D0AC001088550560F9019B0E004080160058798012804E4801232C0437B00F70A005100CFEE007A8010C02553007FC801A5100530C00F4B0027EE004CA64A480287C005E27EEE13DD83447D3009E754E29CDB5CD3C`;

//console.log(solve(literalPacketExample)); 
//console.log(solve(operatorPacketExample1)); 
//console.log(solve(operatorPacketExample2)); 
//console.log(solve(lastVersionSumExample)); 
//console.log(solve(lastEvaluateExample)); 
console.log(solve(challenge)); 
