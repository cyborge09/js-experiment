/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function Hero()
{
    var self = this;
    self.$hero = document.getElementById("herocar");
    self.carY = self.$hero.clientTop||500;
    self.carX = self.$hero.clientLeft||150;

    self.update = function (direction)
    {
        if (direction === 1 && self.carX < 260)
        {
            self.carX += 110;
            self.initializeCar();

        } else if (direction === -1 && self.carX > 140)
        {
            self.carX += -110;
            self.initializeCar();
        }
    };

    self.initializeCar = function ()
    {
        self.$hero.style.top = self.carY + 'px';
        self.$hero.style.left = self.carX + 'px';
    };
}