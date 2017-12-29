var express = require('express')
var cheerio = require('cheerio')
var superagent = require('superagent')

var app = express()

app.get('/',function(req, res, next) {
    superagent.get('https://github.com/xypisces/Front-end-blog/issues/1')
    .end(function(err,sres) {
        if(err) {
            return next(err)
        }
        var $ = cheerio.load(sres.text)
        var item = {}
        item.title = $('.js-issue-title').text()
        item.content = $('.write-content textarea').text()
        item.descript = $('meta[property="og:description"]').attr('content')
        item.labels = []
        $('.labels a').each(function(items,ele){
            item.labels.push($(ele).text())
        })
        item.time = $('.TableObject-item--primary').text()
        res.send(item)
    })
})

app.listen(3000, function() {
    console.log('app is running 3000!')
})