var express = require('express')
var cheerio = require('cheerio')
var superagent = require('superagent')

var app = express()

app.get('/',function(req, res, next) {
    superagent.get('https://github.com/xypisces/Front-end-blog/issues')
    .end(function(err,sres) {
        if(err) {
            return next(err)
        }
        var $ = cheerio.load(sres.text)
        var items = [];
        $('.lh-condensed').each(function(idx,element) {
            var $element = $(element)
            items.push({
                title: $element.children('.js-navigation-open').text().replace(/[\r\n]/g,""),
                label: $element.children('.labels').text().replace(/[\r\n]/g,""),
                time: $element.children('.text-small').text().replace(/[\r\n]/g,""),
            })
        })
        res.send(items)
    })
})

app.listen(3000, function() {
    console.log('app is running 3000!')
})