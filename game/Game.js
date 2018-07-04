/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function playgame1()
{

    $homescreen = document.getElementById("homescreen");
    $homescreen.style.display = "block";
    var $start = document.getElementById("start");
    $start.onclick = function ()
    {
        console.log("here");
        resetGame();
    };
}

function resetGame()
{
    $homescreen.style.display = "none";
    var $mainContainer = document.getElementById("mainContainer");
    var $gameContainer = document.getElementById("gameContainer");

    var $hero = new Hero();
    $hero.initializeCar();


    var animation = new Animation(
            {
                delay: 15,
                backgroundframe:
                        {
                            gamecontainer: $gameContainer

                        },
                hero: $hero
            });

    animation.start();

    document.addEventListener('keydown', function (e)
    {


        if (e.key === "ArrowRight")
        {
            console.log("right");
            $hero.update(1);

        }
        if (e.key === "ArrowLeft")
        {
            console.log("left");
            $hero.update(-1);

        }



    });
}

 playgame1();
