var result = [];
$("#item-list .one-shiban").each((_i, e) => {
    let $anime = $(e);
    let imgSrc = $anime.children("a").children("img").attr("src");
    let name = $anime.children("a").children(".book-name").text();
    let jpName = $anime.children(".author").children("span").text();

    let regex = /\s第([1-9]+)期$/;
    let season = (regex.test(name)) ? parseInt(regex.exec(name)[1]) : 1;
    animeData = {
        "name": name,
        "originalName": jpName,
        "date": "4/",
        "time": "none",
        "carrier": "Comic Novel Game Original",
        "season": season,
        "episode": 0,
        "img": imgSrc,
        "official": "",
        "description": ""
    }
    result.push(animeData);
});

console.log(JSON.stringify(result, null, 2));