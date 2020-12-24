const solve = (input) => {

    const lines = input.split("\n");

    const alergenMustBeInOneOf = {};

    const allAlergens = new Set();
    const allIngredients = new Set();
    const foods = lines.map(line => {
        const [part1, part2] = line.split(" (contains ");
        const foodIngredients = part1.split(" ");
        const foodAlergens = part2.slice(0, -1).split(", ");
        foodIngredients.forEach(i => allIngredients.add(i));
        foodAlergens.forEach(a => allAlergens.add(a));
        return {ingredients: new Set(foodIngredients), alergens: new Set(foodAlergens)};
    });

    const filteredIngredientsForAlergens = {}
    allAlergens.forEach(alergen => {
        const filteredIngredients = new Set(allIngredients);
        foods.forEach(food => {
            const {ingredients, alergens} = food;
            if (alergens.has(alergen)) {
                // filter
                filteredIngredients.forEach(ingredient => {
                    if (!ingredients.has(ingredient))  {
                        filteredIngredients.delete(ingredient);
                    }
                });
            }
        })
        filteredIngredientsForAlergens[alergen] = filteredIngredients;
    });


    const ingredientsSurelyWithoutAlergens = new Set(allIngredients);
    Object.values(filteredIngredientsForAlergens).forEach(ingredients => {
        ingredients.forEach(ingredient => ingredientsSurelyWithoutAlergens.delete(ingredient))
    })

    let alergenFreeIngredientCount = 0;
    foods.forEach(food => {
        const {ingredients, alergens} = food;
        ingredients.forEach(ingredient => {
            if (ingredientsSurelyWithoutAlergens.has(ingredient)) {
                alergenFreeIngredientCount++;
            }
        })
    })
    
    console.log(filteredIngredientsForAlergens);

    const theList = Object.entries(filteredIngredientsForAlergens).map(([alergen, ingredients]) => ({alergen, ingredients}));
    

    for (let i = 0; i < theList.length - 1; i++) {
        theList.sort((a, b) => 
            a.ingredients.size - b.ingredients.size
        );
        console.log(theList);

        const {alergen, ingredients} = theList[i];
        if (ingredients.size !== 1)
            throw("Expected number of ingredients for", alergen, "to be 1, was", ingredients.size);
        const takenIngredient = [...ingredients][0];
        for (let j = i + 1; j < theList.length; j++) {
            theList[j].ingredients.delete(takenIngredient)
        }
    }

    theList.sort((a, b) => a.alergen.localeCompare(b.alergen));

    console.log(theList);

    const canonicalList = theList.map(({ingredients}) => [...ingredients][0]).join(",");

    // const sorted = [...filteredIngredientsForAlergens];

    console.log(canonicalList);

    const result1 = alergenFreeIngredientCount;
    const result2 = 0;

    return [result1, result2];
}

const example = 
`mxmxvkd kfcds sqjhc nhms (contains dairy, fish)
trh fvjkl sbzzf mxmxvkd (contains dairy)
sqjhc fvjkl (contains soy)
sqjhc mxmxvkd sbzzf (contains fish)`;

