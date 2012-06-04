/**
 * User: hom
 * Daae: 12/03/20
 * Time: 12:43
 */
(function() {

    //使い捨て変数
    var R = RAKUGAKI.namespace('scene.main'),
        stage = '',
        stageWidth = 0,
        stageHeight = 0,
        eNum = 100,
        joints = [],
        ctx,
        counter = 0;

    var shape;
    var circleRadius=2;
    var spring = 0.1;
    var friction = 1.2;
    var gravity = .5;
    var canvas;
    var shapes = [];

    //もともとscene.mainがあった場合を考慮してmix
    RAKUGAKI.scene.main = {

        /**
         * @author hom
         */
        init:function(){

            //context取得
            canvas = document.getElementById('ponuCanvas_');
            if (! canvas || ! canvas.getContext) return false;
            stage = new Stage(canvas);
            stageWidth = canvas.width;
            stageHeight = canvas.height;

            var obj,
                i, m = eNum;
            for (i = 0; i < m; i++) {
                shape = new Shape();
                shape.graphics.beginFill(Graphics.getHSL(Math.random()*360, 100, 50)).drawCircle(0,0,circleRadius);
                shape.x = Math.random()*canvas.width;
                shape.y = Math.random()*canvas.height;
                shape.velX = Math.random()*10-5;
                shape.velY = Math.random()*10-5;
                stage.addChild(shape);
                shapes.push(shape);
                /*
                joints.push({
                    x: Math.random() * stageWidth,
                    y: Math.random() * stageHeight,
                    vx: 5 - 10 * Math.random(),
                    vy: 5 - 10 * Math.random(),
                    r: Math.random() * 10 + 5,
                    imgW: 60,
                    imgH: 65,
                    img: new Image(),
                    imgSrc: './img/enemy2.png'
                });
                */
            }

            /*
            canvas.addEventListener('touchstart', function(e) {
                var enemy = null,
                    clkX = e.touches[0].pageX,
                    clkY = e.touches[0].pageY,
                    xDist = 0,
                    yDist = 0;

                var i, m = eNum;
                for (i = 0; i < m; i++) {
                    enemy = joints[i];
                    if (!enemy) continue;

                    xDist = Math.abs(clkX - (enemy.x + enemy.imgW / 2));
                    yDist = Math.abs(clkY - (enemy.y + enemy.imgH / 2));

                    if (xDist < 30 && yDist < 30) {
                        delete joints[i];
                    }
                }

                e.preventDefault();
                return false;
            });
            */

            //loop
            //mainLoop();
            Ticker.addListener(RAKUGAKI.scene.main);
            Ticker.setFPS(50);
        },

        tick:function() {
            var w = canvas.width;
            var h = canvas.height;
            var l = shapes.length;//stage.getNumChildren()-1;

            /*
            var dx1 = shapes[0].x - shapes[1].x;
            var dy1 = shapes[0].y - shapes[1].y;
            var angle1 = Math.atan2(dy1,dx1);
            var angleReposition1 = angle1 + rePos;
            shapes[1].rotation = angle1 * 180 / Math.PI;
            */

            //this.springTo(shapes[0],no1.x,no1.y);
            //this.springTo(shapes[1],shapes[0].x,shapes[0].y);
            for (var i=1; i<l; i++) {

                if(i === 1){
                    var shape = stage.getChildAt(i);
                    shape.x = (shape.x+shape.velX+w)%w;
                    shape.y = (shape.y+shape.velY+h)%h;
                }else{
                    //graphics.linestyle(0,0x333333,1/(i*0.3));
                    var ballA = shapes[i-1];
                    var ballB = shapes[i];
                    var ballC = shapes[i+1];
                    //graphics.moveTo(ballA.x,ballA.y);
                    //graphics.lineTo(ballB.x,ballB.y);
                    this.springTo(ballB, ballA.x,ballA.y);

                    //ballBの角度を求める
                    var dx2 = ballA.x - ballB.x;
                    var dy2 = ballA.y - ballB.y;
                    var angle2 = Math.atan2(dy2,dx2);
                    ballB.rotation = angle2*180/Math.PI;

                    /*
                    var angleReposition2 = angle2 + Math.PI/2;
                    var hasiBcos = Math.cos(angleReposition2)*(shapesLength[i]);
                    var hasiBsin = Math.sin(angleReposition2)*(shapesLength[i]);

                    var B1 = ballB.x + hasiBcos;
                    var B2 = ballB.y + hasiBsin;

                    var B3 = ballB.x - hasiBcos;
                    var B4 = ballB.y - hasiBsin;
                    */

                }
            }
            //draw the updates to stage:
            stage.update();
        },


        /**
         * @author hom
         */
        mainLoop:function(){
            counter++;
            ctx.clearRect(0, 0, stageWidth, stageHeight);


            var i, m = joints.length,
                head = joints[0];

            //頭を移動
            head.x += head.vx;
            head.y += head.vy;
            checkOutOfStage(head);



            //座標点をばね運動させていく
            m = joints.length;
            for (i = 0; i < m; i++) {
                //springTo(joints[i]);
            }





            //enemyの座標店に円を描く
            m = joints.length;
            for (i = 0; i < m; i++) {
                jointDraw(joints[i]);
            }

            setTimeout(mainLoop, 50);
        },

        /**
         *
         * @author okazaki
         */
        jointDraw:function(joint) {
            ctx.beginPath();
            ctx.arc(
                joint.x,
                joint.y,
                joint.r,
                0,
                Math.PI * 2,
                true
            );
            ctx.stroke();

            //joint.img.src = enemy.imgSrc;
            //ctx.drawImage(enemy.img, enemy.x, enemy.y);
        },


        /**
         *
         * @param ele
         * @author hom
         */
        checkOutOfStage:function (ele) {

            var centerX = ele.x + ele.imgW / 2;
            var centerY = ele.y + ele.imgH / 2;

            if (centerX < 0) {
                ele.vx *= -1;
                ele.x = -ele.imgW / 2;
            }else;
            if (centerX > stageWidth) {
                ele.vx *= -1;
                ele.x = stageWidth - ele.imgW / 2;
            }else;
            if (centerY < 0) {
                ele.vy *= -1;
                ele.y = -ele.imgH / 2;
            }else;
            if (centerY > stageHeight) {
                ele.vy *= -1;
                ele.y = stageHeight - ele.imgH / 2;
            }
        },



        /**
         * ばね運動
         * @author okazki
         */
        springTo:function(me, youX, youY){
            me.x += ((youX - me.x) * spring) * friction;
            me.y += ((youY - me.y) * spring) * friction;
        }
    };



    console.log(RAKUGAKI.scene.main.init);

    $(RAKUGAKI.scene.main.init);


})();


