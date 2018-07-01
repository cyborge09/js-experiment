/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function Animation(props)
{
    
    var self = this;
    var hero = props.hero;
    var isRunning = false;
    var delay = props.delay || 15;
    var backgroundframe = null;


    self.init = function ()
    {
        backgroundframe = new BackgroundFrame(
                {
                    backgroundframe :props.backgroundframe,
                    hero : hero
                });
    };


    self.start = function ()
    {

        if (!isRunning)
        {
            isRunning = true;

            self.intervalRef = setInterval(
                    function () {

                        backgroundframe.updateBackground();
                        backgroundframe.createEnemies();
                        backgroundframe.updateEnemies();
                        backgroundframe.heroEnemiesCollison();
                        backgroundframe.scoreboard();

                    }, delay);
        }
    };


    self.pause = function ()
    {
        if (isRunning)
        {
            clearInterval(self.intervalRef);
            isRunning = false;
        }
    };
    self.resume = function ()
    {
        self.start();
    };

    self.init();
}