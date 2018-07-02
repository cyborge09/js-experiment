/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function Bullet(props)
{
    var self = this;
    self.hero = props.hero;
    self.gamecontainer = props.gamecontainer;
  
    
    var $bullet = document.createElement("div");

    self.createbullet = function ()
    {
        
        console.log("bulletinside");
        $bullet.className = "bullets";
        console.log($bullet);
        self.bulletX = self.hero.carX + 46;
        self.bulletY = self.hero.carY;
        $bullet.style.left = self.bulletX + "px";
        $bullet.style.top = self.bulletY-10 + "px";
        self.gamecontainer.appendChild($bullet);
    };
    
    self.updateBullet = function (speed) {
        var pos = self.bulletY - speed;
        self.bulletY = pos;
        $bullet.style.top = self.bulletY + "px";
    };
    
    self.deleteBullet = function()
    {
        self.gamecontainer.removeChild($bullet);
    };
}