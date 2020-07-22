const express = require('express');
const app = express()
const port = 6969 || process.env.PORT
var fs = require('fs');
var twitter = require('twitter');
var secret = require('../config/secret.json');


var client = new twitter({
    consumer_key: secret.consumer_key,
    consumer_secret: secret.consumer_secret,
    bearer_token: secret.bearer_token,
});
app.get('/hashtag/:hashtag', (req, res) => {
    
    var hashtag = req.params.hashtag
    var hash = "#" + hashtag
    console.log(hash)
    client.get('search/tweets', { q: hash }, function (error, tweets, response) {

        var data = JSON.stringify(tweets, null, 2);
        fs.writeFileSync('tweets.json', data);
       
    });
    res.send("Data for "+hash+" is saved")
})

app.listen(port, () => console.log('Listening...'))