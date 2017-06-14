//=========================//
//           輸出
//=========================//
$(function () {
    for (i = 0; i < Anime.length; i = i + 1) {
        var Anime_Name = Anime[i][0];//動畫名稱
        var Anime_Day = Anime[i][1];//星期
        var Anime_Time = Anime[i][2];//撥出時間
        var Anime_Adapt = Anime[i][3];//改編
        var Anime_Name_Jpn = Anime[i][4];//日文原文
        var Anime_Img = Anime[i][5];//圖片
        var Anime_Info = Anime[i][6];//介紹
        $("#" + Anime_Day)
            .append($("<div/>")
                .addClass("ts card")
                .append($("<div/>")
                    .addClass("image")
                    .append($("<img/>")
                        .addClass("image")
                        .attr("src", Anime_Img)
                    )
                )
                .append($("<div/>")
                    .addClass("content")
                    .append($("<div/>")
                        .addClass("header")
                        .html(Anime_Name)
                    )
                    .append($("<div/>")
                        .addClass("meta")
                        .append($("<div/>")
                            .html(Anime_Time+"<br>"+Anime_Name_Jpn)
                        )
                    )
                    .append($("<div/>")
                        .addClass("extra")
                        .html(Anime_Info)
                    )
                )
            );
    }
});