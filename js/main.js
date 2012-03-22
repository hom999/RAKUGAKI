/**
 * User: hom
 * Daae: 12/03/20
 * Time: 12:43
 */
(function(){
    $(init);

    var R = RAKUGAKI.namespace('RAKUGAKI'),
        stageWidth = 0,
        stageHeight = 0,
        eNum = 1000,
        enemies = [],
        ctx,
        counter = 0;

    /**
     * @author hom
     */
    function init(){

        //context取得
        var canvas = document.getElementById('ponuCanvas_');
        if ( ! canvas || ! canvas.getContext ) return false;
        ctx = canvas.getContext('2d');
        stageWidth = canvas.width;
        stageHeight = canvas.height;



        var obj,
            i, m = eNum;
        for(i = 0; i < m ; i++){
            enemies.push({
                x: Math.random()*stageWidth,
                y: Math.random()*stageHeight,
                vx:5 - 10*Math.random(),
                vy:5 - 10*Math.random(),
                r : Math.random()*10+5,
                imgW : 60,
                imgH : 65,
                img:new Image(),
                imgSrc:'./img/enemy2.png'
            });
        }

        canvas.addEventListener('touchstart', function(e){
            var enemy = null,
                clkX = e.touches[0].pageX,
                clkY = e.touches[0].pageY,
                xDist = 0,
                yDist = 0;

            var i,m = eNum;
            for(i=0;i<m;i++){
                enemy = enemies[i];
                if(!enemy) continue;

                xDist = Math.abs(clkX - (enemy.x + enemy.imgW/2));
                yDist = Math.abs(clkY - (enemy.y + enemy.imgH/2));

                if(xDist < 30 && yDist < 30){
                    delete enemies[i];
                }
            }

            e.preventDefault();
            return false;
        });
        mainLoop();
    };

    /**
     * @author hom
     */
    function mainLoop(){
        counter ++ ;
        ctx.clearRect(0, 0, stageWidth, stageHeight);
        enemiesDraw();
        setTimeout(mainLoop, 50);
    };


    /**
     *
     * @author hom
     */
    function enemiesDraw(){
        var enemy,
            i,m = enemies.length;
        for(i=0;i<m;i++){
            enemy = enemies[i];
            if(!enemies[i]) continue;


            ctx.beginPath();
            ctx.arc(
                enemy.x,
                enemy.y,
                enemy.r,
                0,
                Math.PI*2,
                true
            );
            ctx.stroke();


            //enemy.img.src = enemy.imgSrc;
            //ctx.drawImage(enemy.img, enemy.x, enemy.y);

            enemy.x += enemy.vx;
            enemy.y += enemy.vy;
            checkOutOfStage(enemy);
        }
    }

    /**
     *
     * @param ele
     * @author hom
     */
    function checkOutOfStage(ele){

        var centerX = ele.x + ele.imgW/2;
        var centerY = ele.y + ele.imgH/2;

        if( centerX < 0){
            ele.vx *= -1;
            ele.x = -ele.imgW/2;
        }else
        if( centerX > stageWidth){
            ele.vx *= -1;
            ele.x = stageWidth - ele.imgW/2;
        }else
        if( centerY < 0){
            ele.vy *= -1;
            ele.y = -ele.imgH/2;
        }else
        if( centerY > stageHeight){
            ele.vy *= -1;
            ele.y = stageHeight - ele.imgH/2;
        }
    }

})();


