const activeDrawerItemClassName = 'mdui-color-theme-50 mdui-text-color-theme';
const weekChinese = ["日", "一", "二", "三", "四", "五", "六"]
const week = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const carrierChinese = {
    "Comic": "漫畫改編",
    "Game": "遊戲改編",
    "Novel": "小說改編",
    "Original": "原創劇情",
}
const carrierIcon = {
    "Comic": "edit",
    "Game": "videogame_asset",
    "Novel": "book",
    "Original": "tv",
}
const showDate = week.map((w, i) =>
    ({
        id: w,
        day: `週${weekChinese[i]}`
    })
)
const indexData = {
    2017: {
        7: "anime2017.07.json",
        10: "anime2017.10.json"
    },
    2018: {
        1: "anime2018.01.json",
        4: "anime2018.04.json",
        7: "anime2018.07.json",
        10: "anime2018.10.json"
    },
    2019: {
        1: "anime2019.01.json",
        4: "anime2019.04.json",
        7: "anime2019.07.json",
        10: "anime2019.10.json"
    },
    2020: {
        1: "anime2020.01.json"
    }
};
// 路由
const router = new Navigo('./', true, '#/');
router
    .on({
        ':type/:year/:month/': params => loadData({
            js: "./anime-data/" + indexData[params.year][params.month],
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
            $("#drawer>.mdui-list *").removeClass(activeDrawerItemClassName)
            $(`[href="${router.lastRouteResolved().url}"]`).addClass(activeDrawerItemClassName)
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
            <i class="mdui-list-item-icon mdui-icon eva eva-home-outline"></i>
            <div class="mdui-list-item-content">首頁</div>
        </li>`
    )
    for (year of Object.keys(indexData).reverse()) {
        for (month of Object.keys(indexData[year]).reverse()) {
            let html = $(
                `<li class="mdui-collapse-item" al-month="${year}-${month}">
                    <div class="mdui-collapse-item-header mdui-list-item mdui-ripple">
                        <i class="mdui-list-item-icon mdui-icon eva eva-archive-outline"></i>
                        <div class="mdui-list-item-content">${year} ${month.length > 1 ? month : '0' + month} 月新番</div>
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
    $(p ? `[href="${u}"]` : `[href="home"][data-navigo]`).addClass(activeDrawerItemClassName)

});

function showHome() {
    function appendRecentUpdate() {
        let count = 0
        let bg = [
            'https://i.imgur.com/NlrxM2r.png',
            'https://i.imgur.com/EEvQxpd.jpg',
            'https://pbs.twimg.com/media/D1noaUmUcAMmG3I.jpg',
            'https://cdn.discordapp.com/attachments/468412959119638550/591666130440159242/key_visual_01.png',
            'https://cdn.discordapp.com/attachments/468412959119638550/591670537588178970/kv.png',
            'https://cdn.discordapp.com/attachments/88111110519009280/591651856854548480/mainImg_2.png',
            'https://cdn.discordapp.com/attachments/468412959119638550/591672728902172672/main_img_2.png',
            'https://cdn.discordapp.com/attachments/468412959119638550/591696683793121281/img01.png',
            'https://cdn.discordapp.com/attachments/88111110519009280/532517709280444426/kv01-on.png',
            'https://i.imgur.com/cNmql8G.png',
            'https://i.imgur.com/EguHw7O.jpg',
            'https://i.imgur.com/SZg299H.jpg',
        ].sort(() => Math.random() - 0.5)
        let bgCounter = 0
        for (year of Object.keys(indexData).reverse()) {
            for (month of Object.keys(indexData[year]).reverse()) {
                if (count >= 3) break;
                let y = year,
                    m = month
                let bgImg = bg[bgCounter]
                bgCounter++
                $('#content .recent-update').append(
                    $(
                        `<a class="card" title="${y} 年 ${m} 月新番" href="info/${y}/${m}" data-navigo>
                        <div class="image" style="background-image:url('${bgImg}')"></div>
                        <div class="content">
                            <div class="name mdui-text-color-theme">${m} 月新番</div>
                            <div class="nameInJpn">${y} 年</div>
                        </div>
                    </a>`).click(function () {
                        new mdui.Collapse("#drawer>.mdui-list").open(`[al-month="${y}-${m}"]`);
                    })
                )
                count++
            }
        }
        router.updatePageLinks()
    }
    $("#content").html(
        `<div class="mdui-typo">
            <div class="mdui-typo-display-2">Anime List</div>
            <p hide-phone>使用左方選單來瀏覽本站資料</p>
            <p hide-desktop>點擊左上角選單鈕來瀏覽本站資料</p>
            <div class="mdui-typo-display-1">最近更新</div>
        </div>
        <div class="recent-update"></div>
        <div class="mdui-typo">
            <div class="mdui-typo-display-1">資料有誤？</div>
            <p>歡迎至 <a href="https://github.com/ACGNTaiwan/Anime-List" target="_blank">GitHub</a> 提交 PR</p>
            <div class="mdui-typo-display-1">貢獻者</div>
        </div>
        <div al-contributors>正在讀取新鮮的肝......</div>`
    )
    appendRecentUpdate()
    fetch("https://api.github.com/repos/ACGNTaiwan/Anime-List/contributors")
        .then(res => res.json())
        .then(data => {
            let r = `<div class="contributors">`
            for (user of data) {
                if (user.login == 'invalid-email-address') continue
                r += `<a class="card" href="${user.html_url}" title="${user.login}" target="_blank">
                <div class="image" style="background-image:url('${user.avatar_url}')"></div>
                <div class="content">
                    <div class="name mdui-text-color-theme">${user.login}</div>
                    <div class="nameInJpn">${user.contributions}</div>
                </div>
            </a>`
            }
            r += `</div>`
            $("[al-contributors]").html(r);
        }).catch(err => $("[al-contributors]").attr('class', '').html(
            `<div class="mdui-typo">蹦蹦爆炸了，請稍後再試。<pre>錯誤原因：\n${err}</pre></div>`
        ))
}

async function loadData({
    js,
    type,
    year
}) {
    try {
        let anime_data
        if (sessionStorage["anime_data_" + js]) {
            anime_data = JSON.parse(sessionStorage["anime_data_" + js]).data
        } else {
            anime_data = await fetch(js).then(res => res.json())
            sessionStorage["anime_data_" + js] = JSON.stringify({
                data: anime_data,
                updatedTime: new Date()
            })
        }
        // 讓動畫按時間排序
        const sorted_anime = anime_data.sort((a, b) => {
            //new Date(year, month[, day[, hour[, minutes[, seconds[, milliseconds]]]]]);
            let aTime = new Date(year, a.date.split("/")[0], a.date.split("/")[1], a.time.split(":")[0], a.time.split(":")[1]),
                bTime = new Date(year, b.date.split("/")[0], b.date.split("/")[1], b.time.split(":")[0], b.time.split(":")[1]);
            return aTime - bTime;
        });
        $("#content").attr('class', '').html('')
        switch (type) {
            case "waterfall":
                return waterfall(sorted_anime, year)
            case "info":
                return info(sorted_anime, year)
            case "schedule":
                return schedule(sorted_anime, year)
        }
    } catch (err) {
        $("#content").attr('class', '').html(`<div class="mdui-typo">蹦蹦爆炸了，請稍後再試。<pre>錯誤原因：\n${err}</pre></div>`)
    }
}

function waterfall(Anime, year) {
    let container = $('<div class="waterfall"></div>')
    for (let item of Anime) {
        // 如果不是第一季 ? 動畫名稱+季度 : 動畫名稱
        let animeName = item.name + (item.season != "1" ? " S" + item.season : '')
        $(container).append(
            $(`<div class="card">
                <div class="image mdui-ripple mdui-ripple-white">
                    <img src="${item.img}"/>
                    <div class="content">
                        <div class="name">${animeName}</div>
                        <div class="nameInJpn">${item.nameInJpn}</div>
                        <div class="description">${item.description}</div>
                    </div>
                </div>
            </div>`).click(function () {
                showAnimeInfoDialog(item, year)
            })
        )
    }
    $("#content").append(container)
}

function schedule(Anime, year) {
    $("#content").append(`<div class="schedule"></div>`)
    for (day of showDate) {
        $(`#content>.schedule`).append(
            `<div class="mdui-list day" id="${day.id}">
                <h3 class="al-header">${day.day}</h3>
            </div>`
        )
    }
    $(`#content>.schedule`).append(
        `<div class="mdui-list day" id="unknown" al-time-unknown>
            <h3>播出時間未知</h3>
        </div>`
    )
    for (let item of Anime) {
        let animeName = item.name + (item.season != "1" ? " S" + item.season : '')
        let animeDay;
        let time = `${item.date} ${item.time}`
        if (item.date == "" || item.date.split("/")[1] == "") {
            animeDay = 'unknown'
            time = item.nameInJpn
        } else {
            let setTime = new Date((item.year || year) + "/" + item.date)
            animeDay = week[setTime.getDay()]; //星期
        }
        $(`#${animeDay}`).append(function () {
            return $(`<div class="mdui-list-item mdui-ripple">
                <div class="mdui-list-item-avatar"><img src="${item.img}"/></div>
                <div class="mdui-list-item-content" title="${animeName}">
                    <div class="mdui-list-item-title">${animeName}</div>
                    <div class="mdui-list-item-text">${time}</div>
                </div>
            </div>`).click(function () {
                showAnimeInfoDialog(item, year)
            })
        })
    }
    if ($("#unknown>*").length == 1) {
        $(`[al-time-unknown]`).remove()
    }
}

function info(Anime, year) {
    $(`#content`).append(
        `<div class="mdui-typo-display-1 al-header" al-time-unknown>播出時間未知</div>
        <div class="info" id="unknown" al-time-unknown></div>`
    )
    for (day of showDate)
        $(`#content`).append(
            `<div class="mdui-typo-display-1 al-header">${day.day}</div>
            <div class="info" id="${day.id}"></div>`
        )
    for (let item of Anime) {
        let animeName = item.name + (item.season != "1" ? " S" + item.season : '')
        let setTime = new Date((item.year || year) + "/" + item.date)
        let animeDay = week[setTime.getDay()]; //星期
        let time = `<i class="mdui-icon material-icons">access_time</i> ${item.date}(${weekChinese[setTime.getDay()]}) ${item.time}`
        if (item.date == "" || item.date.split("/")[1] == "") time = "", animeDay = 'unknown'

        $(`#${animeDay}`).append($(`<div class="card">
                <div class="image" style="background-image:url('${item.img}')">
                    <div class="time">${time}</div>
                </div>
                <div class="content">
                    <div class="name mdui-text-color-theme">${animeName}</div>
                    <div class="nameInJpn">${item.nameInJpn}</div>
                    <div class="description">${item.description}</div>
                </div>
            </div>`).click(function () {
            showAnimeInfoDialog(item, year)
        }))
    }
    if ($("#unknown>*").length == 0)
        $(`[al-time-unknown]`).remove()
}

function showAnimeInfoDialog(item, year) {
    let animeName = item.name + (item.season != "1" ? " S" + item.season : '')
    let time = `${item.date}(${weekChinese[new Date((item.year || year) + "/" + item.date).getDay()]}) ${item.time}`
    if (item.date.trim() === "" || !item.date) time = "播出時間未知"
    let carrierChip = ""
    if (item.carrier)
        carrierChip = `
        <div class="mdui-chip">
            <span class="mdui-chip-icon"><i class="mdui-icon material-icons">${carrierIcon[item.carrier]}</i></span>
            <span class="mdui-chip-title">${carrierChinese[item.carrier]}</span>
        </div>`
    let animeDialogContent = `
    <div class="anime-info-container">
        <div class="anime-poster" style="background-image:url('${item.img}')"></div>
        <div class="anime-info-container">
            <div class="anime-info">
                <div class="mdui-typo-title">${animeName}</div>
                <div class="mdui-typo-subheading-opacity">${item.nameInJpn}</div>
                <div class="mdui-chip">
                    <span class="mdui-chip-icon"><i class="mdui-icon material-icons">access_time</i></span>
                    <span class="mdui-chip-title">${time}</span>
                </div>
                ${carrierChip}
                <p>${item.description || '尚無簡介：（'}</p>
            </div>
            <div class="anime-actions">
                ${item.official ? `<a class="mdui-btn mdui-btn-dense mdui-ripple" href="${item.official}" target="_blank">官網</a>` : ''}
                <button class="mdui-btn mdui-btn-dense mdui-color-theme-accent mdui-ripple" mdui-dialog-close>關閉</button>
            </div>
        </div>
    </div>`
    router.pause()
    mdui.dialog({
        //title: animeName,
        content: animeDialogContent,
        history: navigator.userAgent.toLowerCase().indexOf('firefox') == -1, // not Firefox
        /* buttons: [{
             text: '關閉'
         }],*/
        onClose: () => router.pause(false)
    });
}
