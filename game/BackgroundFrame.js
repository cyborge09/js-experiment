/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function BackgroundFrame(props)
{

    var self = this;
    var speed = props.speed || 5;
    var y = 0;
    self.bullets = 0;
    var enemy;
    self.score = 0;
    var speedratio = 0;
    var hero = props.hero;
    var $hero = props.$hero;
    var enemies = [];
    self.count = 0;

    var $scoreboard = document.getElementById("score");
    var $gameContainer = props.backgroundframe.gamecontainer;


    self.updateBackground = function () {
        $gameContainer.style.backgroundPosition = "0px " + y + "px";
        y = y + speed;
        speedratio++;
        if (speedratio > 500)
        {
            speed = speed + 2;
            speedratio = 0;
        }

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

            }

        }
        enemies = self.clearArray(enemies);
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
//                
//                enemies = [];
//                speed = undefined;
//                delete score;
//                self.reset();
                location.reload();
            }
        });
    };


    self.reset = function ()
    {
        var temp_enemys = enemies;
        for (var i = 0; i < temp_enemys.length; i++)
        {
            temp_enemys[i].deleteEnemy();
            temp_enemys[i] = null;
        }
        enemies = self.clearArray(temp_enemys);
        console.log(enemies);

        var temp_bullets = self.bullets;
        for (var y = 0; y < temp_bullets.length; y++)
        {
            if (temp_bullets[y] !== null)
            {
                temp_bullets[y].deleteBullet();
                temp_bullets[y] = null;
            }

        }
        self.bullets = self.clearBulletArray(temp_bullets);
        console.log(self.bullets);
        y=0;
        speed = 0;
        resetGame();
    };

    self.bulletEnemiesCollision = function (oneenemy, bullet)
    {

        if (bullet !== null)
        {
            if ((Math.abs(oneenemy.y - bullet.bulletY)) < 100 && ((oneenemy.x < bullet.bulletX) && (oneenemy.x + 100 > bullet.bulletX)))
            {

                return true;

            }
        }


    };

    self.scoreboard = function ()
    {
        $scoreboard.innerHTML = self.score;
    };

    self.updateBullets = function (bullets)
    {
        self.bullets = bullets;
        for (var i = 0; i < bullets.length; i++)
        {
            if (bullets[i] !== null)
            {
                bullets[i].updateBullet(10);

                enemies.forEach(function (enemy)
                {

                    if (self.bulletEnemiesCollision(enemy, bullets[i]))
                    {

                        enemy.health -= 1;
                        if (enemy.health === 0)
                        {
                            self.score = self.score + 1;
                            enemy.deleteEnemy();
                            enemies.splice(enemies.indexOf(enemy), 1);

                        }
                        bullets[i].deleteBullet();
                        bullets[i] = null;

                    }
                });

                if (bullets[i] !== null)
                {
                    if (bullets[i].bulletY < 0)
                    {

                        bullets[i].deleteBullet();
                        bullets[i] = null;
                    }
                }



            }

        }

        bullets = self.clearBulletArray(bullets);
    };

    self.clearBulletArray = function (bullets)
    {

        var temp = [];
        for (var i = 0; i < bullets.length; i++)
        {
            if (bullets[i] !== null)
            {

                temp.push(bullets[i]);
            }
        }

        return temp;
    };

}
