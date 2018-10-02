showDate = [{ id: 'Sun', day: '週日' }, { id: 'Mon', day: '週一' }, { id: 'Tue', day: '週二' }, { id: 'Wed', day: '週三' }, { id: 'Thu', day: '週四' }, { id: 'Fri', day: '週五' }, { id: 'Sat', day: '週六' }];
AnimeData = [{
    name: '10月秋番',
    js: './2018.10/anime2018.10.js',
    year: 2018
}, {
    name: '7月夏番',
    js: './2018.07/anime2018.07.js',
    year: 2018
}, {
    name: '4月春番',
    js: './2018.04/anime2018.04.min.js',
    year: 2018
}, {
    name: '1月冬番',
    js: './2018.01/anime2018.01.min.js',
    year: 2018
}, {
    name: '10月秋番',
    js: './2017.10/anime2017.10.min.js',
    year: 2017
}, {
    name: '7月夏番',
    js: './2017.07/anime2017.07.min.js',
    year: 2017
}];
$(function() {
    /* Top Button */
    $('[data-top]').click(function() {
        $('html').animate({
            scrollTop: 0
        }, 600);
    });


    /* Switch */
    for (i = 0; i < AnimeData.length; i = i + 1) {
        let name = AnimeData[i].name,
            js = AnimeData[i].js,
            year = AnimeData[i].year
        $("#switch") //這裡用到了 JQ
            .append($("<div/>").attr('id', name)
                .append($("<h2/>").addClass("ts header").html(name)
                    .append($("<div/>").addClass("sub header").html(year))
                )
                .append($("<div/>").addClass("ts doubling three cards")
                    .append($("<a/>").addClass("ts card").attr('data-type', 'info').attr('data-js', js).attr('data-year', year)
                        .append($("<div/>").addClass("content")
                            .append($("<div/>").addClass("header")
                                .html('介紹')
                            )
                            .append($("<div/>").addClass("description")
                                .html('圖文介紹')
                            )
                        )
                        .append($("<div/>").addClass("symbol")
                            .append($("<i/>")
                                .addClass("icon newspaper")
                            )
                        )
                    )
                    .append($("<a/>").addClass("ts card").attr('data-type', 'schedule').attr('data-js', js).attr('data-year', year)
                        .append($("<div/>").addClass("content")
                            .append($("<div/>").addClass("header")
                                .html('日程表')
                            )
                            .append($("<div/>").addClass("description")
                                .html('以表格展示新番日程')
                            )
                        )
                        .append($("<div/>").addClass("symbol")
                            .append($("<i/>")
                                .addClass("icon table")
                            )
                        )
                    )
                    .append($("<a/>").addClass("ts card").attr('data-type', 'waterfall').attr('data-js', js).attr('data-year', year)
                        .append($("<div/>").addClass("content")
                            .append($("<div/>").addClass("header")
                                .html('瀑布流')
                            )
                            .append($("<div/>").addClass("description")
                                .html('一個美觀的展示用頁面')
                            )
                        )
                        .append($("<div/>").addClass("symbol")
                            .append($("<i/>")
                                .addClass("icon grid layout")
                            )
                        )
                    )
                )
            );
    }
    // slick 
    $('#switch').slick({
        arrows: false,
        speed: 270,
        infinite: false,
        swipe: false
    });
    $('#switch-buttons .button').click(function() {
        $('#switch-buttons [data-slick]').removeClass('disabled').removeAttr('disabled')
        $('#switch').slick($(this).attr('data-slick'));
    });
    // 自動停用按鈕
    $('#switch-buttons [data-slick="slickPrev"]').addClass('disabled').attr('disabled')
    $('#switch').on('afterChange', function(event, slick, direction) {
        if (direction == event.isTrigger + 1) $('#switch-buttons [data-slick="slickNext"]').addClass('disabled').attr('disabled', '')
        if (direction == 0) $('#switch-buttons [data-slick="slickPrev"]').addClass('disabled').attr('disabled', '')
    });
    // 卡片點擊載入資料
    $('[data-js]').click(function() {
        if ($(this).hasClass('active')) return

        let js = $(this).attr('data-js'),
            type = $(this).attr('data-type'),
            year = $(this).attr('data-year')

        $('[data-js]').removeClass('active')
        $(this).addClass('active')
        $('[data-js]:not(.active)').addClass('disabled')

        $("#content").attr('data-animation', '')
        $("#content").attr('data-animation', 'fadeOut')

        // 啟用快取 $.getScript()
        $.ajaxSetup({
            cache: true
        });
        $.getScript(js)
            .done(function(script, textStatus) {
                $("#offline").addClass('hide')
                setTimeout(function() {
                    $("#content").attr('class', '').html('')
                    if (type == 'waterfall') {
                        waterfall(Anime)
                    }
                    if (type == 'info') {
                        info(Anime, year)
                    }
                    if (type == 'schedule') {
                        schedule(Anime, year)
                    }
                    $("#content").attr('data-animation', 'fadeIn')
                    setTimeout(function() {
                        $("#content").attr('data-animation', '')
                        $('[data-js]').removeClass('disabled')
                    }, 205);
                }, 201);
            })
            .fail(function() {
                $("#offline").removeClass('hide')
                console.log('offline')
                setTimeout(function() {
                    $("#content").attr('class', '').html('')
                    $("#content").attr('data-animation', 'fadeIn')
                    setTimeout(function() {
                        $("#content").attr('data-animation', '')
                        $('[data-js]').removeClass('disabled')
                    }, 205);
                }, 201);
            });
    });
    /* Fade in */
    $("body>footer,body>.ts.container").removeClass('hide')
});


