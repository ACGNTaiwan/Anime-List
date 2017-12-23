//=========================//
//           輸出
//=========================//

var AnimeSorted = Anime.sort(function(a, b) {
    return a.date.split("/")[1] - b.date.split("/")[1];
});
$(function() {
    // 透過迴圈輸出資料內的所有動畫
    // Anime.length = 動畫總數
    // 迴圈開始
    for (i = 0; i < Anime.length; i = i + 1) {
        var Anime_Name = AnimeSorted[i].name; //動畫名稱
        var Anime_Day = AnimeSorted[i].week; //星期
        var Anime_Date = AnimeSorted[i].date; //星期
        if (Anime[i].week != 'none') { //看看有沒有公布星期
            $("#" + Anime_Day)
                .append($("<div/>")
                    .addClass("item")
                    .attr("id", Anime_Name)
                    .html(Anime_Date + " " + Anime_Name)
                );
        }
    } //結束迴圈
    console.log("讀取完畢：一共讀取了 " + Anime.length + " 部動畫"); //在載入動畫完畢之後輸出
});