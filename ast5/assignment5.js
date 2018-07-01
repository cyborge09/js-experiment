/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//git try change

//document.addEventListener("keydown", function (event) {
//    if (event.key === "ArrowUp")
//    {
////       console.log("up");
//        ball2.dy = -1;
//    }
//    if (event.key === "ArrowDown")
//    {
//        console.log("down");
//        ball2.dy = 1;
//    }
//    if (event.key === "ArrowLeft")
//    {
////       console.log("left");
//        ball2.dx = -1;
//    }
//    if (event.key === "ArrowRight")
//    {
////       console.log("right");
//        ball2.dx = 1;
//    }
//});

var $container = document.getElementById("container");
var speed = 2;
var balls = createBalls(100);
//console.log(balls);
function createBalls(noOfBall)
{
    var balls = [];
    for (var i = 0; i < noOfBall; i++)
    {

        var ball = ballCreate(balls);

        balls.push(ball);
    }

    return balls;

}

function ballCreate(balls)
{

    var $movingBall = document.createElement("div");
    $movingBall.className = "ball";
    var ball = {
        x: parseInt(Math.random() * 900),
        y: parseInt(Math.random() * 700),
        dx: parseInt(((Math.random() * 1) < 0.5) ? '-1' : '1'),
        dy: parseInt(((Math.random() * 1) < 0.5) ? '-1' : '1'),
        color: 'red',
        $elem: $movingBall
    };
    $container.appendChild($movingBall);
    if (checkballsOverlap(ball, balls))
    {
        console.log("removed");
        console.log($movingBall);
        $container.removeChild($movingBall);
    }
    $movingBall.addEventListener("mousedown", function () {
        $container.removeChild($movingBall);
    });

    return ball;

}



updateBalls(balls);


setInterval(function ()
{

    checkballscollision(balls);
//    moveballs(balls);
    updateBalls(balls);
//    checkBoundaryCollisions(balls);


}, 10);

function checkballsOverlap(ball, balls)
{
    var point1 = ball;
    var count = 0;
//    console.log("here");
    for (var i = 0; i < balls.length; i++)
    {
          
            console.log(balls[i]);
        var point2 = balls[i];
//        console.log(Math.abs(maxX(point1) - minX(point2)));
//            console.log(Math.abs(maxY(point1) - minY(point2)));
        if (Math.abs(maxX(point1) - minX(point2)) < 30 && Math.abs(maxY(point1) - minY(point2)) < 30)
        {
            
            count++;
            
            if (count > 1)
            {
                console.log(count);
                return true;
            }
          

        }


    }



    function maxX(ball)
    {
        return(ball.x + 20);
    }
    function maxY(ball)
    {
        return(ball.y + 20);
    }
    function minX(ball)
    {
        return(ball.x);
    }
    function minY(ball)
    {
        return(ball.y);
    }

}


function checkballscollision(pointsCollection)
{
//    console.log(pointsCollection);
    for (var i = 0; i < pointsCollection.length - 1; i++)
    {


        var point1 = pointsCollection[i];

        for (var j = i + 1; j < pointsCollection.length; j++)
        {
            var point2 = pointsCollection[j];

            if (Math.abs(point1.x - point2.x) < 20.5 && Math.abs(point1.y - point2.y) < 20.5)
            {


                point1.dx = point1.dx * -1;

                point2.dx = point2.dx * -1;

                point1.dy = point1.dy * -1;

                point2.dy = point2.dy * -1;
            }
        }
    }
}
//
//function checkballscollision(balls)
//{
//
//    console.log(balls);
//
//    for (var i = 0; i < balls.length - 1; i++)
//    {
//        currentball = balls[i];
//        for (var j = i + 1; j < balls.length; j++)
//        {
//            currentball2 = balls[j];
//            if (Math.abs(currentball.x - currentball2.x) < 15 && Math.abs(currentball.y - currentball2.y) < 15)
//            {
//
////                currentball.dx = (((currentball.dx) === 1) ? '-1' : '1');
////                currentball.dy = (((currentball.dy) === 1) ? '-1' : '1');
////                balls[j].dx = (((balls[j].dx) === 1) ? '-1' : '1');
////                balls[j].dy = (((balls[j].dy) === 1) ? '-1' : '1');
//                currentball.dx = currentball.dx * -1;
//                currentball.dx = currentball.dx * -1;
//                currentball2.dx = currentball2.dx * -1;
//                currentball2.dy = currentball2.dy * -1;
//            }
//        }
//    }
//}
//;



function moveballs(balls)
{
    balls.forEach(function (ball)
    {
        moveball(ball);
    });
}
function moveball(ball)
{
    ball.x = ball.x + ball.dx * speed;
    ball.y = ball.y + ball.dy * speed;
}

function updateBalls(balls) {
//    console.log(balls);
    balls.forEach(function (ball)
    {
        updateBall(ball);
    });

}

function updateBall(ball)
{
//    console.log(ball);
    ball.$elem.style.top = ball.y + "px";
    ball.$elem.style.left = ball.x + "px";
}

function checkBoundaryCollisions(balls)
{

    balls.forEach(function (ball)
    {
        checkBoundaryCollision(ball);
    });


}

function checkBoundaryCollision(ball)
{
    var ballleft = ball.x;
    var balltop = ball.y;
    var ballright = ball.x + 20;
    var ballbottom = ball.y + 20;
    if (ballbottom > 795)
    {
        ball.dy = -1;
    }
    if (ballright > 995)
    {
        ball.dx = -1;
    }
    if (balltop < 5)
    {
        ball.dy = 1;
    }
    if (ballleft < 5)
    {
        ball.dx = 1;
    }

}

