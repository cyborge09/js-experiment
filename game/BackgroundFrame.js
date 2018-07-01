/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function BackgroundFrame(props)
{
    console.log(props);
    var self = this;
    var speed = props.speed || 5;
    var y = 0;
    var enemy;
    var score = 0;
    var speedratio = 0;
    var hero = props.hero;
    var $hero = props.$hero;
    var enemies = [];
    self.count = 0;
    console.log("here");
    var $scoreboard = document.getElementById("score");
    var $gameContainer = document.getElementById("gameContainer");


    self.updateBackground = function () {
        $gameContainer.style.backgroundPosition = "0px " + y + "px";
        y = y + speed;
        speedratio++;
        if(speedratio > 500)
        {
            speed = speed + 2;
            speedratio =0;
        }
        console.log(speed);
    };


    self.createEnemies = function ()
    {

        self.count++;
        if (self.count > (80 - (speed * 3)))
        {

            enemy = new Enemy({$el: $gameContainer});
            enemies.push(enemy);
            enemy.createEnemy();
            self.count = 0;
        }

    };

    self.updateEnemies = function ()
    {
        for (var i = 0; i < enemies.length; i++)
        {

            enemies[i].updateEnemy(speed);
            if (enemies[i].y > 600)
            {
                enemies[i].deleteEnemy();
                enemies[i] = null;
                enemies = self.clearArray(enemies);
            }

        }
    };

    self.clearArray = function (enemies)
    {
        var temp = [];
        for (var i = 0; i < enemies.length; i++)
        {
            if (enemies[i] !== null)
            {
                temp.push(enemies[i]);
            }
        }

        return temp;
    };

    self.heroEnemiesCollison = function ()
    {
        enemies.forEach(function (oneenemy)
        {
            if ((Math.abs(oneenemy.x - hero.carX)) < 100 && (Math.abs(oneenemy.y - hero.carY) < 100))
            {
                alert("GAME OVER");
                enemies.forEach(function (enemy)
                {
                    enemy.deleteEnemy(enemy);
                });
                enemies = [];
                speed = props.speed;
                score = 0;
                reset();
            }
        });
    };

    self.scoreboard = function ()
    {
            score = score +1;
           $scoreboard.innerHTML = score;
    };

}
