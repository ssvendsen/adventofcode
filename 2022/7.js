const acc = (a, b) => a + b;

const solve = (input) => {

    const lines = input.split("\n");

    const blocks = [];
    Object.defineProperty(blocks, "last", {
        get: function() {
            return this[this.length - 1];
        }
    });

    while (lines.length > 0) {
        const line = lines.shift();
        if (line.charAt(0) === "$") {
            const block = [line];
            blocks.push(block);
        } else {
            blocks.last.push(line);
        }
    }

    const path = [];
    const dirs = {};
    let cwd = "";

    while (blocks.length > 0) {
        const block = blocks.shift();
        const command = block.shift();
        const tokens = command.split(" ");
        if (tokens.shift() !== "$") { throw "Error"; }
        switch (tokens.shift()) {
            case "cd": {
                const dir = tokens.shift();
                if (dir === "..") {
                    const totals = dirs[cwd].reduce(acc, 0);
                    path.pop();
                    cwd = path.join("/");
                    dirs[cwd].push(totals);
                } else {
                    path.push(dir);
                    cwd = path.join("/");
                }
                if (! (cwd in dirs)) {
                    dirs[cwd] = [];
                }
                break;
            }
            case "ls": {
                while (block.length > 0) {
                    const line = block.shift();
                    const [attr, item] = line.split(" ");
                    if (attr === "dir") {
                        //
                    } else {
                        const fileSize = parseInt(attr);
                        dirs[cwd].push(fileSize);
                    }
                }
                break;
            }
            default:
                throw "Error";
        }

    };

    // ensure we're back at root
    while (path.length > 1) {
        const totals = dirs[cwd].reduce(acc, 0);
        path.pop();
        cwd = path.join("/");
        dirs[cwd].push(totals);
    }


    const paths = Object.keys(dirs).sort().reverse(); 
    const dirSizes = paths.map(path => dirs[path].reduce(acc, 0));
    const result1 = dirSizes.filter(s => s <= 100000).reduce(acc, 0);

    dirSizes.sort((a, b) => a - b);
    const needToFree = 30_000_000 - (70_000_000 - dirSizes[dirSizes.length - 1]);
    const result2 = dirSizes.find(size => size >= needToFree);

    return [result1, result2];
}

const example = 
`$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k`;

