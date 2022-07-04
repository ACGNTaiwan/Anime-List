# 棒棒勝的 Jade 模板倉庫
裏頭放置了各種可以加速開發模板，歡迎取用
## 怎麼用？
在 Jade 中輸入 `include 你想用的模板.jade` 後按照說明即可快速使用

## _tocasui.jade
最新版本的 Tocas UI，不需要其餘設定

如果有更新沒跟到，可以直接發 PR 或是去開 Issue

## _tags.jade
快速產生社群網站所需的標籤
```jade
格式
+social_tags(title,description,image,url)
```
```jade
範例
+social_tags('Tocas Xiaoan','第一天，洨安創造了始春。第二天，始春延期了。第三天，始春持續延期好評熱映中。','og.jpg','https://xiaoan.tocas-ui.com/')
```

