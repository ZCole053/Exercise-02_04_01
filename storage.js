//Author: Zedekiah Cole

//Summary: creating a backend database and instering it into the database

//file name: storage.js
//Date made: Febuary 14 2019
//LTE: Febuary 22 2019


//creating variables and requiring in
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017';
var dbName = 'twitter_notes';
var database;


//scope is what is diffrent than export.module
//restricted
module.exports = {
    connect: function(){
        MongoClient.connect(url, function(err, client){
            //traping
            if(err){
                return console.log("Error: " + err);//gets out with an err
            }
            database = client.db(dbName);
            console.log("Connected to database: " + dbName);
        });
    },
    connected: function(){
        // typeof tells you the data type of an object
        return typeof database != 'undefined';
    }, 
    //base to an api call
    //inserts friends but lines up for an api post
    insertFriends: function(friends){
        //targets collection aka WHERE 'FRIENDS' it creates another collection object
        //can insert things to itself.
        database.collection('friends').insert(friends,
        //callback checking for errors
        function(err){
            if(err){
                console.log("Cannot insert friends into database.");
            }
        });
    },
    //wants twitter ID and will get friends with this ID
                            //placeholder defines function elsewhere
    getFriends: function(userId, callback){
        //creating variable to target collections
                                //similar to mysql select
        var cursor = database.collection('friends').find(
            {
                //json filter
                for_user: userId
            });
        //converts json to an array
        cursor.toArray(callback);
    },
    //deletes all data but not in twitter in database
    //it is being used as a cash
    //no peramaters needed
    deleteFriends: function(){
        //feed json to filter what we want to remove
        //empty means it dumps everythings
        database.collection('friends').remove(({}), function(err){
            if(err){
                console.log("Cannot remove friends from database.");
            }
        });
    },
    getNotes: function(ownerid, friendid, callback){
        //targeting notes collection
        //database is a mongodb engine
        var cursor = database.collection('notes').find({
            owner_id: ownerid,
            friend_id: friendid
        });
        //converts result set to an array
        cursor.toArray(function(err, notes){
            if(err){
                //trapping in callback
                return callback(err);
            }
            //null cuz no err
            //get node and map
            //will loop through array feed function that names loop variable what we want
            callback(null, notes.map(function(note){
                return{
                    _id: note._id,
                    content: note.content
                }
            }));
        });
    }
}
