# Anime-List
展示新番的清單

https://gnehs.github.io/Anime-List/
## 本期移除的資料欄位
week：我超懶的，自己用日期推ㄅ
## 本期新增的資料欄位
episode：用來顯示動畫的總集數，目前還不完整
## 如何使用
先載入資料
```html
<script src="https://gnehs.github.io/Anime-List/2018.04/anime2018.04.min.js"></script>
```
接下來就能開始使用了

## 範例
您可在首頁的 Console 中測試

```js
// 資料存取
-> Anime[0].name
<- LoveLive! SunShine!!
```
## 網頁範例
參考首頁: https://gnehs.github.io/Anime-List/

## 資料
### 格式
```json
{
    name: '動畫名稱',
    date: '首次播送日期(ex.6/13)',
    time: '首次播送時間',
    carrier: '原作載體(請參照原作載體格式)',
    season: '第?季',
    nameInJpn: '動畫原文名稱',
    img: '海報',
    official: '動畫官網',
    description: '說明文(避免大量劇透)'
}
```
### 星期和載體的填寫格式
#### 原作載體 / Carrier

| Comic | Novel | Game | Original |
| ----- | ----- | ---- | -------- |
|  漫畫  |  小說 | 遊戲  | 原創或其他 |
### 資料有誤?
依照格式修改後發 PR 回來即可
### 資料來源
維基百科
https://zh.wikipedia.org/

百度百科
https://baike.baidu.com

萌娘百科
https://zh.moegirl.org/

Animen 動漫平台
https://www.animen.com.tw/

巴哈
https://forum.gamer.com.tw/