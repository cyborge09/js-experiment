/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function reset()
{
    
    var $mainContainer = document.getElementById("mainContainer");
    var $hero = new Hero();
    $hero.initializeCar();

    var animation = new Animation(
            {
                delay: 15,
                backgroundframe:
                        {
                            speed: 1,
                            $maincontainer: $mainContainer
                        },
                hero: $hero
            });

    animation.start();

    document.addEventListener('keydown', function (e)
    {

        if (e.key === "Escape")
        {

            animation.pause();

        }

        if (e.key === "R" || e.key === "r") {

            animation.resume();

        }
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
    reset();