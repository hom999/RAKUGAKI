/**
 * User: hom
 * Daae: 12/03/20
 * Time: 12:43
 */
$(function(){
    RAKUGAKI.init();
});


var RAKUGAKI = RAKUGAKI.namespace('RAKUGAKI');
var RAKUGAKI ={

    enemies : [],

    /**
     *
     */
    init : function(){


        var i,m=10;

        for(i=0;i<m;i++){

            this.enemies.push(new Enemy());


        }


        setTimeout('mainLoop', 30);
    },


    /**
     *
     */
    mainLoop : function(){

        //






        setTimeout('mainLoop', 30)
    }


};