const challenge = 
`fztz lmv vjgnkg gfvrr jbsjb dkng mndtv vdvs qcmz nvlz jhl kslcnpt qtbt ndkkq lmfnc gcbffc rjxcdh rngm fjnxnqq kccpf chtfln vfklqc bsjffzv gh gjxt lssrnhn kpjnltk vg xcvqp gpfpp vtg vnss lsvv bqpz jjpplbn jzkkt hqf cxvj hmjlx vxrgk xrn mxrn cmkq rrlz mjbtz fvhrnqm gfkp txgqb ctrn qlgtfx nrkzt rxvm kctkhg pkkg gtmqj nchxcr hblmrt xlljpg qqjcg jhdzz sgzr mvkj ctrsrl xpmhz jxcxh gmvckb mdh mbkbn nqfk (contains sesame, nuts)
fgfc kmhxmd fvhrnqm jvntmtdx mlv mbkbn mxrn nsznhh mdh gtpm xnztb hblmrt hxdbs sgzr pkkg nqbd hnkn bthgq jqs gcgms pfx gdtzrg lkgvx gx gccjpvx dcmhdkm bqnn jhdzz mndvp sjpjp bdbn ctrn gdpnb mjbtz mzrmxdg gfvrr jxcxh bmgp rrlz fgvk gcbffc vdvs mndtv mscl kctkhg zrkjc vnss ndkkq rjxcdh vzrtvj kvzv hhjttv rkl (contains shellfish, sesame, fish)
vrnkfr nbbjjq dlhbxjk kntljk bqpz llsvqv zdcvnk nqfk jxcxh nsznhh mgdx gfkp mvkj rpncf dcmhdkm klctxj vdvs hqzxj zhlt rsmg sjgcd bmgp mndvp bthjz cmkq qcmz ndkkq xtdl zrkjc gjxt mfrdz rcx zrvb jjpplbn grzmk nzhx xmx qqjcg dfqlcrs qq mxrn gtpm tfc gfvrr sgzr kvnzs mnzcxjd kmppk nlnscn rnnsp xlljpg sdxkt pkkg lxtc sjpjp vzrtvj clghk gmbcjjd jgdcp cxvj hhjttv mbkbn nbfbf pndtrl gdpnb nxrl nvlz bqnn nthn zhlkr bphms rjb kvqgb sdcmhdm mzrmxdg hqf fkcjzhr hnkn gpfpp gtmqj fztz bthgq lssrnhn ctrsrl (contains dairy, soy, fish)
nxrl gxrtc mlv jzkkt qlgtfx jxcxh gx rjb jbsjb zdcvnk dklfxrm fgvk jgdcp pndtrl xmx bthjz zrvb mdh gdtzrg nqbd ndkkq tqdld nbbjjq xtdl nbfbf ldktm llsvqv mbkbn vtg hkn kvzv kvqgb nclt zhlkr sgzr klctxj pkkg grzmk kkkdtn mjbtz mgdx hmjlx gtpm nsx ctrsrl ktr gmvckb rqskr (contains sesame)
hqf nbfbf rxvm xcvqp jzbhxq rfpn sjpjp kvnzs jxcxh zhlt hnrxcl qq xtdl vrnkfr vzrtvj zrtlv mgdx rrlz pndtrl nxlkv lvhb jzkkt hjcpjz jgdcp bthjz sjgcd zrvb vfklqc qzvlvh jhl chtfln sgzr cxvj vmxdjf dcmhdkm dkng hqzxj ndkkq bmgp mvkj lmv tqdld tfc lxtc php vnss nzhx nclt zrkjc sdcmhdm gdpnb mscl nthn jqs gx gfvrr cdnhg mlv vg pkkg bztxq bxcthm nlnscn jhdzz qqjcg mjbtz kntljk gbsjx mndvp vsfz sdxkt ldktm hblmrt klctxj gcbffc (contains nuts, sesame)
qtbt bthjz pkkg vnss gfvrr hhjttv sgzr nthn zhlt bqnn vjgnkg hqzxj rfsz xmx kmhxmd mndtv grzmk ppftxqh clghk nsznhh pzqqvc mjbtz lssrnhn fgvk nsx nrkzt mnzcxjd zsvs nqfk jxcxh bqpz fmbgpf gcbffc mscl kckp sjgcd vxrgk xxsvnx mlv nvlz ndkkq gcp kmppk lmfnc gccjpvx llsvqv hxdbs gfkp hnkn nclt sdxkt fjnxnqq nxlkv xpmhz hrqhjf nzhx ktr gdpnb dklfxrm kntljk nbbjjq cdnhg lxtc mzrmxdg rjb rrd (contains peanuts, sesame)
mbkbn cdnhg ktr vm dcmhdkm mvkj lvhb jzkkt rrd hqzxj qfql kntljk xpmhz rsmg ndkkq blbbcs zsvs qcmz bthjz cmkq jbsjb vrnkfr gh nzhx mlv gx sgzr pfx dkng bthgq jvntmtdx rcx zrkjc rjb bsjffzv jjpplbn bxcthm pkkg llsvqv mjbtz gtmqj gccjpvx vmxdjf hnrxcl kccpf slzctbv ppftxqh vdvs sjgcd xrn gdpnb sjpjp hmjlx jxcxh ggvglx jqfktrt bqnn vzrtvj gcgms rkl zdcvnk kckp gxrtc kmhxmd txgqb qq jqs bphms gpfpp gvm xtdl nsznhh mxrn (contains wheat)
tqdld bztxq bqpz rfpn mjbtz gcp nthn qcmz fmbgpf llsvqv mbkbn zdcvnk qqjcg hrqhjf lkgvx php gx mxrn nbfbf nlnscn gccjpvx vfklqc qlgtfx lmfnc vsqrzx hblmrt kvqgb gjxt bthjz vnss nxlkv vdvs sgzr dkng klctxj gpfpp rrlz gfvrr jzbhxq dklfxrm cmkq zrfdh gcgms hnrxcl gcbffc cxvj gvm fgfc nxrl vtg gmbcjjd blbbcs pkkg xrn cjrpc jvntmtdx kmhxmd nzhx bthgq cdnhg lxtc jxcxh (contains wheat)
bztxq mndvp kmhxmd lkgvx vzrtvj bphms vsfz nqbd sjpjp qqjcg vrnkfr blbbcs vg nvlz kpjnltk tqdld zdcvnk hqptvp mlv pkkg xxsvnx ggvglx bdbn gh vmxdjf bxcthm cjrpc bthjz fgfc zhlt nthn lmfnc xlljpg lsvkc jqfktrt mnzcxjd ppftxqh mbkbn tjsh zrtlv pzqqvc rngm lxtc mgdx ndkkq sgzr rsmg hqf gcp cdnhg mjbtz gpfpp jqs jxcxh nzhx rcx gvm fmbgpf nbfbf (contains shellfish, nuts, wheat)
xcvqp nqfk nbbjjq blkzhh bphms kvzv bmgp jzbhxq ctrsrl lssrnhn kpjnltk gmbcjjd dkng pndtrl mbkbn fztz jzkkt ldktm hxdbs bqnn nxlkv jxcxh rjxcdh rjb mnzcxjd dcmhdkm jhl zdcvnk ndkkq pfx xrn hrqhjf nxrl gtpm qqjcg zrtlv rnnsp mgdx rsmg gh gbsjx qlgd kccpf gcbffc bthjz cxvj hqzxj mjbtz bxcthm nsx bsjffzv sgzr jhdzz gfvrr rrd bdbn qzvlvh (contains dairy, fish, wheat)
qq kkkdtn lmfnc vm gjxt jhdzz sjgcd vg fmbgpf ctrn zrkjc nchxcr hnkn jvntmtdx jjpplbn fjnxnqq vnss pkkg mjbtz kvqgb bthgq sgzr bdbn qqjcg hsbcqj vzrtvj ndkkq dcmhdkm kvzv sjpjp hqzxj jxcxh mbkbn lssrnhn rfpn bthjz jzkkt gmbcjjd ktr lkgvx rjb tpcrl rrd gtmqj xxsvnx mgdx vxrgk fvhrnqm vrnkfr grzmk rsmg bztxq kntljk hkn hblmrt xcvqp kslcnpt (contains peanuts)
tpcrl vtg nxlkv hsbcqj gccjpvx gjxt kvzv dlhbxjk qfql kslcnpt bthjz gfkp jqs gtpm lssrnhn pndtrl xrn vzrtvj mbkbn blkzhh mlv php sjpjp hnrxcl rjb klctxj mgdx hmjlx zsvs hjcpjz rcx sgzr lvhb lsvkc sdxkt jxcxh sjgcd ktr chtfln zrtlv qtbt ndkkq nxrl nqfk gmbcjjd hkn qlgd lmv grzmk pkkg gvm ctrn bsjffzv gh mscl pkqbt nzhx rkl nvlz hxdbs rnnsp lsvv tqdld gtmqj mvkj mnzcxjd rqskr kmhxmd jjpplbn rfsz hhjttv cmkq gcgms dklfxrm mfrdz hqptvp tfc cdnhg mjbtz gdtzrg kckp kvnzs ctrsrl (contains shellfish, peanuts, sesame)
hxdbs lsvkc mvkj hnrxcl gmvckb mgdx pndtrl kntljk qqjcg gfvrr sjgcd sgzr fjnxnqq jhdzz fgvk xnztb hqptvp blkzhh kctkhg dlhbxjk mbkbn zrtlv rrd stvmc qq kkkdtn pzqqvc mjbtz rsmg jxcxh vxrgk ndkkq hsbcqj llsvqv rjxcdh lmfnc mndtv vzrtvj nqfk bthgq pfx hmjlx nxlkv rpncf pkkg gh kckp lssrnhn mnzcxjd cjrpc rqskr nvlz qlgtfx nbfbf (contains sesame)
vnss pzqqvc hnkn lmfnc pkkg xxsvnx mndvp stvmc kntljk nzhx bphms gdpnb rpncf qtbt dkng dklfxrm sgzr ndkkq jxcxh rfpn nxlkv nsznhh zdcvnk zrkjc mbkbn vtg vrnkfr rfsz cxvj gcbffc blkzhh gfvrr jjpplbn mndtv vdvs mlv cjrpc mzrmxdg slzctbv kmhxmd rjxcdh xrn bthjz (contains peanuts, sesame)
rcx mbkbn sdcmhdm txgqb mxrn hhjttv jzkkt php ktr gxrtc lkgvx mjbtz dlhbxjk rngm zrkjc fmbgpf pndtrl gfvrr zrfdh nbfbf blkzhh tfc pkkg ndkkq hxdbs nsx gtmqj kslcnpt kmppk jxcxh kvnzs rfpn sjgcd vsfz gfkp nvlz jhl fztz mzrmxdg vm xcvqp dfqlcrs sgzr klctxj rkl zsvs mndvp bqpz gcbffc qtbt pzqqvc rrd tpcrl (contains dairy, wheat, shellfish)
mbkbn xmx sjpjp tqdld bphms nthn qlgtfx qlgd hkn fjnxnqq mndtv pkkg slzctbv zhlt hxdbs xtdl ggvglx gtmqj gdpnb gxrtc xcvqp ctrn nxlkv rfsz vrnkfr rxvm lvhb lssrnhn gh dkng bsjffzv zhlkr rqskr mndvp kccpf nzhx mjbtz kmppk bztxq qtbt sjgcd dklfxrm qcmz ndkkq sgzr llsvqv rrlz vzrtvj gccjpvx qfql kslcnpt klctxj rrd nvlz rjxcdh jxcxh gjxt clghk jqfktrt mfrdz vm vsfz jhl gfvrr jhdzz ktr gmbcjjd fvhrnqm fmbgpf bqnn pndtrl gcbffc vdvs rpncf jzkkt (contains nuts)
ldktm jxcxh nqfk hnrxcl sgzr jqfktrt gfvrr jzkkt blbbcs vsfz jhl zrkjc rjxcdh ctrsrl mjbtz ppftxqh fkcjzhr blkzhh sjpjp fjnxnqq vmxdjf nclt mbkbn qfql gpfpp bsjffzv nrkzt qqjcg mndtv sdcmhdm lssrnhn kpjnltk rnnsp ndkkq zrvb kslcnpt mzrmxdg nlnscn llsvqv kvnzs gdpnb jvntmtdx chtfln qlgd mgdx bthjz bthgq pzqqvc (contains wheat, nuts)
vdvs fgvk hkn bqnn gcp sdcmhdm zsvs bztxq qlgtfx gccjpvx grzmk jqs fkcjzhr vxrgk tfc bdbn zrvb cdnhg gcbffc ndkkq tqdld mndtv vtg jxcxh ldktm dcmhdkm hqptvp mjbtz gtmqj qlgd hmjlx bqpz lmv vsfz gfvrr zhlkr bmgp jvntmtdx gmvckb lvhb chtfln dklfxrm sgzr rnnsp hnkn pkkg mbkbn xxsvnx slzctbv (contains dairy, fish)
gpfpp rfpn dcmhdkm nxrl lmfnc lkgvx gtpm tfc hqf mndtv mvkj ctrn jqs kpjnltk vzrtvj sdxkt rqskr tpcrl nqbd nxlkv rkl zdcvnk hblmrt bqnn cmkq lmv ldktm gfvrr kslcnpt vmxdjf mjbtz mdh kvzv bthjz hsbcqj qqjcg nsznhh fvhrnqm bxcthm zsvs jhdzz qlgd hhjttv vjgnkg lsvkc kctkhg xcvqp vfklqc ppftxqh jxcxh rfsz ndkkq kvnzs sgzr mbkbn bztxq cxvj gjxt dlhbxjk gdtzrg lsvv clghk chtfln vsqrzx hmjlx ggvglx gx nrkzt xnztb gcp (contains nuts, sesame, fish)
dfqlcrs hmjlx hqptvp xnztb gvm rfsz mlv gmvckb ldktm gdtzrg dcmhdkm xlljpg sjpjp cjrpc ktr cdnhg mscl fgfc gbsjx gfvrr hhjttv kvqgb gmbcjjd qlgd bqnn jxcxh lkgvx bxcthm nbbjjq qtbt txgqb mnzcxjd nsznhh vrnkfr zsvs slzctbv sdcmhdm lxtc fgvk mvkj nclt ndkkq qcmz fmbgpf mbkbn ctrn rrd zrfdh nvlz bthjz fjnxnqq lvhb kmhxmd grzmk rpncf qzvlvh zdcvnk ctrsrl mdh pkkg sgzr (contains shellfish, dairy)
kmppk kmhxmd php nzhx llsvqv rfsz dfqlcrs mxrn qfql xtdl rfpn dkng hhjttv gx mzrmxdg bsjffzv vrnkfr sdcmhdm kckp mndvp hrqhjf vsqrzx cxvj xmx xnztb nxrl lmfnc nrkzt tjsh jjpplbn bqnn dcmhdkm mgdx zhlkr pkqbt pzqqvc vsfz pkkg kkkdtn nsznhh gfvrr gtpm ndkkq jqfktrt blbbcs mbkbn pndtrl jxcxh klctxj mnzcxjd hsbcqj nqbd nqfk hblmrt xlljpg ctrn grzmk xrn qqjcg bthjz gccjpvx fjnxnqq mjbtz dklfxrm slzctbv (contains peanuts, fish)
pkkg qcmz cmkq gvm jzkkt bthjz rjb mvkj lsvkc kvnzs hnrxcl mjbtz nchxcr kslcnpt nqbd gfvrr kccpf blkzhh sgzr vsfz xtdl hqf mbkbn nvlz ndkkq bthgq rrd bdbn gh kntljk rpncf jgdcp klctxj gcgms ggvglx vjgnkg mlv dfqlcrs nsznhh zrfdh vnss gdpnb dklfxrm jzbhxq txgqb xmx nlnscn (contains soy, sesame, peanuts)
tfc kctkhg gjxt lssrnhn mjbtz pkkg zsvs mlv mfrdz gvm xnztb gh qzvlvh xmx stvmc hjcpjz vjgnkg qlgtfx vdvs clghk qlgd fztz dcmhdkm ldktm bmgp nzhx kslcnpt nbfbf gfkp zrvb vsqrzx nvlz nbbjjq gfvrr xlljpg hxdbs kpjnltk gtmqj nthn rjb rxvm sgzr kmppk rpncf nclt jxcxh gcbffc jbsjb gmbcjjd ndkkq zrkjc mbkbn nxrl rrlz vm grzmk bqnn llsvqv jhl blkzhh xpmhz gbsjx qtbt qqjcg gxrtc hhjttv bsjffzv bztxq nqbd (contains shellfish, nuts)
pzqqvc clghk php grzmk xrn kckp txgqb mndtv rqskr nxrl mbkbn ndkkq qq vmxdjf rrd stvmc slzctbv hnrxcl mnzcxjd jhl hhjttv jvntmtdx gcp gmbcjjd fgfc ldktm bztxq lmv mjbtz rxvm nvlz ctrn bthjz jxcxh blkzhh zrfdh sgzr vtg kvnzs rfsz mlv vfklqc zdcvnk qlgtfx ggvglx nqbd gfvrr ppftxqh gtmqj qtbt vsqrzx bqnn vzrtvj (contains peanuts, sesame, dairy)
mndvp sgzr nsznhh rqskr klctxj nrkzt tjsh gdtzrg gtmqj vsqrzx lsvv nqfk pkkg vnss gbsjx bxcthm jhdzz mbkbn ctrn xxsvnx zhlkr hrqhjf zrkjc kmhxmd mdh gdpnb nbfbf gxrtc fgfc kkkdtn jvntmtdx nlnscn ggvglx jgdcp pkqbt mnzcxjd kslcnpt sjpjp gmbcjjd mxrn jxcxh ldktm gfvrr pzqqvc stvmc rxvm lvhb ndkkq tfc xnztb lkgvx hxdbs pfx qqjcg txgqb gtpm gjxt fvhrnqm zhlt rrlz bdbn mjbtz zrvb kntljk jbsjb qzvlvh zrtlv nxlkv vxrgk (contains fish, dairy, wheat)
vsfz vtg mdh xcvqp lsvv cmkq jjpplbn vdvs bsjffzv rnnsp lssrnhn hhjttv bqpz rrlz sjgcd kvnzs mjbtz nqfk qqjcg kckp gfkp hqzxj jzkkt hxdbs tjsh nxrl zhlkr hrqhjf sdxkt bztxq vjgnkg vm qlgtfx bqnn qtbt vsqrzx rqskr gfvrr nrkzt vg lmfnc stvmc hnkn vzrtvj nclt cjrpc mxrn sgzr kmhxmd cdnhg bthjz hblmrt mvkj xnztb jhdzz kccpf mlv nbbjjq qfql mgdx klctxj lvhb rjb kpjnltk zrfdh gdpnb dlhbxjk grzmk xxsvnx rxvm clghk hnrxcl mfrdz hjcpjz gh jxcxh pkkg dkng nsx ndkkq kkkdtn gcgms (contains nuts, dairy, fish)
dcmhdkm xxsvnx bdbn vrnkfr mgdx tpcrl lxtc bqnn chtfln ndkkq hkn ctrn lmv kvzv rrd pzqqvc xnztb jjpplbn hqptvp vnss dfqlcrs jvntmtdx kkkdtn bthjz vmxdjf mbkbn kslcnpt fmbgpf kmppk nxrl gfvrr jqfktrt zhlkr sgzr jxcxh nchxcr qqjcg lsvv gccjpvx jhl ktr blbbcs nqbd kvqgb sjpjp rkl qq rcx fgvk gh jbsjb stvmc bphms kckp nthn tjsh slzctbv nsx cxvj rjxcdh nxlkv vdvs gmbcjjd fvhrnqm pkkg (contains shellfish, dairy)
hhjttv hqptvp mbkbn fkcjzhr rfpn bthjz kmhxmd blkzhh pkqbt jhdzz zsvs fmbgpf ctrn fgvk zrtlv jjpplbn gmbcjjd rqskr gfvrr hxdbs dlhbxjk ldktm qcmz gcbffc gdtzrg mscl lvhb vsqrzx rnnsp chtfln qq cxvj mdh hqzxj kvnzs qtbt rngm dkng mxrn vm zdcvnk hkn fjnxnqq rrd qfql vxrgk jzkkt gjxt jhl nvlz zrfdh pkkg tfc vjgnkg lssrnhn ndkkq hrqhjf gmvckb sjgcd vzrtvj nxlkv ggvglx nqfk jqfktrt mlv mndtv gvm rkl rsmg bthgq cmkq stvmc ppftxqh vdvs vg jxcxh kctkhg gccjpvx nxrl ctrsrl zhlkr lkgvx llsvqv gx sjpjp nsx mnzcxjd zrvb fztz mjbtz nthn (contains soy, fish, wheat)
dkng ndkkq jbsjb kntljk lsvv vrnkfr xmx xlljpg tqdld cdnhg zrtlv zdcvnk bsjffzv blbbcs kccpf nqbd qzvlvh mjbtz gfvrr kvnzs mdh sgzr clghk gcbffc jxcxh jjpplbn pkkg qfql sjgcd vnss zrvb rrd fgvk qlgtfx mndvp fztz fvhrnqm mbkbn vsqrzx gdpnb vm gfkp gx chtfln xnztb ggvglx stvmc xpmhz nbbjjq hjcpjz ctrsrl kvqgb (contains shellfish, fish)
jqfktrt gcp gfvrr ndkkq grzmk nxlkv nsznhh bthjz jxcxh kntljk mscl fkcjzhr pzqqvc nqfk sjpjp hjcpjz fvhrnqm qtbt ktr qlgd kmppk jhdzz qq zrkjc pfx lsvkc zhlt vjgnkg dkng kvqgb cjrpc hxdbs clghk mzrmxdg mjbtz klctxj nclt nvlz gmbcjjd ggvglx kvzv cmkq mbkbn vg gpfpp bphms rrd sdxkt rqskr mfrdz lmfnc stvmc vsqrzx qzvlvh gcgms bdbn blbbcs zsvs cxvj mdh hqptvp kccpf mgdx kckp gx rfpn lsvv sgzr vnss txgqb nrkzt dcmhdkm jqs jgdcp mnzcxjd llsvqv (contains peanuts, nuts, dairy)
bthjz mdh gvm rrd lsvkc fgvk zrkjc bmgp pkqbt hmjlx rjb gxrtc mlv jzbhxq gbsjx lmv kvnzs lsvv lmfnc zhlt sgzr cjrpc nqbd zdcvnk vmxdjf rxvm chtfln bthgq qfql hqptvp hrqhjf pfx pkkg mjbtz gfvrr nsznhh bsjffzv mbkbn hqzxj gcbffc ndkkq zsvs mgdx (contains wheat, peanuts)
gmbcjjd vfklqc dlhbxjk lmfnc nxrl dklfxrm gdtzrg vg mxrn gpfpp rjb mjbtz nbfbf jjpplbn gfkp cmkq sdcmhdm fvhrnqm gjxt gccjpvx rpncf lsvkc nzhx bthgq jvntmtdx xpmhz lsvv fjnxnqq rqskr hblmrt zsvs nchxcr zhlkr kslcnpt lxtc mlv rnnsp sgzr zrtlv rcx jxcxh vdvs vnss hqptvp jhdzz mbkbn nqfk pzqqvc nsznhh hnrxcl pkkg gxrtc rfpn rkl mscl fkcjzhr rjxcdh stvmc hhjttv vm jzkkt gfvrr fztz vzrtvj kkkdtn ctrn vsfz dkng jgdcp pkqbt zdcvnk bqpz ndkkq mzrmxdg bsjffzv clghk xlljpg qzvlvh kccpf (contains wheat, fish)
rfsz dcmhdkm mbkbn jbsjb xxsvnx jzkkt sgzr nsznhh vsfz jxcxh fmbgpf lsvkc qq nzhx rxvm nchxcr kckp nlnscn nrkzt vjgnkg pzqqvc cxvj xmx gcgms fvhrnqm hqzxj sjgcd cjrpc sdcmhdm ctrsrl xpmhz clghk xnztb gdpnb nvlz kctkhg gbsjx rkl kslcnpt rrd gfvrr qlgd qzvlvh nxrl fztz lmv chtfln jhdzz kntljk bphms zdcvnk kvqgb vrnkfr hsbcqj dfqlcrs mjbtz kpjnltk pkkg xcvqp bthjz zrfdh cdnhg zsvs pfx slzctbv gccjpvx fgvk jgdcp nqbd gdtzrg pkqbt (contains soy, wheat)
dklfxrm hqptvp vfklqc hqzxj bsjffzv mndvp slzctbv fgfc lxtc rrlz ggvglx qcmz dkng kslcnpt hqf ndkkq rqskr ktr tfc txgqb kpjnltk gcp hmjlx xpmhz jhl jxcxh nlnscn gfvrr pkkg ppftxqh mxrn vxrgk stvmc gvm gccjpvx gxrtc bthgq nchxcr hnkn hhjttv qq zdcvnk zhlt gpfpp jqs jzbhxq jjpplbn cdnhg rpncf vjgnkg bthjz hxdbs rjxcdh mzrmxdg kmhxmd mjbtz hjcpjz kckp vzrtvj pfx nqfk xnztb klctxj kvqgb mgdx blbbcs cjrpc zhlkr mbkbn gdpnb (contains dairy, shellfish, soy)
kmhxmd bztxq gfvrr bqpz blbbcs hkn nsx fztz mfrdz pkkg kctkhg nchxcr kslcnpt nsznhh kccpf nbbjjq mscl cmkq qzvlvh bxcthm hqptvp tpcrl chtfln ldktm kckp vfklqc pfx sgzr gvm jxcxh rsmg jvntmtdx jjpplbn lssrnhn cxvj dfqlcrs zrkjc hqf cjrpc hmjlx gpfpp fvhrnqm lxtc ndkkq vsqrzx mndtv bphms qlgtfx rjb mlv fgvk hhjttv mjbtz jzbhxq zrfdh bthgq lkgvx slzctbv zsvs mxrn rxvm gx mbkbn txgqb (contains shellfish)
clghk mbkbn rcx vdvs nqbd kvqgb qlgd gmvckb zdcvnk vjgnkg hnkn pkkg lvhb nsznhh lsvv kkkdtn mdh ndkkq rngm vmxdjf mgdx gccjpvx dfqlcrs rqskr vxrgk qcmz qlgtfx kntljk nbfbf hsbcqj ctrn pkqbt zsvs gcgms gdtzrg bthjz nsx zhlkr kvzv bztxq sgzr qtbt kvnzs nqfk sdxkt klctxj sjgcd gfvrr mjbtz kctkhg vm qqjcg sdcmhdm (contains sesame)
xrn dlhbxjk rqskr nvlz qtbt bdbn zhlkr lmv kmhxmd txgqb hsbcqj jxcxh mjbtz mbkbn hqf vzrtvj cmkq vmxdjf vg sdcmhdm llsvqv mxrn bthgq jgdcp cxvj rkl blbbcs nrkzt hmjlx ldktm ktr zhlt mdh qlgd kslcnpt zrfdh lxtc hnrxcl mfrdz bxcthm nxlkv klctxj hblmrt mnzcxjd rfpn fkcjzhr fjnxnqq nlnscn mgdx gdpnb nchxcr xlljpg lsvv mndtv gjxt xtdl stvmc slzctbv ctrsrl xcvqp rcx vsqrzx qlgtfx gfvrr gx zrkjc bthjz mvkj pndtrl ndkkq hnkn dfqlcrs nbbjjq jbsjb fvhrnqm xxsvnx sjgcd gmvckb mlv pzqqvc rxvm pfx fmbgpf sgzr nsx hhjttv (contains fish, wheat)
nxlkv lsvkc hhjttv hblmrt rngm cmkq dfqlcrs grzmk ndkkq zrfdh mndvp mgdx mvkj nbbjjq kvnzs jxcxh vmxdjf xrn kpjnltk gvm sgzr mbkbn vnss rsmg rfsz mxrn jbsjb mjbtz pkkg gfvrr kntljk blkzhh kkkdtn mzrmxdg vtg php nqfk cdnhg sjpjp nchxcr rrd lmv jjpplbn gmvckb kvqgb (contains soy, wheat)
mlv fmbgpf xnztb qqjcg rkl kslcnpt txgqb gx hblmrt ktr nzhx tpcrl qtbt jzbhxq hnkn mnzcxjd mjbtz ndkkq nvlz bsjffzv rsmg tfc zrtlv nrkzt fkcjzhr rqskr bxcthm cxvj rcx jhdzz lmfnc rxvm qzvlvh hhjttv lssrnhn kvqgb ggvglx vmxdjf vm mndvp lsvkc kpjnltk rrd sjgcd gtpm pndtrl mdh bthjz qlgd blbbcs mndtv kntljk qfql sdcmhdm clghk rnnsp pkkg dklfxrm mbkbn pfx kckp klctxj chtfln hqzxj gmbcjjd tqdld nsx jzkkt zsvs hqptvp tjsh sgzr nsznhh kctkhg vrnkfr hqf gfvrr grzmk dkng (contains soy, peanuts)
nthn rjxcdh qlgd vzrtvj chtfln pkkg gfvrr ktr gccjpvx nqfk bdbn fztz vsqrzx mvkj kctkhg mjbtz tqdld xcvqp ctrsrl cmkq mzrmxdg bthjz vnss mfrdz lsvv vsfz ndkkq blkzhh nxrl mbkbn sgzr kckp mscl sjgcd qfql cxvj hqf mlv zhlkr kvqgb gpfpp rxvm rcx kntljk jvntmtdx xtdl ppftxqh hsbcqj gvm qqjcg kmhxmd qzvlvh zrtlv vmxdjf mnzcxjd dkng lxtc rnnsp hrqhjf kvnzs gbsjx xxsvnx gcgms qq nclt kvzv nzhx hnrxcl (contains shellfish, dairy, fish)
gmbcjjd nthn mbkbn gdpnb kvzv zrfdh zsvs ndkkq rxvm vtg jbsjb kccpf tpcrl kslcnpt mxrn zrvb tjsh cmkq pfx zrkjc jjpplbn lsvkc mdh kvnzs gdtzrg vjgnkg hblmrt jhl nzhx xtdl mndvp bthjz gfvrr bthgq rjxcdh rrd lmv bqpz sgzr gvm jxcxh pkkg (contains fish, dairy)
pkkg gx xxsvnx bqpz vtg dlhbxjk kccpf rjxcdh bdbn ndkkq bqnn rfsz rxvm mjbtz qcmz blbbcs mbkbn lsvkc vmxdjf vm hblmrt slzctbv jjpplbn jvntmtdx gpfpp kpjnltk xmx bsjffzv vnss lmv bthjz hxdbs nvlz rqskr nbbjjq sjpjp hqptvp qqjcg rjb mdh hnkn xrn ldktm sgzr pfx gdtzrg bztxq xlljpg jxcxh nlnscn (contains fish, nuts, sesame)
rngm vzrtvj fgvk xrn bdbn bthjz sgzr gcp hnrxcl xtdl pkkg mgdx jhl jgdcp jzkkt mfrdz zsvs qtbt rjxcdh php mjbtz rxvm hxdbs nlnscn jxcxh gpfpp ldktm lsvv vsqrzx hqzxj nxrl rcx rnnsp gtpm bztxq hqptvp grzmk ndkkq hrqhjf gbsjx jjpplbn tpcrl txgqb mbkbn jzbhxq gtmqj pkqbt bsjffzv (contains wheat, fish)
zsvs qq sdxkt lmv tfc jxcxh jqfktrt hqf kccpf mlv xpmhz qcmz txgqb stvmc pkkg ndkkq lsvv kckp qlgtfx kvnzs mxrn mndvp dfqlcrs sgzr jbsjb xnztb bthgq dlhbxjk qzvlvh pndtrl xtdl nzhx hsbcqj nsznhh rngm ctrsrl tjsh ggvglx vmxdjf hxdbs gmvckb fgfc vfklqc vm blbbcs nxrl kmppk hqzxj mvkj tpcrl cjrpc gfvrr ldktm rfpn nclt gx fztz bmgp mjbtz mgdx fmbgpf pzqqvc gdpnb mbkbn zdcvnk (contains nuts, fish, sesame)
qfql dkng mjbtz hjcpjz mvkj lsvv mdh bsjffzv tfc jhl fvhrnqm rxvm fgvk vdvs qzvlvh xxsvnx vm dklfxrm kvqgb rfsz jzkkt kslcnpt xtdl rfpn rpncf mnzcxjd nqbd zhlt mzrmxdg ggvglx sgzr gccjpvx rnnsp hqf sdcmhdm hxdbs gvm gpfpp qlgtfx pkkg nzhx bphms gh fkcjzhr cxvj gtmqj qcmz fjnxnqq pndtrl php bdbn rkl mndvp zrtlv bthjz hnrxcl jxcxh blkzhh kctkhg fgfc xmx lvhb hrqhjf nchxcr vmxdjf xnztb ppftxqh gxrtc jzbhxq pkqbt zsvs rrlz cmkq nclt qqjcg stvmc hqzxj ndkkq jjpplbn xpmhz ctrn kckp hkn clghk qlgd dlhbxjk bthgq gfvrr nxrl (contains peanuts, dairy, soy)
gcgms rqskr pkqbt zrfdh xcvqp clghk mgdx stvmc blkzhh jzbhxq hnrxcl gfvrr hblmrt gdpnb fmbgpf mndtv hxdbs jzkkt llsvqv vzrtvj vsfz rxvm slzctbv jqfktrt nbbjjq ppftxqh pndtrl pkkg bthjz xrn hhjttv qzvlvh kckp gtpm nvlz hjcpjz dfqlcrs zdcvnk tqdld bthgq mjbtz dkng gccjpvx nzhx bxcthm xpmhz nsznhh gh hrqhjf vdvs bmgp mfrdz qtbt vmxdjf ndkkq cjrpc zrtlv lxtc kkkdtn vxrgk pzqqvc nxlkv gjxt sgzr mxrn xmx lvhb fgfc nqbd rnnsp qq jvntmtdx vnss rcx nsx mbkbn vjgnkg txgqb (contains fish, dairy, soy)
vm sjgcd jqs nqfk mjbtz gdpnb mvkj bsjffzv tfc mlv nzhx vjgnkg hrqhjf gjxt blbbcs tqdld lkgvx bthjz nbbjjq gdtzrg rfsz kvqgb dklfxrm fgvk pkkg jxcxh kntljk qlgtfx vxrgk lsvkc jzbhxq jbsjb gmbcjjd fmbgpf hxdbs ndkkq jhl vg cjrpc clghk bphms bztxq rxvm xlljpg kctkhg fvhrnqm rqskr mfrdz vrnkfr vsqrzx sgzr mbkbn dcmhdkm gvm qqjcg lvhb vzrtvj lssrnhn rjb qcmz jjpplbn gxrtc pfx (contains peanuts, sesame)
dkng zhlt sgzr mndtv lssrnhn zdcvnk bthjz xrn jqfktrt rngm vsqrzx nvlz bxcthm xtdl gxrtc pfx nsznhh pkqbt kvzv gx mjbtz vnss gcp zrfdh jzbhxq gjxt lmfnc stvmc kmhxmd nxlkv fvhrnqm lkgvx pndtrl cmkq bqpz fgvk cxvj pkkg hsbcqj rfsz kvqgb gmvckb kccpf ggvglx jvntmtdx qlgtfx rqskr rrlz vg gvm lvhb lmv mlv jjpplbn jbsjb jxcxh jqs qq lsvkc gbsjx bsjffzv chtfln nclt jgdcp vzrtvj vm ndkkq nbfbf qfql txgqb ctrn hhjttv gccjpvx mbkbn hxdbs nchxcr kmppk qlgd hnrxcl nqfk dlhbxjk qcmz gtpm (contains sesame, shellfish)
vsfz rsmg qfql sdxkt rjb pfx xcvqp gbsjx zrtlv kctkhg jhdzz vdvs jzbhxq dcmhdkm gtmqj vrnkfr qlgtfx hhjttv gmbcjjd gccjpvx nqbd hnrxcl rfsz mvkj vxrgk gdtzrg kmppk grzmk nclt gcgms jxcxh vg gpfpp jqfktrt kmhxmd slzctbv rqskr hqf zsvs dklfxrm lsvkc lxtc lkgvx bthjz mbkbn xxsvnx kkkdtn clghk ndkkq llsvqv klctxj nbbjjq kslcnpt qlgd xmx zrkjc xlljpg bqnn pkkg hxdbs mxrn php ctrsrl fztz gfvrr blkzhh jgdcp kpjnltk zrfdh xpmhz gx gcp jhl hsbcqj zhlkr ctrn gdpnb mjbtz (contains dairy)
mjbtz dkng chtfln rsmg bxcthm gx qlgd dfqlcrs pndtrl nclt tfc mnzcxjd mscl rpncf bdbn lvhb kccpf vzrtvj kpjnltk gcgms hjcpjz jqs sdxkt zsvs bthgq blbbcs mdh zrkjc rkl vfklqc jhl cdnhg vxrgk jqfktrt ndkkq jvntmtdx xrn fgfc ggvglx kvqgb mxrn nvlz nzhx sjgcd hrqhjf gtpm mbkbn jxcxh xxsvnx cjrpc mndvp qfql hnkn hblmrt sgzr qzvlvh klctxj ctrsrl tjsh gfvrr jbsjb pkkg (contains nuts, fish)`;

// console.log(solve(example)); 
console.log(solve(challenge)); 