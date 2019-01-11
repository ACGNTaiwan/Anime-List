showDate = [{
    id: 'Sun',
    day: '週日'
}, {
    id: 'Mon',
    day: '週一'
}, {
    id: 'Tue',
    day: '週二'
}, {
    id: 'Wed',
    day: '週三'
}, {
    id: 'Thu',
    day: '週四'
}, {
    id: 'Fri',
    day: '週五'
}, {
    id: 'Sat',
    day: '週六'
}];
indexData = {
    2017: {
        7: "./2017.07/anime2017.07.min.js",
        10: "./2017.10/anime2017.10.min.js"
    },
    2018: {
        1: "./2018.01/anime2018.01.js",
        4: "./2018.04/anime2018.04.js",
        7: "./2018.07/anime2018.07.js",
        10: "./2018.10/anime2018.10.js"
    },
    2019: {
        1: "./2019.01/anime2019.01.js"
    }
}
// 路由
const router = new Navigo('./', true, '#/');
router
    .on({
        ':type/:year/:month/': params => loadData({
            js: indexData[params.year][params.month],
            type: params.type,
            year: params.year
        }),
        '*': showHome
    })
    .resolve()
router
    .hooks({
        before: (done, params) => {
            $("#content").attr('class', '').html('')
            $("#drawer>.mdui-list *").removeClass('mdui-list-item-active')
            $(`[href="${router.lastRouteResolved().url}"]`).addClass('mdui-list-item-active')
            done()
        },
        after: params => {
            $('html, body').scrollTop(0)
        }
    })
$(function () {
    if (typeof InstallTrigger !== 'undefined') $("body").addClass("firefox")
    $("#drawer>.mdui-list").append(
        `<li class="mdui-list-item mdui-ripple" href="home" data-navigo>
            <i class="mdui-list-item-icon mdui-icon material-icons">home</i>
            <div class="mdui-list-item-content">首頁</div>
        </li>`
    )
    for (year of Object.keys(indexData).reverse()) {
        for (month of Object.keys(indexData[year]).reverse()) {
            let html = $(
                `<li class="mdui-collapse-item" al-month="${year}-${month}">
                    <div class="mdui-collapse-item-header mdui-list-item mdui-ripple">
                        <i class="mdui-list-item-icon mdui-icon material-icons">access_time</i>
                        <div class="mdui-list-item-content">${year} ${month.length>1?month:'0'+month} 月新番</div>
                        <i class="mdui-collapse-item-arrow mdui-icon material-icons">keyboard_arrow_down</i>
                    </div>
                    <ul class="mdui-collapse-item-body mdui-list mdui-list-dense">
                        <li class="mdui-list-item mdui-ripple" href="info/${year}/${month}" data-navigo>圖文介紹</li>
                        <li class="mdui-list-item mdui-ripple" href="schedule/${year}/${month}" data-navigo>日程表</li>
                        <li class="mdui-list-item mdui-ripple" href="waterfall/${year}/${month}" data-navigo>瀑布流</li>
                    </ul>
                </li>`
            )
            $("#drawer>.mdui-list").append(html)
        }
    }

    router.updatePageLinks()
    mdui.mutation(); //地方的 MDUI 需要初始化
    // 手機自動收回 drawer
    $(`#drawer [href]`).click(function () {
        if ($(window).width() < 1024) {
            new mdui.Drawer("#drawer").close();
        }
    });
    // p == null => 在首頁
    let p = router.lastRouteResolved().params
    let u = router.lastRouteResolved().url
    new mdui.Collapse("#drawer>.mdui-list").open(p ? `[al-month="${p.year}-${p.month}"]` : 0); //第一個讓他蹦出來
    $(p ? `[href="${u}"]` : `[href="home"][data-navigo]`).addClass('mdui-list-item-active')

});

function showHome() {
    $("#content").html(
        `<div class="mdui-typo">
            <div class="mdui-typo-display-2">Anime List</div>
            <p>使用右方選單來瀏覽本站資料</p>
            <div class="mdui-typo-display-1">資料有誤？</div>
            <p>歡迎至 <a href="https://github.com/ACGNTaiwan/Anime-List">GitHub</a> 提交 PR</p>
        </div>`
    )
}

function loadData({
    js,
    type,
    year
}) {
    $.ajaxSetup({
        cache: true
    });
    $.getScript(js)
        .done(function (script, textStatus) {
            $("#content").attr('class', '').html('')
            switch (type) {
                case "waterfall":
                    return waterfall(Anime, year)
                case "info":
                    return info(Anime, year)
                case "schedule":
                    return schedule(Anime, year)
            }
        })
}

