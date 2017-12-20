//=========================//
//           輸出
//=========================//
$(function () {
    // 透過迴圈輸出資料內的所有動畫
    // Anime.length = 動畫總數
    // 迴圈開始
    for (i = 0; i < Anime.length; i = i + 1) {
        var Anime_Name = Anime[i][0];//動畫名稱
        var Anime_Day = Anime[i][1];//星期
        $("#" + Anime_Day)//這裡用到了 JQ
            .append($("<div/>")
                .addClass("item")//Tocas UI 的卡片
                .attr("id", Anime_Name)
                .html(Anime_Name)
            );
    }//結束迴圈
    console.log("讀取完畢：一共讀取了 " + Anime.length + " 部動畫");//在載入動畫完畢之後輸出
});