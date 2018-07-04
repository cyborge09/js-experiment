/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function Enemy(props)
{
//    console.log("inside");
    var self = this;
    var $parent = props.$el;
    self.x = 0;
    self.y = -100;
    self.dy = 0;
    self.health = 3;
    self.elem = document.createElement('div');

    self.createEnemy = function () {

        self.elem.className = "enemy-car";
        self.x = randomX();
        self.elem.style.left = self.x + "px";
        self.elem.style.top = self.y + "px";
        $parent.appendChild(self.elem);
    };

    self.updateEnemy = function (speed) {
        self.dy = speed;
        self.y = self.y + self.dy;
        self.elem.style.top = self.y + "px";
    };


    self.deleteEnemy = function () {
        self.elem.style.backgroundImage = "url(images/giphy.gif)";
        var timeid = window.setTimeout(bgAnime,300);
        
    };

    var bgAnime = function(){
//        alert("destroyed")
        $parent.removeChild(self.elem);
    };

    function randomX()
    {
        var random = Math.random();
        if (random >= 0 && random < 0.33)
        {
            return 40;
        } else if (random >= 0.33 && random < 0.66)
        {
            return (150);
        } else
        {
            return (260);
        }
    }

}