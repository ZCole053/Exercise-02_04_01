//Author: Zedekiah Cole

//Summary: Constructing front end
// implements ajax calls to handles clicks on friends interface
//

//file name: main.js
//Date made: Febuary 21 2019
//LTE: Febuary 21 2019


//expression has to evaluate as a function
// will evaluate as a function andthe call itself
//IIFE
(function(){
    //tracks which friend notes are for
    var selectedUserId;
    //cache for nodes
    var cache = {};
    //alert("I am saying hello, I am an IIFE.");//debug

    function startup(){
       //alert("I am in startup");//debug

       //get an array of list items with friends name
       var friends = document.getElementsByClassName('friend');
       for(var i = 0; i < friends.length; i++){
        //adds event listner for a click event
        friends[i].addEventListener('click', function(){
            //this refers to current object which is the friends[i]
            for(var j = 0; j < friends.length; j++){
                friends[j].className = 'friend';
            }
            this.className += ' active';
            selectedUserId = this.getAttribute('uid');
            console.log("twitter id: ",selectedUserId);
        });
       }
    }

    //creating an eventhandler
    //fires at a specific time and when the dom is completed
    //it will call start up
    //only for chrome
    document.addEventListener('DOMContentLoaded', startup, false);
})();//calls itself with the second parenthesis