function waterfall(Anime, year) {
    let container = $('<div class="waterfall"></div>')
    for (item of Anime) {
        // 如果不是第一季 ? 動畫名稱+季度 : 動畫名稱
        let animeName = item.name + (item.season != "1" ? " S" + item.season : '')
        $(container).append(
            `<div class="card">
                <div class="image" style="background-image:url('${item.img}')"></div>
                <div class="content">
                    <div class="name mdui-text-color-theme">${animeName}</div>
                    <div class="nameInJpn">${item.nameInJpn}</div>
                    <div class="description">${item.description}</div>
                </div>
            </div>`
        )
    }
    $("#content").append(container)
}

function schedule(Anime, year) {
    $("#content").append(`<div class="schedule"></div>`)
    for (day of showDate) {
        $(`#content>.schedule`).append(
            `<div class="mdui-list day" id="${day.id}">
                <h3>${day.day}</h3>
            </div>`
        )
    }
    $(`#content>.schedule`).append(
        `<div class="mdui-list day" id="unknown" al-time-unknown>
            <h3>播出時間未知</h3>
        </div>`
    )
    for (item of Anime) {
        let animeName = item.name + (item.season != "1" ? " S" + item.season : '')
        let animeDay;
        let animeDialogContent = `<img class="mdui-img-rounded" style="max-width: 20%;float: left;margin-right: 10px;" src="${item.img}"/>${item.description||'尚無簡介：（'}`
        let time = `${item.date} ${item.time}`
        if (item.date == "" || item.date.split("/")[1] == "") {
            animeDay = 'unknown'
            time = item.nameInJpn
        } else {
            let setTime = new Date((item.year || year) + "/" + item.date)
            animeDay = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][setTime.getDay()]; //星期
        }
        $(`#${animeDay}`).append(
            $(`<div class="mdui-list-item mdui-ripple">
                <div class="mdui-list-item-avatar"><img src="${item.img}"/></div>
                <div class="mdui-list-item-content" title="${animeName}">
                    <div class="mdui-list-item-title">${animeName}</div>
                    <div class="mdui-list-item-text">${time}</div>
                </div>
            </div>`).click(function () {
                router.pause()
                mdui.dialog({
                    title: animeName,
                    content: animeDialogContent,
                    history: !typeof InstallTrigger !== 'undefined', //!isFirefox
                    buttons: [{
                        text: '關閉'
                    }],
                    onClose: () => router.pause(false)
                });
            })
        )
    }
    if ($("#unknown>*").length == 1) {
        $(`[al-time-unknown]`).remove()
    }
}

function info(Anime, year) {
    $(`#content`).append(
        `<div class="mdui-typo-display-1 mdui-text-center" al-time-unknown>播出時間未知</div>
        <div class="mdui-typo" al-time-unknown><hr/></div>
        <div class="info" id="unknown" al-time-unknown></div>`
    )
    for (day of showDate) {
        $(`#content`).append(
            `<div class="mdui-typo-display-1 mdui-text-center">${day.day}</div>
            <div class="mdui-typo"><hr/></div>
            <div class="info" id="${day.id}"></div>`
        )
    }
    for (item of Anime) {
        let week = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
        let weekChinese = ["日", "一", "二", "三", "四", "五", "六"]
        let animeName = item.name + (item.season != "1" ? " S" + item.season : '')
        let setTime = new Date((item.year || year) + "/" + item.date)

        let animeDay = week[setTime.getDay()]; //星期

        let time = `<i class="mdui-icon material-icons">access_time</i> ${item.date}(${weekChinese[setTime.getDay()]}) ${item.time}`
        if (item.date == "" || item.date.split("/")[1] == "") time = "", animeDay = 'unknown'

        $(`#${animeDay}`).append(
            `<div class="card">
                <div class="image" style="background-image:url('${item.img}')">
                    <div class="time">${time}</div>
                </div>
                <div class="content">
                    <div class="name mdui-text-color-theme">${animeName}</div>
                    <div class="nameInJpn">${item.nameInJpn}</div>
                    <div class="description">${item.description}</div>
                </div>
            </div>`
        )
    }
    if ($("#unknown>*").length == 0) {
        $(`[al-time-unknown]`).remove()
    }
}