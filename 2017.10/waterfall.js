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
        var Anime_Img = Anime[i].img //圖片
        $("#waterfall") //這裡用到了 JQ
            .append($("<a/>")
                .addClass("ts card") //Tocas UI 的卡片
                .attr("id", Anime_Name)
                .attr("data-tooltip", Anime_Name)
                .append($("<div/>")
                    .addClass("image")
                    .append($("<img/>")
                        .addClass("image")
                        .attr("src", Anime_Img)
                    )
                )
            );
        console.groupCollapsed("讀取成功：" + Anime_Name); //將底下輸出資訊弄成群組
        console.log('排序', i);
        console.log('名稱', Anime_Name);
        console.log('圖片', Anime_Img);
        console.groupEnd(); //結束群組
    } //結束迴圈
    console.log("讀取完畢：一共讀取了 " + Anime.length + " 部動畫"); //在載入動畫完畢之後輸出
});