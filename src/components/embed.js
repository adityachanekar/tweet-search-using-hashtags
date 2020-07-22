const twitter = require('twitter')
const fs = require('fs')



var data = JSON.parse(fs.readFileSync('./tweets.json', 'utf-8'))
var id  = []
var Data = data.statuses;

Array.from(Data).forEach(tweet =>{
    id.push(tweet.id_str);
});
 
Array.from(id).forEach(id =>{
    

});