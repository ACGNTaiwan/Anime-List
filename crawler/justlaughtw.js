//https://justlaughtw.blogspot.com/2019/03/2019-10.html
var links = [];
document.querySelectorAll('div[itemprop~="articleBody"] a').forEach((el) => {
    if (el.textContent == "官方網站") {
        links.push(el.href);
    }
});

var data = [];
var description = document.querySelector('div[itemprop~="articleBody"] > .separator + div').textContent.match(/　　(.*)/gm);
for (i = 0; i < description.length; i++) {
    let d = description[i];
    let result = /　《([^《》]*)》/g.exec(d);
    let name = result[1];
    data.push({name: name, description: d.replace('　　', ''), official: links[i]});
}

console.log(JSON.stringify(data, null, 2));