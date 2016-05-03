var express = require('express');
var app = express();
var cors = require('cors');
var mysql = require('mysql');
var querys = require('./includes/query');
var bodyParser = require('body-parser');


app.set('port', (process.env.PORT || process.argv[2] || 9032));
app.set('json spaces', 2); // output json with 2 spaces

app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    extended: false
}));

//for allowing the API access from every origin
app.use(cors({
    origin: '*'
}));


console.log("Connecting to Database...");
connection = mysql.createPool('mysql://ba232d7ca94965:846f4c41@us-cdbr-iron-east-03.cleardb.net/heroku_07a572bedc0aa60');




//Creates New User
app.post('/create/', function (req, res) {

    user_params = {
        name: req.body.user_name,
        dest: req.body.user_dest,
        source: req.body.user_source
    }

    var qry = strparser(querys.new_user, user_params);


    connection.query(qry, function (err, rows, fields) {

        if (err) {
            console.error(err);
            console.log(qry);
            //here we are still sending status code as 200 , Check #APS01
            res.json({
                errorCode: 501,
                errorMsg: "Database Error"
            });
            return;
        }
        console.log("Created");

        res.json({
            errorCode: 0,
            userId: rows.insertId
        });

    });


});



//Update User Channel
app.post('/channel/', function (req, res) {

    console.log('connected');
    
    var user_params = {
        channel: req.body.channel,
        user_id: req.body.user_id
    }

    var qry = strparser(querys.update_channel, user_params);


    connection.query(qry, function (err, rows, fields) {

        if (err) {
            console.error(err);
            console.log(qry);
            //here we are still sending status code as 200 , Check #APS01
            res.json({
                errorCode: 501,
                errorMsg: "Database Error"
            });
            return;
        }
        console.log("Created");

        res.json({
            errorCode: 0,
            status: 1,
            message: "Updated Channel"

        });

    });


});


app.get('/getairport/:search', function (req, res) {


    var searchQry = req.params.search;
    var qry = strparser(querys.search_aiport, {
        qry: searchQry
    });

    connection.query(qry, function (err, rows, fields) {

        if (err) {
            console.error(err);
            console.log(qry);
            //here we are still sending status code as 200 , Check #APS01
            res.json({
                errorCode: 501,
                errorMsg: "Database Error"
            });
            return;
        }
        
        res.json(rows);


    });


});



app.post('/ping', function (req,res) {
    
    if(req.body.id) {
        req.body.id = parseInt((req.body.id.toString()).replace('#',''));
        var qry = strparser(query.fetch_channel,req.body);
        
        connection.query(qry, function (err,rows,fields){
            
            if(err){
                
                res.json({error:1});
                
            }
            
            console.log(rows[0].user_channel);
            
            
        });
        
        
    }
    
    
    
});



app.get('/getairport/', function (req, res) {


    var searchQry = '';
    var qry = strparser(querys.search_aiport, {
        qry: searchQry
    });

    connection.query(qry, function (err, rows, fields) {

        if (err) {
            console.error(err);
            console.log(qry);
            //here we are still sending status code as 200 , Check #APS01
            res.json({
                errorCode: 501,
                errorMsg: "Database Error"
            });
            return;
        }
        
        res.json(rows);


    });


});


strparser = function (str, obj) {

    for (key in obj) {

        str = str.replace(new RegExp('%' + key + '%', 'g'), obj[key]);


    }

    return str;
}

app.listen(app.get('port'));
console.log('Running on Port:', app.get('port'));