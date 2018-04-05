# Anime-List
展示新番的清單

https://gnehs.github.io/Anime-List/
## 本期新增的資料欄位
official：用來顯示動畫官網位置
## 如何使用
先載入資料
```html
<script src="https://gnehs.github.io/Anime-List/2017.10/anime2018.01.min.js"></script>
```
接下來就能開始使用了

## 範例
您可在首頁的 Console 中測試

```
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
    week: '星期(請參照星期格式)',
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
#### 星期格式 / Week
| Sun | Mon | Tue | Wed | Thu | Fri | Sat | none |
| --- | --- | --- | --- | --- | --- | --- | ---- |
|  日 |  一  |  二 |  三 |   四 |  五 |  六 | 尚未公開 |
#### 原作載體 / Carrier

| Comic | Novel | Game | Original |
| ----- | ----- | ---- | -------- |
|  漫畫  |  小說 | 遊戲  | 原創或其他 |
### 資料有誤?
依照格式修改後發 PR 回來即可
### 資料來源
- [【冬番】2018年1月冬番一覽（日本冬季新番列表）](http://justlaughtw.blogspot.com/2017/07/20181.html)
- [Wikipedia](https://zh.wikipedia.org)
- [百度百科](https://baike.baidu.com)
- [萌娘百科](https://zh.moegirl.org/)
- 動畫官網
