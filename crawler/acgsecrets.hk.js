// https://acgsecrets.hk/bangumi/202004/
let res = []
document.querySelectorAll('[acgs-bangumi-anime-id]').forEach((el, i) => {
    let date = "", time = ""
    if (el.querySelector('.time_tomorrow').textContent.startsWith("跨季")) {
        // skip anime from last season
        return;
    }
    if (el.querySelector('.time_today').textContent != "時間未定") {
        let qlm = el.querySelector('.time_tomorrow').textContent.match(/播放日期：\d{4}年(\d{1,2})月(\d{1,2})日起／.+／(\d{1,2})時(\d{1,2})分/)
        if (qlm) {
            date = qlm[1] + '/' + qlm[2]
            time = qlm[3].padStart(2, "0") + ':' + qlm[4].padStart(2, "0")
        }
    }
    res.push({
        "name": el.querySelector('.entity_localized_name').textContent,
        date,
        time,
        "carrier": { 原創作品: "Original", 漫畫改編: "Comic", 小說改編: "Novel", 遊戲改編: "Game", 改編作品: "Original" }[el.querySelector('.anime_tag tags').textContent] || "Original",
        "season": 1,
        "originalName": el.querySelector('.entity_original_name').textContent,
        "img": el.querySelector('.anime_cover_image').getAttribute("acgs-img-data-url"),
        "official": el.querySelector('.anime_links a') ? el.querySelector('.anime_links a').href : '',
        "description": el.querySelector('.anime_story') ? el.querySelector('.anime_story').textContent : ""
    })
});
console.log(JSON.stringify(res, null, 2))
