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
        var Anime_Time = Anime[i][2];//撥出時間
        var Anime_Adapt = Anime[i][3];//改編
        var Anime_Name_Jpn = Anime[i][4];//日文原文
        var Anime_Img = Anime[i][5];//圖片
        var Anime_Info = Anime[i][6];//介紹
        $("#" + Anime_Day)//這裡用到了 JQ
            .append($("<div/>")
                .addClass("ts card")//Tocas UI 的卡片
                .attr("id", Anime_Name)
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
                            .html(Anime_Time + "<br>" + Anime_Name_Jpn)
                        )
                    )
                    .append($("<div/>")
                        .addClass("extra")
                        .html(Anime_Info)
                    )
                )
                .append($("<div/>")
                    .addClass("symbol")
                    .append($("<i/>")
                        .addClass(Anime_Adapt + " icon")
                    )
                )
            );
        console.groupCollapsed("讀取成功："+Anime_Name);//將底下輸出資訊弄成群組
        console.log('排序', i);
        console.log('名稱', Anime_Name);
        console.log('原文', Anime_Name_Jpn);
        console.log('時間', Anime_Time);
        console.log('星期', Anime_Day);
        console.log('改編', Anime_Adapt);
        console.log('介紹', Anime_Info);
        console.log('圖片', Anime_Img);
        console.groupEnd();//結束群組
    }//結束迴圈
    console.log("讀取完畢：一共讀取了 " + Anime.length + " 部動畫");//在載入動畫完畢之後輸出
});