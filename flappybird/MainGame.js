/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

'use strict';
let $parentGame = document.getElementById("game");
class MainGame
{
    constructor(props)
    {
        this.$parent = props;
        
    }

    resetGame()
    {
        $parentGame.style.display = "inherit";
        let $basescreen = document.createElement("div");
        let $background = document.createElement("div");
        let $scoreboard = document.createElement("div");
        let $resettext = document.createElement("div");
        let animation = false;
        let animateId;
        let pipestop = [];
        let pipesdown = [];
        let pipetop;
        let pipedown;
        let createcounttop = 0;
        let createcountdown = 0;
        let CREATE_GAP = 150;
        let pipetoppos;
        let score = 0;


        let gamepanel = new GamePanel(
                {
                    width: 500,
                    height: 620,
                    basescreendiv: $basescreen,
                    backgrounddiv: $background,
                    scoreboard: $scoreboard,
                    idbase: "homescreen",
                    classnamebase: "homescreen",
                    classnamescoreboard: "scoreboard",
                    idbackground: "homescreenbackground",
                    classbackground: "homescreenbackground",
                    backbackground: "url(images/background-day.png)",
                    basebackground: "url(images/base.png)",
                    parent: $parentGame
                });

        let bird = new Bird(
                {
                    width: 50,
                    height: 50,
                    parent: $background,
                    classname: "bird",
                    birdtop: 250,
                    birdleft: 200
                });


        function animateBg()
        {
            document.addEventListener('keydown', function (e)
            {
                if (e.keyCode === 32)
                {
                    if (animation === false)
                    {
                        animateId = setInterval(function ()
                        {
                            animation = true;
                            $scoreboard.innerHTML = score;
                            gamepanel.scrollBg();
                            birdborderCollision();
                            bird.renderbird();
                            pipetoppos = createPipetop();
                            createPipedown(pipetoppos);
                            birdPipecollide();
                            updatePipe();
                            deletePipes();
                        }, 15);
                    }

                }
            });

        }

        function createPipedown(pipetoppos)
        {
            if (createcountdown === 0)
            {
                pipedown = new Pipe(
                        {
                            width: 52,
                            height: 400,
                            parent: $background,
                            classname: "pipe"
                        });
                pipesdown.push(pipedown);
                pipedown.createPipedown(pipetoppos);
                createcountdown = CREATE_GAP;
            }
            createcountdown--;
        }


        function createPipetop()
        {
            if (createcounttop === 0)
            {
                pipetop = new Pipe(
                        {
                            width: 52,
                            height: 620,
                            parent: $background,
                            classname: "pipe"
                        });
                pipestop.push(pipetop);
                pipetoppos = pipetop.createPipetop();
                createcounttop = CREATE_GAP;
            }
            createcounttop--;
            return pipetoppos;
        }


        function deletePipes()
        {
            if (pipestop[0] !== undefined)
            {
                if ((pipestop[0].xaxis + pipestop[0].width) < 0)
                {

                    pipestop.shift();
                    pipesdown.shift();
               
                }

            }
        }


        function updatePipe()
        {
            pipesdown.forEach(function (pipedown) {
                pipedown.updatePipe();
            });
            pipestop.forEach(function (pipetop) {
                pipetop.updatePipe();
            });
        }

        function birdborderCollision()
        {
            if (bird.birdtop > 465 || bird.birdtop < 0)
            {
                let score = 0;
                clearInterval(animateId);
                reset();
            }
        }
        function birdPipecollide()
        {
            for (let i = 0; i < pipestop.length; i++)
            {
                if ((bird.birdleft + bird.width > pipestop[i].xaxis) && (bird.birdleft < pipestop[i].xaxis + pipestop[i].width))
                {
                    if ((bird.birdtop < pipestop[i].pipetop_top + 610) || (bird.birdtop + bird.height > pipesdown[i].pipedown_top + 10))
                    {
                        clearInterval(animateId);
                        reset();
//                    alert("collide");
                    } else
                    {
                        if (bird.birdleft > (pipestop[i].xaxis + pipestop[i].width - 3))
                        {
                            score++;
                        }
                    }
                }
            }
        }


        let reset = function ()
        {
            $resettext.style.display = "block";
            $resettext.className = "reset";
            $resettext.style.top = "175px";
            $resettext.style.left = "150px";
            $resettext.style.fontSize = "25px";
            $resettext.innerHTML = "Press SPACE to restart";
            $background.appendChild($resettext);

            $scoreboard.style.top = "200px";
            $scoreboard.style.left = "230px";
            $scoreboard.style.fontSize = "100px";
            document.addEventListener('keydown', function (e)
            {
                if (e.keyCode === 32)
                {
                    pipestop.forEach(function (pipe) {
                        $background.removeChild(pipe.$pipetop);

                    });

                    pipesdown.forEach(function (pipe) {
                        $background.removeChild(pipe.$pipebottom);
                    });

                    pipestop = [];
                    pipesdown = [];
                    score = 0;

                    $background.removeChild(bird.$bird);
                    $background.removeChild($basescreen);
                    $parentGame.removeChild($background);
                    $parentGame.style.display = "none";
                    maingame1.resetGame();
                
                }
            });


        };

        document.addEventListener('keydown', function (e)
        {
            if (e.keyCode === 32)
            {
                bird.renderbirdUp();
            }
        });


        gamepanel.init();
        bird.init();
        animateBg();

    }

}

let maingame1 = new MainGame($parentGame);


maingame1.resetGame();





