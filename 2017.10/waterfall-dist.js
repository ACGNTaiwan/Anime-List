function ShowList() {
    $("#load").removeClass("active"), $("#waterfall").attr("style", "");
}

$(function() {
    for (i = 0; i < Anime.length; i += 1) {
        if ("1" != Anime[i].season) e = Anime[i].name + " S" + Anime[i].season; else var e = Anime[i].name;
        var a = Anime[i].img, n = Anime[i].description;
        $("#waterfall").append($("<div/>").addClass("ts card").attr("id", e).append($("<div/>").addClass("image").append($("<img/>").addClass("image").attr("src", a)).append($("<div/>").addClass("header").html(e).append($("<div/>").addClass("sub header").html(n))))), 
        console.groupCollapsed("讀取成功：" + e), console.log("排序", i), console.log("名稱", e), 
        console.log("圖片", a), console.groupEnd();
    }
    console.log("讀取完畢：一共讀取了 " + Anime.length + " 部動畫");
}), window.onload = ShowList;
