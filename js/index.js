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
const showDate = week.map((w, i) => ({
    id: w,
    day: `週${weekChinese[i]}`
}))
const month2Season = month => ({ 1: '冬', 4: '春', 7: '夏', 10: '秋' }[month] || '新')
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
        1: "anime2020.01.json",
        4: "anime2020.04.json",
        7: "anime2020.07.json",
        10: "anime2020.10.json"
    },
    2021: {
        1: "anime2021.01.json",
        4: "anime2021.04.json",
        7: "anime2021.07.json",
        10: "anime2021.10.json"
    }
};
// 圖片數量不得小於 5
const bg = arrayShuffle([
    'https://cdn.discordapp.com/attachments/439314137584107532/728258277938561056/E382ADE383BCE38393E382B8E383A5E382A2E383AB.png',
    'https://cdn.discordapp.com/attachments/439314137584107532/732937057055539240/unknown.png',
    'https://cdn.discordapp.com/attachments/439314137584107532/860905520940187679/00000036.jpg',
    'https://cdn.discordapp.com/attachments/439314137584107532/860908283832827924/ogp_3.jpg',
    'https://cdn.discordapp.com/attachments/439314137584107532/860911055659073536/unknown.png',
    'https://cdn.discordapp.com/attachments/439314137584107532/860912162141372466/cut06.jpg',
    'https://cdn.discordapp.com/attachments/439314137584107532/860914231560765450/snapshot5.jpg',
    'https://cdn.discordapp.com/attachments/439314137584107532/860918794217455616/E4KgGp7VgAEuECb.webp',
    'https://cdn.discordapp.com/attachments/787359871682478153/856738206334451732/d92921dff9ce1efa796e5c45a0118a2c7647545ca3a098271a23565f1156f08b.jpg',
    'https://cdn.discordapp.com/attachments/439314137584107532/860929446281084928/img_ep01-1.jpg',
    'https://cdn.discordapp.com/attachments/439314137584107532/860929867448451092/img_ep01-4.jpg'
])
// 路由
const router = new Navigo('./', true, '#/');
router
    .on({
        ':type/:year/:month/': params => loadData({
            js: "./anime-data/" + indexData[params.year][params.month],
            type: params.type,
            year: params.year,
            month: params.month
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
let drawer;
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
                        <div class="mdui-list-item-content">${year} ${month.length > 1 ? month : '0' + month} 月${month2Season(month)}番</div>
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
    drawer = new mdui.Collapse("#drawer>.mdui-list", { accordion: true })
    drawer.open(p ? `[al-month="${p.year}-${p.month}"]` : 0); //第一個讓他蹦出來
    $(p ? `[href="${u}"]` : `[href="home"][data-navigo]`).addClass(activeDrawerItemClassName)
    // 隨機背景圖
    hwBackground(bg[0])

});

function hwHeader(title, subtitle, phoneSubtitle) {
    $(`#hw-header .hw-title`).text(title)
    $(`#hw-header .hw-subtitle`).text(subtitle)
    if (phoneSubtitle)
        $(`#hw-header .hw-subtitle[hide-desktop]`).text(phoneSubtitle)
}

function hwBackground(url) {
    $(`#hw-bg`).attr('style', `background-image: url("${url}")`)
}

function showHome() {
    function appendRecentUpdate() {
        let count = 0
        let bgCounter = 1
        for (year of Object.keys(indexData).reverse()) {
            for (month of Object.keys(indexData[year]).reverse()) {
                if (count >= 4) break;
                let y = year,
                    m = month
                let bgImg = bg[bgCounter]
                bgCounter++
                $('#content .recent-update').append(
                    $(
                        `<a class="card" title="${y} 年 ${m} 月${month2Season(m)}番" href="info/${y}/${m}" data-navigo>
                        <div class="image" style="background-image:url('${bgImg}')">
                            <div class="hover-icon hover-show">
                                <i class="mdui-icon eva eva-arrow-ios-forward-outline"></i>
                            </div>
                        </div>
                        <div class="content">
                            <div class="name mdui-text-color-theme">${m} 月${month2Season(m)}番</div>
                            <div class="originalName">${y} 年</div>
                        </div>
                    </a>`
                    ).click(function () {
                        drawer.open(`[al-month="${y}-${m}"]`);
                    })
                )
                count++
            }
        }
        router.updatePageLinks()
    }
    hwHeader("Anime List", "使用左方選單來瀏覽本站資料", "點擊左上角選單鈕來瀏覽本站資料")
    $("#content").html(
        `<div class="mdui-typo">
            <div class="mdui-typo-display-1 al-header">最近更新</div>
        </div>
        <div class="recent-update"></div>
        <div class="mdui-typo">
            <div class="mdui-typo-display-1 al-header">一起貢獻吧！</div>
            <p>若資料有誤或想提供資料，歡迎至 <a href="https://github.com/ACGNTaiwan/Anime-List" target="_blank">GitHub</a> 提交 PR。</p>
            <div class="mdui-typo-display-1 al-header">貢獻者</div>
        </div>
        <div al-contributors>正在讀取新鮮的肝......</div>
        <div class="mdui-typo">
            <div class="mdui-typo-display-1 al-header">留言板</div>
        </div>
        <script async src="https://comments.app/js/widget.js?3" data-comments-app-website="lUO82nuW" data-limit="20" data-page-id="homePage" data-outlined="1" data-colorful="1" data-height="300"></script>`
    )
    appendRecentUpdate()
    fetch("https://api.github.com/repos/ACGNTaiwan/Anime-List/contributors")
        .then(res => res.json())
        .then(data => {
            let r = `<div class="contributors">`
            for (user of data) {
                if (user.login == 'invalid-email-address') continue
                r += `<a class="card" href="${user.html_url}" title="${user.login}" target="_blank">
                <div class="image" style="background-image:url('${user.avatar_url}')">
                    <div class="hover-icon hover-show">
                        <i class="mdui-icon eva eva-github-outline"></i>
                    </div>
                </div>
                <div class="content">
                    <div class="name mdui-text-color-theme">${user.login}</div>
                    <div class="originalName">${user.contributions} commits</div>
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
    year,
    month
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
        let typeChinsese = {
            waterfall: "瀑布流",
            info: "圖文介紹",
            schedule: "日程表",
        }
        hwHeader(`${year} 年 ${month} 月${month2Season(month)}番`, typeChinsese[type])
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
        $(container).append(
            $(`<div class="card">
                <div class="image mdui-ripple mdui-ripple-white">
                    <img src="${item.img}"/>
                </div>
                <div class="content">
                    <div class="name mdui-typo-title mdui-text-color-theme">${item.name}</div>
                    <div class="originalName">${item.originalName}</div>
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
            <h3 class="al-header">播出時間未知</h3>
        </div>`
    )
    for (let item of Anime) {
        let animeDay;
        let time = `${item.date} ${item.time}`
        if (item.date == "" || item.date.split("/")[1] == "") {
            animeDay = 'unknown'
            time = ''
        } else {
            let setTime = new Date((item.year || year) + "/" + item.date)
            animeDay = week[setTime.getDay()]; //星期
        }
        $(`#${animeDay}`).append(function () {
            return $(`<div class="mdui-list-item mdui-ripple">
                <div class="mdui-list-item-content" title="${item.name}">
                    <div class="mdui-list-item-title">${item.name}</div>
                    <div class="mdui-list-item-text">${time}</div>
                </div>
            </div>`).click(function () {
                showAnimeInfoDialog(item, year)
            })
        })
    }
    if ($("#unknown>*").length <= 1) {
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
            `<div id="${day.id}">
                <div class="mdui-typo-display-1 al-header">${day.day}</div>
                <div class="info"></div>
            </div>`
        )
    for (let item of Anime) {
        let setTime = new Date((item.year || year) + "/" + item.date)
        let animeDay = week[setTime.getDay()]; //星期
        let time = `${item.date}(${weekChinese[setTime.getDay()]}) ${item.time}`
        if (item.date == "" || item.date.split("/")[1] == "") time = "", animeDay = 'unknown'
        $(`#${animeDay}>.info`).append($(
            `<div class="card">
                <div class="image" style="background-image:url('${item.img}')">
                    <div class="hover-icon hover-show">
                        <i class="mdui-icon eva eva-info-outline"></i>
                    </div>
                </div>
                <div class="content">
                    <div class="name mdui-text-color-theme mdui-typo-title">${item.name}</div>
                    <div class="originalName">${item.originalName}</div>
                    <div class="time">${time}</div>
                    <div class="description">${item.description}</div>
                </div>
            </div>`
        ).click(function () { showAnimeInfoDialog(item, year) }))
    }
    if ($("#unknown>*").length == 0)
        $(`[al-time-unknown]`).remove()
}

function showAnimeInfoDialog(item, year) {
    let animeId = md5((item.url || item.name) + '_S' + item.season)
    let time = `${item.date}(${weekChinese[new Date((item.year || year) + "/" + item.date).getDay()]}) ${item.time}`
    if (item.date.trim() === "" || !item.date) time = "播出時間未知"
    // 動畫詳細資料清單
    let displayItems = []
    displayItems.push({ icon: 'access_time', title: '播出時間', content: time })
    displayItems.push({ icon: 'label', title: '季數', content: item.season })
    if (item.carrier)
        displayItems.push({ icon: carrierIcon[item.carrier], title: '原作載體', content: carrierChinese[item.carrier] })
    displayItems.push({ icon: 'info', title: '簡介', content: item.description || '尚無簡介！' })
    if (item.official)
        displayItems.push({ icon: 'public', title: '官網', content: item.official, href: item.official })
    let displayItemsResult = displayItems.map(({ href, title, content, icon }) =>
        `<a class="mdui-list-item mdui-ripple" ${href ? `href="${href}" target="_blank"` : ''}>
            <i class="mdui-list-item-icon mdui-icon material-icons mdui-text-color-indigo">${icon}</i>
            <div class="mdui-list-item-content">
                <div class="mdui-list-item-title">${title}</div>
                <div class="mdui-list-item-text">${content}</div>
            </div>
            ${href ? `<i class="mdui-list-item-icon mdui-icon material-icons">open_in_new</i>` : ''}
        </a>`
    ).join('')
    let animeDialogContent = `
    <div class="anime-container">
        <div class="anime-poster" style="background-image:url('${item.img}')"><img src="${item.img}"/></div>
        <div class="anime-info-container">
            <div class="mdui-tab mdui-tab-full-width" mdui-tab>
                <a href="#anime-tab-info" class="mdui-ripple">簡介</a>
                <a href="#anime-tab-comment" class="mdui-ripple">留言板</a>
            </div>
            <div id="anime-tab-info" class="mdui-p-a-2">
                <div class="anime-info">
                    <div class="mdui-typo-title mdui-text-color-theme">${item.name}</div>
                    <div class="mdui-typo-subheading-opacity">${item.originalName}</div>
                    <div class="mdui-list">
                        ${displayItemsResult}
                    </div>
                </div>
            </div>
            <div id="anime-tab-comment" class="mdui-p-a-2">
               
            </div>
            <div class="anime-actions" style="padding: 16px">
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
    mdui.mutation()
    $("#anime-tab-comment").html(`<script async src="https://comments.app/js/widget.js?3" data-comments-app-website="lUO82nuW" data-limit="20" data-page-id="${animeId}" data-outlined="1" data-colorful="1" data-height="450"></script>`)
}

/**
 * @template T
 * @param {Array<T>} array
 * @returns {Array<T>}
 * 
 * @link https://github.com/sindresorhus/array-shuffle
 * @license
 * MIT License
 * 
 * Copyright (c) Sindre Sorhus <sindresorhus@gmail.com> (https://sindresorhus.com)
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
function arrayShuffle(array) {
	if (!Array.isArray(array)) {
		throw new TypeError(`Expected an array, got ${typeof array}`);
	}

	array = [...array];

	for (let index = array.length - 1; index > 0; index--) {
		const newIndex = Math.floor(Math.random() * (index + 1));
		[array[index], array[newIndex]] = [array[newIndex], array[index]];
	}

	return array;
};