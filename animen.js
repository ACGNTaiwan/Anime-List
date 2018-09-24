json = ``
for (i = 0; i < $("#item-list .one-shiban").length; i++) {
    let $anime = $("#item-list .one-shiban").eq(i)
    let img = $anime.children("a").children("img").attr("src")
    let name = $anime.children("a").children(".book-name").text()
    let jpName = $anime.children(".author").children("span").text()
    json += `{
    name: '${name}',
    nameInJpn: '${jpName}',
    date: '10/',
    time: 'none',
    carrier: 'Comic Novel Game Original',
    season: '1',
    episode: '',
    img: '${img}',
    official: '',
    description: ''
},`
}
console.log(json)