function waterfall(Anime) {
    // 透過迴圈輸出資料內的所有動畫
    // Anime.length = 動畫總數
    // 迴圈開始
    for (i = 0; i < Anime.length; i = i + 1) {
        // 如果不是第一季，顯示季度
        // 如果是第一季，僅顯示動畫名稱
        let animeName = Anime[i].season != "1" ? Anime[i].name + " S" + Anime[i].season : Anime[i].name,
            animeImg = Anime[i].img,
            animeDescription = Anime[i].description
        $("#content").attr('class', 'ts four doubling waterfall cards').attr("data-type", 'waterfall')
            .append($(`<div class="ts card" id="${animeName}">
                <div class="image">
                    <img class="image" src="${animeImg}">
                    <div class="header">${animeName}
                        <div class="sub header">${animeDescription}</div>
                    </div>
                </div>
            </div>`))
    } //結束迴圈
}

function schedule(Anime, year) {
    $("#content").attr("class", 'ts doubling seven column grid')
    for (i = 0; i < showDate.length; i = i + 1) {
        let dayID = showDate[i].id,
            dayCht = showDate[i].day
        $("#content")
            .append($("<div/>").attr('class', 'column')
                .append($("<div/>").attr('class', 'ts very relaxed divided list').attr('id', dayID)
                    .append($("<h3/>").attr('class', 'ts header').html(dayCht))
                )
            );

    }
    // 透過迴圈輸出資料內的所有動畫
    // Anime.length = 動畫總數
    // 迴圈開始
    for (i = 0; i < Anime.length; i = i + 1) {
        // 如果不是第一季，顯示季度
        // 如果是第一季，僅顯示動畫名稱
        let animeName = Anime[i].season != "1" ? Anime[i].name + " S" + Anime[i].season : Anime[i].name,
            animeDay, animeDate
        setTime = new Date(year + "/" + Anime[i].date)
        animeDay = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][setTime.getDay()]; //星期
        animeDate = Anime[i].date; //星期
        $("#" + animeDay)
            .append($(`<div class="item" id="${animeName}">${animeDate} ${animeName}</div>`));
    } //結束迴圈
}

function info(Anime, year) {
    for (i = 0; i < showDate.length; i = i + 1) {
        let dayID = showDate[i].id,
            dayCht = showDate[i].day
        $("#content").attr("data-type", 'info')
            .append($("<h3/>")
                .html(dayCht)
            )
            .append($("<div/>")
                .attr("id", dayID)
                .attr('class', 'ts four doubling cards')
            );
    }
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

        var Anime_Time = Anime[i].time.match(/[0-9]?[0-9]\:[0-9]?[0-9]/) || Anime[i].date.match(/[0-9]?[0-9]\/[0-9]?[0-9]/) ?
            Anime[i].date + " (" + week_chinese[setTime.getDay()] + ") " + Anime[i].time :
            "尚未公開"
        var Anime_Adapt = Anime[i].carrier; //載體
        var Anime_Name_Jpn = Anime[i].nameInJpn; //日文原文
        var Anime_Img = Anime[i].img; //圖片
        var Anime_Info = Anime[i].description; //介紹
        $("#" + Anime_Day) //這裡用到了 JQ
            .append(`<div class="ts card Original" id="${Anime_Name}">
                <div class="image">
                    <img class="image" src="${Anime_Img}">
                </div>
                <div class="content">
                    <div class="header">${Anime_Name}</div>
                    <div class="meta">
                        <div>${Anime_Name_Jpn}</div>
                    </div>
                    <div class="extra">${Anime_Info}</div>
                </div>
                <div class="extra content">
                    <i class="time icon"></i>${Anime_Time}
                </div>
                <div class="symbol">
                    <i class="${Anime_Adapt} icon"></i>
                </div>
            </div>`)
    } //結束迴圈
}