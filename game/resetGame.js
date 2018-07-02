/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function resetGame()
{
    var enemies = enemy_cars;
    for (var i = 0; i < enemies.length; i++)
    {
        enemies[i].deleteEnemy();
        enemies[i] = null;
    }
    enemy_cars = clearArray(enemies);

    var bullets_temp = bullets;
    for (var i = 0; i < bullets_temp.length; i++)
    {
        bullets_temp[i].deleteBullet();
        bullets_temp[i] = null;
    }
    bullets = clearArray(bullets_temp);

    gamestatus = "true";
    Frame.background_y = 0;
    counter = 0;
    bullet_counter = 0;
    speedcounter = 0;
    invulcounter = 0;
    speed_dy = 1;
    score = 0;

    var gameover_background = document.getElementById("gameover-background");
    gameover_background.style.display = "none";
}