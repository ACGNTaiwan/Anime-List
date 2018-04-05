function waterfall(Anime) { //=========================//
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
            var Anime_Info = Anime[i].description; //介紹
            $("#waterfall") //這裡用到了 JQ
                .append($("<div/>")
                    .addClass("ts card") //Tocas UI 的卡片
                    .attr("id", Anime_Name)
                    .append($("<div/>")
                        .addClass("image")
                        .append($("<img/>")
                            .addClass("image")
                            .attr("src", Anime_Img)
                        )
                        .append($("<div/>")
                            .addClass("header")
                            .html(Anime_Name)
                            .append($("<div/>")
                                .addClass("sub header")
                                .html(Anime_Info)
                            )
                        )
                    )
                );
        } //結束迴圈
    });
}

function schedule(Anime, year) {
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
            setTime = new Date(year + "/" + Anime[i].date)
            week = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
            var Anime_Day = week[setTime.getDay()]; //星期
            var Anime_Date = Anime[i].date; //星期
            $("#" + Anime_Day)
                .append($("<div/>")
                    .addClass("item")
                    .attr("id", Anime_Name)
                    .html(Anime_Date + " " + Anime_Name)
                );
        } //結束迴圈
    });
}

function index(Anime, year) { //=========================//
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
            setTime = new Date(year + "/" + Anime[i].date)
            week = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
            week_chinese = ["日", "一", "二", "三", "四", "五", "六"]
            var Anime_Day = week[setTime.getDay()]; //星期
            // 如果同時有撥放的日期、星期、時間，把時間設定為 日期+星期+時間
            // 如果沒有，僅顯示 尚未公開
            if (Anime[i].week != "none" || Anime[i].time != "尚未公開" || Anime[i].date != "尚未公開") {
                var Anime_Time = Anime[i].date + " (" + week_chinese[setTime.getDay()] + ") " + Anime[i].time; //撥出時間
            } else {
                var Anime_Time = "尚未公開";
            }
            var Anime_Adapt = Anime[i].carrier; //載體
            var Anime_Name_Jpn = Anime[i].nameInJpn; //日文原文
            var Anime_Img = Anime[i].img; //圖片
            var Anime_Info = Anime[i].description; //介紹
            $("#" + Anime_Day) //這裡用到了 JQ
                .append($("<div/>")
                    .addClass("ts card") //Tocas UI 的卡片
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
                                .html(Anime_Name_Jpn)
                            )
                        )
                        .append($("<div/>")
                            .addClass("extra")
                            .html(Anime_Info)
                        )
                    )
                    .append($("<div/>")
                        .addClass("extra content")
                        .html("<i class='time icon'></i>" + Anime_Time)
                    )
                    .append($("<div/>")
                        .addClass("symbol")
                        .append($("<i/>")
                            .addClass(Anime_Adapt + " icon")
                        )
                    )
                );
        } //結束迴圈
    });
}