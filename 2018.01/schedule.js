//=========================//
//           輸出
//=========================//
$(function() {
    // 透過迴圈輸出資料內的所有動畫
    // Anime.length = 動畫總數
    // 迴圈開始
    for (i = 0; i < Anime.length; i = i + 1) {
        // 如果不是第一季，顯示季度
        // 如果是第一季，僅顯示動畫名稱
        if (Anime[i].season != "1") {
            var Anime_Name = Anime[i].name + " S" + Anime[i].season; //動畫名稱
        } else {
            var Anime_Name = Anime[i].name; //動畫名稱
        }
        var Anime_Day = Anime[i].week; //星期
        var Anime_Date = Anime[i].date; //星期
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