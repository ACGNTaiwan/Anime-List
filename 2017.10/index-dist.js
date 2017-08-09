$(function() {
    for (i = 0; i < Anime.length; i += 1) {
        if ("1" != Anime[i].season) e = Anime[i].name + " S" + Anime[i].season; else var e = Anime[i].name;
        var n = Anime[i].week;
        if ("none" != Anime[i].week) a = Anime[i].date + " " + Anime[i].week + " " + Anime[i].time; else var a = "尚未公開";
        var d = Anime[i].carrier, o = Anime[i].nameInJpn, s = Anime[i].img, l = Anime[i].description;
        $("#none").append($("<div/>").addClass("ts card").attr("id", e).append($("<div/>").addClass("image").append($("<img/>").addClass("image").attr("src", s))).append($("<div/>").addClass("content").append($("<div/>").addClass("header").html(e)).append($("<div/>").addClass("meta").append($("<div/>").html(o))).append($("<div/>").addClass("extra").html(l))).append($("<div/>").addClass("extra content").html("<i class='time icon'></i>" + a)).append($("<div/>").addClass("symbol").append($("<i/>").addClass(d + " icon")))), 
        console.groupCollapsed("讀取成功：" + e), console.log("排序", i), console.log("名稱", e), 
        console.log("原文", o), console.log("時間", a), console.log("星期", n), console.log("改編", d), 
        console.log("介紹", l), console.log("圖片", s), console.groupEnd();
    }
    console.log("讀取完畢：一共讀取了 " + Anime.length + " 部動畫");
});
