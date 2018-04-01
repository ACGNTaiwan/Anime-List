//==============================//
//          2018 冬番清單
//  github.com/gnehs/Anime-List
//==============================//
//            資料來源
// 【冬番】2018年1月冬番一覽（日本冬季新番列表）
// http://justlaughtw.blogspot.com/2017/07/20181.html
// 維基百科
// https://zh.wikipedia.org/
// 百度百科
// https://baike.baidu.com
// 萌娘百科
// https://zh.moegirl.org/
//==============================//
Anime = [
    // 星期格式 / Week
    //     Sun  Mon Tue  Wed  Thu  Fri  Sat none
    //     日   一   二   三    四   五   六  尚未公開
    // 原作載體 / Carrier
    //     Comic  Novel   Game  Original
    //    漫畫    小說    遊戲   原創或其他
    // 資料存取範例 / Example
    //    -> Anime[0].name
    //    <- LoveLive! SunShine!!
    // 格式範例 / Example
    // {
    //    name: '動畫名稱',
    //    date: '首次播送日期(ex.6/13)',
    //    week: '星期(請參照星期格式)',
    //    time: '首次播送時間',
    //    carrier: '原作載體(請參照原作載體格式)',
    //    season: '第?季',
    //    nameInJpn: '動畫原文名稱',
    //    img: '海報(請上傳 Ingur 並將網址改成 Https 格式)',
    //    official: '動畫官網',
    //    description: '說明文(避免大量劇透)',
    // },
    {
        name: '鬼太郎',
        nameInJpn: 'ゲゲゲの鬼太郎',
        date: '4/1',
        time: '9:00',
        carrier: 'Comic',
        season: '6',
        episode: '',
        img: 'https://i.imgur.com/FlSmbcw.jpg',
        official: 'http://www.toei-anim.co.jp/kitaro/',
        description: '故事主軸是闡述作為幽靈族最後倖存者的少年「鬼太郎」，施展妖術和做盡壞事的妖怪們作戰。身穿黃黑橫紋背心和傳統日式木屐的小男孩，以頭髮、坎肩和下馱當武器，與一群住在神秘森林裡的妖怪朋友們一起解決妖怪跟人類兩個世界的麻煩。',
    },
    {
        name: 'B：彼之初',
        nameInJpn: 'B: The Beginning',
        date: '3/2',
        time: '0:00',
        carrier: 'Original',
        season: '1',
        episode: '12',
        img: 'https://i.imgur.com/iGT3yO2.jpg',
        official: 'http://www.b-animation.jp/',
        description: '某天，被稱為天才調查員的奇斯·弗列克來到王立警察特殊犯罪搜査科，並追尋著某件事件的犯人——連環殺手「殺手B」。而在犯案現場內，連環殺手「殺手B」必會刻上字母「B」，總是引起人們的注意，但沒有人知道其意思。「B」只是殺手留給她的信息，想告訴她「我在這裡」。奇斯及黑羽，這兩位陌生人的命運，不久將被一個陰謀吞噬。',
    },

    /*
    {
        name: '123',
        date: '1/',
        week: 'Sun Mon Tue Wed Thu Fri Sat',
        time: '尚未公開',
        carrier: 'Comic Novel Game Original',
        season: '1',
        nameInJpn: '123',
        img: '123',
        official: 'www',
        description: '123',
    },
    */

];
// 讓動畫按時間排序
var Anime = Anime.sort(function(a, b) {
    return a.date.split("/")[1] - b.date.split("/")[1];
});