const challenge = 
`$ cd /
$ ls
dir cwdpn
dir drzllllv
dir fqflwvh
dir jczm
dir jstfcllw
dir lhltq
dir llpmvt
dir tgmt
dir wcbq
$ cd cwdpn
$ ls
dir mnm
dir nmsvc
dir rgbdq
$ cd mnm
$ ls
82227 grgj
dir plldwn
dir rtpjd
dir shvplq
$ cd plldwn
$ ls
114478 gtpgsvv.jch
58874 gzggrfm.rtw
247491 nrsrmplp
114552 nzrdgsgm.fzh
dir prwm
$ cd prwm
$ ls
269910 rpglpmr.zbh
$ cd ..
$ cd ..
$ cd rtpjd
$ ls
dir pnrbvd
65341 wfjltczw.qnc
$ cd pnrbvd
$ ls
99117 rpglpmr.zbh
$ cd ..
$ cd ..
$ cd shvplq
$ ls
192167 glghcqs
182737 gvzbt
175694 pnrbvd
93278 tmz
$ cd ..
$ cd ..
$ cd nmsvc
$ ls
dir bjnvmpc
59203 czqnrq
dir jstfcllw
dir jtqgbwhb
dir ltqjb
49699 qrjzrq
221657 rmfqqbsj.rzn
45989 rzbgdgp.rpn
dir tmrn
dir vzvwphz
$ cd bjnvmpc
$ ls
181885 gclrw.gzs
dir gfjts
dir hqlmzshr
dir smqzqrm
$ cd gfjts
$ ls
236177 grgj
$ cd ..
$ cd hqlmzshr
$ ls
228388 gpqcdjhl.ctd
$ cd ..
$ cd smqzqrm
$ ls
170034 dqvvd
$ cd ..
$ cd ..
$ cd jstfcllw
$ ls
dir bjnvmpc
$ cd bjnvmpc
$ ls
dir fmjlrc
204754 lzd
48598 pnrbvd
211685 vmn
$ cd fmjlrc
$ ls
169343 rpglpmr.zbh
$ cd ..
$ cd ..
$ cd ..
$ cd jtqgbwhb
$ ls
dir bjnvmpc
dir ddjpm
dir fmtpwm
179486 rqplnfz.dpq
$ cd bjnvmpc
$ ls
dir dbglngc
76133 pnrbvd.tsw
dir rdb
266667 strq.pjn
242869 zvzhfjq.vwv
$ cd dbglngc
$ ls
dir hbfbvdr
dir tlsd
253571 wddhnvl.lsq
$ cd hbfbvdr
$ ls
36586 nmsvc.mpf
$ cd ..
$ cd tlsd
$ ls
78854 phd.phb
$ cd ..
$ cd ..
$ cd rdb
$ ls
102680 drz.gjs
$ cd ..
$ cd ..
$ cd ddjpm
$ ls
227450 cbc.rtp
71376 ltnhnzg.gqb
86244 vpr
$ cd ..
$ cd fmtpwm
$ ls
dir ggpctlh
65644 grgj
92435 swffpq.nnc
$ cd ggpctlh
$ ls
104193 gdc
dir rdmgrtzl
$ cd rdmgrtzl
$ ls
28086 swffpq.nnc
$ cd ..
$ cd ..
$ cd ..
$ cd ..
$ cd ltqjb
$ ls
dir jstfcllw
dir qjgbt
dir rstzf
$ cd jstfcllw
$ ls
165962 rsrsnh.fjf
$ cd ..
$ cd qjgbt
$ ls
dir vjrdcjbr
$ cd vjrdcjbr
$ ls
dir swvlpql
dir wmm
$ cd swvlpql
$ ls
dir lqrf
dir nmsvc
dir wnvtfmfw
$ cd lqrf
$ ls
26615 hbjtfmfw.bbs
$ cd ..
$ cd nmsvc
$ ls
23820 bpfj
77703 llpmvt.hhm
220326 tbbvnzvq
$ cd ..
$ cd wnvtfmfw
$ ls
109078 rpglpmr.zbh
$ cd ..
$ cd ..
$ cd wmm
$ ls
dir nmsvc
$ cd nmsvc
$ ls
285836 zqhwwt.vnj
$ cd ..
$ cd ..
$ cd ..
$ cd ..
$ cd rstzf
$ ls
dir bjnvmpc
dir fwmvpthq
dir llpmvt
dir mpz
226698 qfnjbcb.pdr
dir qpvnfl
dir rmrngqdg
234472 swffpq.nnc
$ cd bjnvmpc
$ ls
118290 jstfcllw.wgq
dir mtctn
dir rjcpn
dir tbrccw
$ cd mtctn
$ ls
230555 jstfcllw
dir nfb
dir pfqv
$ cd nfb
$ ls
dir bqjczmcr
dir brhvhl
227496 grgj
154342 mjwp
$ cd bqjczmcr
$ ls
19020 fzqd
$ cd ..
$ cd brhvhl
$ ls
255839 vtvhvh
$ cd ..
$ cd ..
$ cd pfqv
$ ls
155078 ftccr.qlz
$ cd ..
$ cd ..
$ cd rjcpn
$ ls
180441 fvr.smf
dir ggjrm
dir llpmvt
139942 npbmlv.zst
237442 rjg.jqj
192628 wnwgz.qjp
$ cd ggjrm
$ ls
dir drjzphm
$ cd drjzphm
$ ls
188844 wbzh.nzw
$ cd ..
$ cd ..
$ cd llpmvt
$ ls
dir bhdpfpb
dir jstfcllw
10806 llpmvt.ldp
31293 nmsvc
dir pvz
dir qntnwf
$ cd bhdpfpb
$ ls
78642 wjlwf
$ cd ..
$ cd jstfcllw
$ ls
234658 qrdfwls.ncz
$ cd ..
$ cd pvz
$ ls
194879 nfjsfjvt.zln
$ cd ..
$ cd qntnwf
$ ls
225789 mngq.qqb
$ cd ..
$ cd ..
$ cd ..
$ cd tbrccw
$ ls
dir llpmvt
dir nmsvc
136331 npbmlv.zst
130573 rpglpmr.zbh
dir scpwzh
$ cd llpmvt
$ ls
dir bjnvmpc
$ cd bjnvmpc
$ ls
271647 cdt.scr
$ cd ..
$ cd ..
$ cd nmsvc
$ ls
185622 llpmvt
102596 npbmlv.zst
240 wnwgz.qjp
157313 zlgplvb
$ cd ..
$ cd scpwzh
$ ls
270091 tncccs.lgn
$ cd ..
$ cd ..
$ cd ..
$ cd fwmvpthq
$ ls
dir llpmvt
dir nmsvc
dir ntmfpmr
109316 png.zts
dir pnrbvd
90010 qnqjmn
193177 rpglpmr.zbh
283398 rwvbqll.gvg
dir shgtbbfw
$ cd llpmvt
$ ls
dir bgvjb
59723 fblf.dlq
$ cd bgvjb
$ ls
dir gjtj
dir nmsvc
dir wrwsn
$ cd gjtj
$ ls
74258 mqd.jpq
$ cd ..
$ cd nmsvc
$ ls
227910 dqcl.gzn
286951 llpmvt.sdv
$ cd ..
$ cd wrwsn
$ ls
191813 qjhfjfmb.dms
$ cd ..
$ cd ..
$ cd ..
$ cd nmsvc
$ ls
7096 llpmvt.tms
102123 nfgvtghz.gws
160466 swffpq.nnc
$ cd ..
$ cd ntmfpmr
$ ls
266774 llpmvt
$ cd ..
$ cd pnrbvd
$ ls
dir bbpq
dir nmsvc
181175 pnrbvd.bmg
164233 qpw.vtm
$ cd bbpq
$ ls
125821 nbc
$ cd ..
$ cd nmsvc
$ ls
40100 wthm.twj
$ cd ..
$ cd ..
$ cd shgtbbfw
$ ls
dir zpjqjtsl
$ cd zpjqjtsl
$ ls
112507 wnwgz.qjp
$ cd ..
$ cd ..
$ cd ..
$ cd llpmvt
$ ls
199105 gvgstl
dir nmsvc
133701 npbmlv.zst
dir pnrbvd
102349 rpglpmr.zbh
$ cd nmsvc
$ ls
89208 cbrggdvl.glv
176669 dzm.hlr
$ cd ..
$ cd pnrbvd
$ ls
dir hchfn
dir llpmvt
178532 llpmvt.wwb
$ cd hchfn
$ ls
51572 jpzqrgfn.jhl
281362 qntdtr.jtc
$ cd ..
$ cd llpmvt
$ ls
63202 cdvpwbj
255774 sjs.dql
60903 wnwgz.qjp
274603 zbhwbff
$ cd ..
$ cd ..
$ cd ..
$ cd mpz
$ ls
dir gdfwttff
dir njptwz
dir pnrbvd
dir zcvn
$ cd gdfwttff
$ ls
40626 rpglpmr.zbh
$ cd ..
$ cd njptwz
$ ls
dir jstfcllw
$ cd jstfcllw
$ ls
69007 grgj
$ cd ..
$ cd ..
$ cd pnrbvd
$ ls
153157 rjvtctv
$ cd ..
$ cd zcvn
$ ls
157128 llpmvt.swg
$ cd ..
$ cd ..
$ cd qpvnfl
$ ls
234947 jstfcllw
$ cd ..
$ cd rmrngqdg
$ ls
dir bjnvmpc
80105 llpmvt
185789 llpmvt.plc
dir wvg
$ cd bjnvmpc
$ ls
181438 swffpq.nnc
$ cd ..
$ cd wvg
$ ls
dir hlwjtqzj
191048 ppcjtdbd.blr
$ cd hlwjtqzj
$ ls
9887 pnrbvd.psv
$ cd ..
$ cd ..
$ cd ..
$ cd ..
$ cd ..
$ cd tmrn
$ ls
271916 dbwl
9555 gcfhvjj
198388 grgj
246330 pnrbvd.qbj
dir zzmpts
$ cd zzmpts
$ ls
dir zmsbdc
$ cd zmsbdc
$ ls
204067 swffpq.nnc
$ cd ..
$ cd ..
$ cd ..
$ cd vzvwphz
$ ls
dir nmsvc
dir ntmmcjh
dir rvwjl
103462 wnwgz.qjp
$ cd nmsvc
$ ls
dir bqvdvllf
dir ghdlvvfs
$ cd bqvdvllf
$ ls
61744 grgj
154294 lsmjt
$ cd ..
$ cd ghdlvvfs
$ ls
277273 nmsvc.nwd
$ cd ..
$ cd ..
$ cd ntmmcjh
$ ls
124476 ffdgnspv.bhb
110867 jstfcllw.phg
12568 jstfcllw.vbf
19181 npbmlv.zst
$ cd ..
$ cd rvwjl
$ ls
dir jstfcllw
57593 jstfcllw.fhg
221008 jstfcllw.gwq
12478 lwrbqz.dqm
149624 rsrjp.hvp
$ cd jstfcllw
$ ls
131800 pnrbvd
20154 wnwgz.qjp
$ cd ..
$ cd ..
$ cd ..
$ cd ..
$ cd rgbdq
$ ls
135946 ffqnrsh.qmc
186972 grgj
151369 nmsvc
125605 qgtllf
165348 zhwtbml.zsz
$ cd ..
$ cd ..
$ cd drzllllv
$ ls
dir mzfzzgsv
209144 pnrbvd.gdv
$ cd mzfzzgsv
$ ls
237212 pnrbvd.fsp
$ cd ..
$ cd ..
$ cd fqflwvh
$ ls
10557 grgj
11071 gslbvz.gch
dir jzlgzd
dir jzwwgjh
209490 mlhnjvhq
dir nfh
99206 nmlcf
dir pqtgln
139022 rpglpmr.zbh
$ cd jzlgzd
$ ls
223773 zhvgczs.rwv
$ cd ..
$ cd jzwwgjh
$ ls
80522 fvm.tdd
$ cd ..
$ cd nfh
$ ls
dir bfj
dir bjnvmpc
219887 bnnb.mzf
145633 grgj
93312 llpmvt
65642 mfdfjzrw.lzh
dir nbfsjvzn
269811 nmsvc
dir pnrbvd
dir qhn
dir rphmrdnc
dir vnjvqs
dir zqgmm
$ cd bfj
$ ls
dir bzrfbfp
dir pnrbvd
dir rbq
$ cd bzrfbfp
$ ls
34834 swffpq.nnc
$ cd ..
$ cd pnrbvd
$ ls
68732 wnwgz.qjp
$ cd ..
$ cd rbq
$ ls
91779 grgh.vwl
$ cd ..
$ cd ..
$ cd bjnvmpc
$ ls
114048 jstfcllw
$ cd ..
$ cd nbfsjvzn
$ ls
44465 vbtsdf.dqn
157458 wnwgz.qjp
$ cd ..
$ cd pnrbvd
$ ls
40294 dhgbmdl.lbg
119065 fbghtps
271425 glbzmbn.jqd
231623 hsj.vws
$ cd ..
$ cd qhn
$ ls
dir fsgn
175155 hvcfgv
30969 llpmvt.vqf
dir lwmccr
dir svzhc
276798 tgvzbm
dir vblpsfqz
$ cd fsgn
$ ls
dir btpqsr
30980 grgj
dir hjgphwdc
116742 hsrlwwqg
194210 pnrbvd.vrm
105346 rjwvfz
182505 smpnrnm
dir vwpsrq
$ cd btpqsr
$ ls
98971 brf
dir jcj
79166 lrpfbnht.fcz
94138 pnrbvd.gnr
288381 qhg
$ cd jcj
$ ls
189962 npbmlv.zst
$ cd ..
$ cd ..
$ cd hjgphwdc
$ ls
72389 npbmlv.zst
$ cd ..
$ cd vwpsrq
$ ls
dir bnqwnmg
dir ljjmwc
43797 llpmvt.srd
dir nmsvc
$ cd bnqwnmg
$ ls
281017 lvtj.vzc
$ cd ..
$ cd ljjmwc
$ ls
239040 fzb.rwh
$ cd ..
$ cd nmsvc
$ ls
262978 thrgcv.bhr
$ cd ..
$ cd ..
$ cd ..
$ cd lwmccr
$ ls
166022 grgj
$ cd ..
$ cd svzhc
$ ls
dir hpp
208916 jrhblvdc.nvm
133836 nmsvc.qms
4542 npbmlv.zst
105516 plwhmppw.phw
dir pnrbvd
93339 zcdpgl.fjz
$ cd hpp
$ ls
dir gnj
dir nprpdwj
dir pwg
35124 rggng.zbj
238667 szbqvgcg.mnc
dir zswbcbpz
$ cd gnj
$ ls
188603 zwdttf
$ cd ..
$ cd nprpdwj
$ ls
dir jstfcllw
$ cd jstfcllw
$ ls
149966 rpglpmr.zbh
$ cd ..
$ cd ..
$ cd pwg
$ ls
45034 wwpgmrhq
$ cd ..
$ cd zswbcbpz
$ ls
269836 llpmvt
129184 sntr
$ cd ..
$ cd ..
$ cd pnrbvd
$ ls
135401 rpglpmr.zbh
$ cd ..
$ cd ..
$ cd vblpsfqz
$ ls
54358 qdqrlsz.zgz
$ cd ..
$ cd ..
$ cd rphmrdnc
$ ls
189190 jzlgndht
$ cd ..
$ cd vnjvqs
$ ls
254178 wnwgz.qjp
$ cd ..
$ cd zqgmm
$ ls
dir cblp
dir mvgjj
85521 wnwgz.qjp
$ cd cblp
$ ls
131189 rpglpmr.zbh
$ cd ..
$ cd mvgjj
$ ls
215880 ddv
$ cd ..
$ cd ..
$ cd ..
$ cd pqtgln
$ ls
80302 rpglpmr.zbh
14147 rrsghb.ddq
149326 zsrjpr.gwp
$ cd ..
$ cd ..
$ cd jczm
$ ls
dir bhwgcrm
$ cd bhwgcrm
$ ls
257143 wnwgz.qjp
$ cd ..
$ cd ..
$ cd jstfcllw
$ ls
dir fnnjdr
dir llpmvt
dir lpbrvhw
dir pnrbvd
$ cd fnnjdr
$ ls
dir bjnvmpc
dir ccbn
dir llpmvt
$ cd bjnvmpc
$ ls
dir ftlf
160613 pnrbvd
dir rhzsnr
$ cd ftlf
$ ls
dir rrdzzgtg
$ cd rrdzzgtg
$ ls
43707 dpbchhz.jrl
$ cd ..
$ cd ..
$ cd rhzsnr
$ ls
13607 bjnvmpc.dlz
123612 dqt.cdm
155260 grgj
dir jstfcllw
dir llpmvt
228650 nmsvc
dir sbsqrg
229752 swffpq.nnc
$ cd jstfcllw
$ ls
dir fcbs
101671 npbmlv.zst
$ cd fcbs
$ ls
dir qtsrhfv
$ cd qtsrhfv
$ ls
94962 wnwgz.qjp
$ cd ..
$ cd ..
$ cd ..
$ cd llpmvt
$ ls
dir bjnvmpc
dir gdjshcz
dir gtrdds
23262 mzw
dir nhwvgjcq
267083 npbmlv.zst
$ cd bjnvmpc
$ ls
211744 bjnvmpc
$ cd ..
$ cd gdjshcz
$ ls
57871 swffpq.nnc
$ cd ..
$ cd gtrdds
$ ls
dir ngl
$ cd ngl
$ ls
dir nqrwdstp
$ cd nqrwdstp
$ ls
dir fdz
$ cd fdz
$ ls
254070 wnwgz.qjp
$ cd ..
$ cd ..
$ cd ..
$ cd ..
$ cd nhwvgjcq
$ ls
dir llpmvt
$ cd llpmvt
$ ls
245064 grgj
$ cd ..
$ cd ..
$ cd ..
$ cd sbsqrg
$ ls
39334 fcrw.wfs
$ cd ..
$ cd ..
$ cd ..
$ cd ccbn
$ ls
249206 grgj
174074 hdjdpdrq.sdw
255071 llpmvt.wbd
112408 swffpq.nnc
dir tfsgzdsl
57326 wwjt.hqb
$ cd tfsgzdsl
$ ls
86067 bjnvmpc
177455 gmznt
$ cd ..
$ cd ..
$ cd llpmvt
$ ls
dir btjdllpn
dir zgt
$ cd btjdllpn
$ ls
136706 btchp
$ cd ..
$ cd zgt
$ ls
44873 vmh.mfd
$ cd ..
$ cd ..
$ cd ..
$ cd llpmvt
$ ls
5472 ldj
128075 npbmlv.zst
138116 pnrbvd.lcm
$ cd ..
$ cd lpbrvhw
$ ls
284468 pnrbvd.bcg
46353 pnrbvd.bdd
dir pszldqqh
dir wdlp
$ cd pszldqqh
$ ls
89993 wnwgz.qjp
$ cd ..
$ cd wdlp
$ ls
104582 grgj
208979 swffpq.nnc
136509 vhjbdgfj
$ cd ..
$ cd ..
$ cd pnrbvd
$ ls
dir jsnfn
dir smhjmb
$ cd jsnfn
$ ls
30250 rpglpmr.zbh
$ cd ..
$ cd smhjmb
$ ls
270898 fpj.trq
63893 wnwgz.qjp
$ cd ..
$ cd ..
$ cd ..
$ cd lhltq
$ ls
dir dqqcgn
dir jstfcllw
242417 jstfcllw.ngw
183883 rpglpmr.zbh
dir wwvlv
$ cd dqqcgn
$ ls
153306 swffpq.nnc
99780 tpdgtnl
$ cd ..
$ cd jstfcllw
$ ls
dir jdssgdpv
79041 mhwcgqzs.mqc
dir nmsvc
148785 swffpq.nnc
236989 wnwgz.qjp
$ cd jdssgdpv
$ ls
127036 bgjwsm.qqc
107115 nmsvc.fnv
$ cd ..
$ cd nmsvc
$ ls
91006 dvbqm.nfl
206666 tsgcwc.fvj
$ cd ..
$ cd ..
$ cd wwvlv
$ ls
dir jstfcllw
44003 pdq
$ cd jstfcllw
$ ls
48099 fcfnptrl
$ cd ..
$ cd ..
$ cd ..
$ cd llpmvt
$ ls
179597 llpmvt
dir ndn
$ cd ndn
$ ls
220080 btsc.zmc
190391 hhz
113172 jvlfb
33050 wnwgz.qjp
$ cd ..
$ cd ..
$ cd tgmt
$ ls
53361 lml.dnh
44579 psgvcrdd
$ cd ..
$ cd wcbq
$ ls
dir bjnvmpc
dir cnwczqp
dir dpgwtwp
dir gtsf
dir nmsvc
182848 qgh.qnh
$ cd bjnvmpc
$ ls
224127 bbzdcqf
267019 bjnvmpc.zhg
263703 dspvfhr.mmh
dir glwzwcvm
dir hrjjrrvl
dir nqbrm
3983 ntsqzpp.lnl
$ cd glwzwcvm
$ ls
167421 bjnvmpc.zsj
dir llpmvt
$ cd llpmvt
$ ls
167790 llpmvt.jhw
$ cd ..
$ cd ..
$ cd hrjjrrvl
$ ls
91994 crlfnccb.svl
2227 swffpq.nnc
$ cd ..
$ cd nqbrm
$ ls
165605 rpglpmr.zbh
$ cd ..
$ cd ..
$ cd cnwczqp
$ ls
dir cfdn
dir jdh
$ cd cfdn
$ ls
dir bjnvmpc
163111 gsmhfr
dir phtt
$ cd bjnvmpc
$ ls
257093 jstfcllw
$ cd ..
$ cd phtt
$ ls
219526 bgvm.mnq
$ cd ..
$ cd ..
$ cd jdh
$ ls
dir wjzzvs
$ cd wjzzvs
$ ls
135287 rpglpmr.zbh
$ cd ..
$ cd ..
$ cd ..
$ cd dpgwtwp
$ ls
dir vmwvpjn
$ cd vmwvpjn
$ ls
dir bjnvmpc
86191 hdcb.dhp
140007 jstfcllw.tdd
128243 npbmlv.zst
$ cd bjnvmpc
$ ls
8694 grgj
166456 pnrbvd.hdn
$ cd ..
$ cd ..
$ cd ..
$ cd gtsf
$ ls
231856 bjnvmpc
225380 bmm.vwc
dir llpmvt
dir pqm
279010 wnwgz.qjp
$ cd llpmvt
$ ls
143990 nhbpmvb.pgn
dir pnrbvd
$ cd pnrbvd
$ ls
158450 ghjlw
$ cd ..
$ cd ..
$ cd pqm
$ ls
147513 grgj
$ cd ..
$ cd ..
$ cd nmsvc
$ ls
dir znlgg
$ cd znlgg
$ ls
170386 djdv.gbf`;

console.log("Example", solve(example)); 
console.log("Challenge", solve(challenge)); 
