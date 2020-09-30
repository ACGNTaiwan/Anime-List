// http://yuc.wiki/202004/ BY-NC-SA 
let res = Array(document.querySelectorAll('.title_cn').length).fill({
    "name": "",
    "date": "",
    "time": "",
    "carrier": "",
    "season": 1,
    "originalName": "",
    "img": "",
    "official": "",
    "description": ""
})
res = JSON.parse(JSON.stringify(res))
document.querySelectorAll('.title_cn').forEach((el, i) => {
    res[i].name = el.textContent.replace(/第(.+)期/, '')
    res[i].season = parseInt(el.textContent.match(/第(.+)期/) ? el.textContent.match(/第(.+)期/)[1] : 1)
});
document.querySelectorAll('.title_jp').forEach((el, i) => {
    res[i].originalName = el.textContent.replace(/第(.+)期/, '')
});
document.querySelectorAll('.link_a').forEach((el, i) => {
    let qsA = el.querySelector('a')
    if (qsA) res[i].official = qsA.href
});
document.querySelectorAll(`td[class^="type"]`).forEach((el, i) => {
    res[i].carrier = { a: "Original", b: "Comic", c: "Novel", d: "Game" }[el.className.replace(`type_`, '')] || "Original"
});
console.log(JSON.stringify(res, null, 2))
// 建議使用繁化姬進行繁化
