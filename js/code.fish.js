$(function (){

    cf.init();

});





var ball = {
    x:0,
    y:0,
    radius:10,
    ax:10,
    ay:10,
    vx:10,
    vy:10
};


var cf = {
    canvas:'',
    ctx:'',
    rate:24,
    
    ball : {
        x:0,
        y:0,
        radius:3,
        ax:10,
        ay:10,
        vx:10,
        vy:10
    },
    
    
    init : function(){
        canvas = document.getElementById('codeFish');
        if(!canvas || ! canvas.getContext) return false;
    
        ctx = canvas.getContext('2d');
        setTimeout(run, 1000 / rate);
    },


    run : function(){
        
        ctx.clear();

        ball.x += ball.vx;
        ball.y += ball.vy;
        
        if(ball.x + ball.radius > right)
        {
            ball.x = right - ball.radius;
            ball.vx *= -0.8;
        }
        else if(ball.x - ball.radius < left)
        {
            ball.x = left + ball.radius;
            ball.vx *= -0.8;
        }
        if(ball.y + ball.radius > bottom)
        {
            ball.y = bottom - ball.radius;
            ball.vy *= -0.8;
        }
        else if(ball.y - ball.radius < top)
        {
            ball.y = top + ball.radius;
            ball.vy *= -0.8;
        }
        
        ctx.drawcircle(ball.radius, ball.x, ball.y);



        
        
       
    }





}

