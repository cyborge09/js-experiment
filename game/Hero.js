/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function Hero()
{
    var self = this;
    self.$hero = document.getElementById("herocar");
    self.carY = 0;
    self.carX = 0;

    self.update = function (direction)
    {
        if (direction === 1 && self.carX < 260)
        {
            self.carX += 110;


        } else if (direction === -1 && self.carX > 140)
        {
            self.carX += -110;

        }

        self.$hero.style.left = self.carX + 'px';
    };

    self.initializeCar = function ()
    {
        self.carY = 500;
        self.carX = 150;
        self.$hero.style.top = self.carY + 'px';
        self.$hero.style.left = self.carX + 'px';
    };
}