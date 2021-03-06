const express = require('express');
const app = express()
const secret = require('./config/secret.json');
const router  = express.Router()
const port =  process.env.PORT || 8086
var twitter = require('twitter');
var Sentiment = require('sentiment');
var bodyParser = require('body-parser');

app.use('/',router);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

var client = new twitter({
    consumer_key: secret.consumer_key || process.env.CONSUMER_KEY,
    consumer_secret: secret.consumer_secret || process.env.CONSUMER_SECRET,
    bearer_token: secret.bearer_token || process.env.BEARER_TOKEN,
});

var sentiment = new Sentiment()


router.get('/', (req, res) => {
    res.render('index');
})



router.get( '/hashtag', (req, res) => {

    var hashtag = req.query.tag
    var hash = "#" + hashtag
    console.log(hash)
    client.get('search/tweets', { q: hash }, async function (error, tweets, response) {
        cluster = []
        var data = tweets.statuses
        if (data) {



            Array.from(data).forEach(tweet => {
                let id = tweet.id_str
                let score = (sentiment.analyze(tweet.text)).score;
                if (score > 0) {
                    score = "positive"
                }
                else if (score < 0) {
                    score = "negative"
                }
                else {
                    score = "neutral"
                }

                let sentiments = score

                var obj = {
                    "id": id,
                    "score": sentiments
                }
                cluster.push(obj)


            })

            res.render('tweets', { response: cluster })
        }
        else {
            res.render('index')
        }
    });

})


app.listen(port, () => console.log('Listening...'))