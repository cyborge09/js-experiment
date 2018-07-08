/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


class Candy
{
    constructor()
    {
        this.canvas = document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = 1000;
        this.canvas.height = 600;
        this.levelCreated = false;
        this.clusterFound = false;
        this.drag = false;
        this.animateloop;
        this.count = 0;
        this.animatetime = 0;
        this.ANIMATION_DELAY = 0.2;
        this.clusterLength = 1;
        this.lastpframe = 0;
        this.timeframe;
        this.GAME_TIME = 20;
        this.showtime = this.GAME_TIME;
        this.timegone = 0;
        this.score = 0;
        this.fpstime = 0;
        this.step = 3;
        this.framecount = 0;
        this.fps = 0;
        this.moves = [];
        this.stage = {
            x: 500,
            y: 100,
            tilewidth: 40,
            tileheight: 40,
            columns: 6,
            rows: 6,
            tiles: [],
            tileselect: {selected: false, column: 0, row: 0}
        };
        this.currentmove = {col1: 0, row1: 0, col2: 0, row2: 0};
        this.buttons = [
            {x: 30, y: 240, width: 150, height: 50, text: "New Game"}
        ];

        this.animationLoop = this.animationLoop.bind(this);
        // All of the different tile colors in RGB
        this.tilecolors = [
            [255, 128, 128],
            [128, 255, 128],
            [128, 128, 255],
            [255, 255, 128],
            [255, 128, 255],
            [128, 255, 255],
            [255, 255, 255]];

        this.clusters = [];
//        this.animationstate = 0;
        this.animationstates = {searchcluster: 0, shifttiles: 1, swipetiles: 2, reverseswap: 3};
        this.animationstate = this.animationstates.searchcluster;
        this.gamestates = {init: 0, ready: 1, process: 2};
        this.gamestate = this.gamestates.init;
        this.gameover = false;
        this.getMousePos = this.getMousePos.bind(this);
        this.getMouseTile = this.getMouseTile.bind(this);
        this.mouseUp = this.mouseUp.bind(this);
        this.mouseDown = this.mouseDown.bind(this);
        this.mouseOut = this.mouseOut.bind(this);
        this.mouseMove = this.mouseMove.bind(this);
        this.active = true;
        this.canvas.addEventListener("mousedown", this.mouseDown);
        this.canvas.addEventListener("mouseup", this.mouseUp);
        this.canvas.addEventListener("mouseout", this.mouseOut);
        this.canvas.addEventListener("mousemove", this.mouseMove);
        this.lastframe = 0;

    }

    init()
    {

        for (var i = 0; i < this.stage.rows; i++) {
            this.stage.tiles[i] = [];
            for (var j = 0; j < this.stage.columns; j++) {
                this.stage.tiles[i][j] = {type: 0, shif: 0};
            }
        }

        this.startGame();
        this.animationLoop(0);

    }

    startGame()
    {

        this.gamestate = this.gamestates.ready;
        this.stepleft = this.step;
        this.active = true;
        this.score = 0;
        this.reset =0;
        this.timeframe = 0;
        this.lastframe = 0;
        this.timegone = 0;
        this.showtime = this.GAME_TIME;
        this.gameover = false;
        this.createLevel();
        this.findmoves();
        this.destroyClusters();
        this.lastframe = performance.now();//performance.now gives the single time elpased value after the start of the code
        this.animateloop = window.requestAnimationFrame(this.animationLoop);

    }

    animationLoop(fframe)
    {

        this.updateGame(fframe);
        this.render();

        if (this.active)
        {
            this.animateloop = window.requestAnimationFrame(this.animationLoop);
        }
        else
        {
            this.animateloop=window.cancelAnimationFrame(this.animateloop);
        }
    }

    updateGame(fframe)
    {
        //reset the frame value for 1time
        if(this.reset === 0)
        {
            fframe = 0;
            this.reset++;
        }
        
        // fframe =0 and lastframe = 0 from above declaration so frame =0 in next iteration the fframe value goes to normal say (13355)and then the last fame is also near 13355 so the diff gives less than 0 which is added to time gone...it doesnt give accurate time second but it works,,need to find accurate time later
        let frame = (fframe - this.lastframe) / 1000;
        
        //last frame value is set to present frame value from performance now function for one time
        if(this.reset === 0)
        {
            this.lastframe = this.lastpframe;
            this.reset++;
        }
        else//after one iteration the lastframe value is back to fframe
        {
              this.lastframe = fframe;
        }
      //timeframe is set to frame
        this.timeframe += frame;
               //if only time frame goes to 1 ie 1second
        if(this.timeframe>=1)
        {
            this.timegone += this.timeframe;//add 1sec to timegone
            this.showtime = this.GAME_TIME - this.timegone;//remove 1sec from gametime and set to showtime
            this.timeframe=0;//set the timeframe back to 0
        }
        

        if (this.gamestate === this.gamestates.ready)
        { ///gamestate is ready for useinput
            if (this.moves.length <= 0)
            {
                this.gameover = true;
            }

        }

        if (this.gamestate === this.gamestates.process)
        { // gamestate is proccesing
            this.animatetime += frame;
            if (this.animationstate === this.animationstates.reverseswap)
            {
                if (this.animatetime > this.ANIMATION_DELAY) {
                    //reverse swap move
                    this.swap(this.currentmove.row1, this.currentmove.col1, this.currentmove.row2, this.currentmove.col2);
                    //set game state to ready for user input
                    this.gamestate = this.gamestates.ready;
                    this.animatetime = 0;
                }

            }


            if (this.animationstate === this.animationstates.shifttiles)
            {
                if (this.animatetime > this.ANIMATION_DELAY) {
                    //shifting tiles
                    this.shiftTileAndSwapTile();
//                after swapping tiles the layout is to be checked for cluster so send back to searchcluster animation state


                    this.searchCluster();
                    if (this.clusters.length <= 0)
                    {
//                    if the cluster length is 0 then game state is set to ready for user input
                        this.gamestate = this.gamestates.ready;
                    }
                    this.animationstate = this.animationstates.searchcluster;
                    this.animatetime = 0;
                }

            }

            if (this.animationstate === this.animationstates.searchcluster)
            {
                if (this.animatetime > this.ANIMATION_DELAY) {
                    //search clusters and point score
                    this.searchCluster();
                    if (this.clusters.length > 0)
                    {
                        for (let i = 0; i < this.clusters.length; i++)
                        {
                            this.score += 100;
                            if (this.clusters[i].length === 4)
                            {
                                this.score += 50;
                            } else if (this.clusters[i] > 4)
                            {
                                this.score += 100;
                            }
                        }

                        this.assignAndShiftValue();
                        //after cluster destroyed need to shift tiles so chaning animation state to shifttiles
                        this.animationstate = this.animationstates.shifttiles;

                    } else
                    {
                        this.gamestate = this.gamestates.ready;
                    }

                    this.animatetime = 0;
                }

            }


            if (this.animationstate === this.animationstates.swipetiles)
            {
                if (this.animatetime > this.ANIMATION_DELAY) {
                    //swap tile animate
                    this.swap(this.currentmove.row1, this.currentmove.col1, this.currentmove.row2, this.currentmove.col2);
                    //after swaping check for cluster

                    this.searchCluster();
                    if (this.clusters.length > 0)
                    {
                        //valid swap move
                        //if the cluster are present the cluster are to be removed so animation state is changed to searchcluster
                        this.animationstate = this.animationstates.searchcluster;
                        this.gamestate = this.gamestates.process;
                    } else
                    {
                        //not valid then send for reverse swap in animation state reverseswap
                        this.animationstate = this.animationstates.reverseswap;
                    }
                    this.animatetime = 0;
                }
            }
        }
    }

    render()
    {
        this.createFrame();
        this.renderTiles();
        this.renderClusters();
        this.checkGameOver();


    }
    checkGameOver()
    {
        //        ------------------------for step check-------------------------
        if (this.stepleft === -1)
        {
            this.gameover = true;
        }
        // if time over then game over

        if (Math.round(this.showtime) <= 0)
        {
            this.gameover = true;

        }
//       ---------------------------- check if gameover------------------------------------
        if (this.gameover)
        {
            console.log("gameover");

            this.ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
            this.ctx.fillRect(this.stage.x, this.stage.y, (this.stage.columns * this.stage.tilewidth) + 3, (this.stage.rows * this.stage.tileheight) + 3);

            this.ctx.fillStyle = "#ffffff";
            this.ctx.font = "24px Verdana";
            this.ctx.fillText("Game Over!", this.stage.x + (((this.stage.columns * this.stage.tilewidth) / 4)), this.stage.y + ((this.stage.columns * this.stage.tileheight) + 3) / 2 + 10, ((this.stage.columns * this.stage.tilewidth) / 2));
            this.active = false;
        }
    }

    createFrame()
    {
//        --------------------for canvas background--------------------
        this.ctx.fillStyle = '#d0d0d0';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = '#e8eaec';
        this.ctx.fillRect(1, 1, this.canvas.width - 2, this.canvas.height - 2);

//       -----------------------for scoreboard------------------
        this.ctx.fillStyle = "#000000";
        this.ctx.font = '30px Arial';
        this.ctx.fillText('Score:', 30, 30);
        this.ctx.fillStyle = "#ffffff";
        this.ctx.fillText(this.score, 120, 32);

//       ----------------------moves left-----------------------


        this.ctx.fillStyle = "#000000";
        this.ctx.font = '30px Arial';
        this.ctx.fillText('Moves Left:', 300, 30);
        this.ctx.fillStyle = "#ffffff";
        if (this.stepleft > 0)
        {
            this.ctx.fillText(this.stepleft, 470, 30);
        } else
        {
            this.ctx.fillText("0", 470, 30);
        }




        //       ----------------------time left-----------------------


        this.ctx.fillStyle = "#000000";
        this.ctx.font = '30px Arial';
        this.ctx.fillText('TIME-LEFT:', 600, 30);
        this.ctx.fillStyle = "#ffffff";
        this.ctx.fillText(Math.round(this.showtime), 770, 30);

//         ---------------------for buttons----------------
        for (let i = 0; i < this.buttons.length; i++)
        {
            this.ctx.fillStyle = '#000000';
            this.ctx.fillRect(this.buttons[i].x, this.buttons[i].y, this.buttons[i].width, this.buttons[i].height);

            this.ctx.fillStyle = '#ffffff';
            this.ctx.font = '20px Arial';
            this.ctx.fillText(this.buttons[i].text, this.buttons[i].x + 25, this.buttons[i].y + 30);

        }


//        ------------------------for stage background black--------------------
        this.ctx.fillStyle = '#000000';
        this.ctx.fillRect(this.stage.x - 1, this.stage.y - 1, (this.stage.columns * this.stage.tilewidth) + 3, (this.stage.rows * this.stage.tileheight) + 3);



    }

    renderTiles()
    {

        for (let i = 0; i < this.stage.rows; i++)
        {
            for (let j = 0; j < this.stage.columns; j++)
            {
                let shiftx = this.stage.tiles[i][j].shift;

                let tilecord = this.getCord(i, j, ((this.animatetime / this.ANIMATION_DELAY) * shiftx), 0);
                if (this.stage.tiles[i][j].type >= 0)
                {
                    let typecolor = this.tilecolors[this.stage.tiles[i][j].type];
                    this.drawTile(tilecord.tileX, tilecord.tileY, typecolor[0], typecolor[1], typecolor[2]);
                }

                if (this.stage.tileselect.selected)
                {
                    if (this.stage.tileselect.column === j && this.stage.tileselect.row === i)
                    {
                        this.drawTile(tilecord.tileX, tilecord.tileY, 255, 0, 0);
                    }
                }
            }
        }
        this.renderSwapAnimation();
    }

    renderSwapAnimation()
    {
        if (this.gamestate === this.gamestates.process && (this.animationstate === this.animationstates.reverseswap || this.animationstate === this.animationstates.swipetiles))
        {

            let shiftX = this.currentmove.col2 - this.currentmove.col1;
            let shiftY = this.currentmove.row2 - this.currentmove.row1;
            let cord1 = this.getCord(this.currentmove.row1, this.currentmove.col1, 0, 0);
            let cord1shift = this.getCord(this.currentmove.row1, this.currentmove.col1, (this.animatetime / this.ANIMATION_DELAY) * shiftY, (this.animatetime / this.ANIMATION_DELAY) * shiftX);
            let color1 = this.tilecolors[this.stage.tiles[this.currentmove.row1][this.currentmove.col1].type];

            let cord2 = this.getCord(this.currentmove.row2, this.currentmove.col2, 0, 0);
            let cord2shift = this.getCord(this.currentmove.row2, this.currentmove.col2, -(this.animatetime / this.ANIMATION_DELAY) * shiftY, -(this.animatetime / this.ANIMATION_DELAY) * shiftX);
            let color2 = this.tilecolors[this.stage.tiles[this.currentmove.row2][this.currentmove.col2].type];


            this.drawTile(cord1.tileX, cord1.tileY, 0, 0, 0);
            this.drawTile(cord2.tileX, cord2.tileY, 0, 0, 0);


            //this.drawTile(tilecord.tileX, tilecord.tileY, 255, 0, 0);
            if (this.animationstate === this.animationstates.process)
            {
                console.log("cord2", cord2shift);
                this.drawTile(cord2shift.tileX, cord2shift.tileY, color2[0], color2[1], color2[2]);
                this.drawTile(cord1shift.tileX, cord1shift.tileY, color1[0], color1[1], color1[2]);

            } else
            {
                this.drawTile(cord1shift.tileX, cord1shift.tileY, color1[0], color1[1], color1[2]);
                this.drawTile(cord2shift.tileX, cord2shift.tileY, color2[0], color2[1], color2[2]);
            }
        }
    }

    renderClusters()
    {
        if (this.clusters.length > 0)
        {

            for (let i = 0; i < this.clusters.length; i++)
            {
                let cluscord = this.getCord(this.clusters[i].row, this.clusters[i].column, 0, 0);
                if (this.clusters[i].horizontal)
                {
                    this.ctx.fillStyle = "#ffffff";


                    this.ctx.fillRect(cluscord.tileX + this.stage.tilewidth / 2, cluscord.tileY + this.stage.tileheight / 2, (this.clusters[i].length - 1) * this.stage.tilewidth, 5);
                } else
                {

                    this.ctx.fillStyle = "#ffffff";

                    this.ctx.fillRect(cluscord.tileX + this.stage.tilewidth / 2, cluscord.tileY + this.stage.tileheight / 2, 5, (this.clusters[i].length - 1) * this.stage.tilewidth);

                }
            }
        }
    }

    getCord(row, col, rowanimate, colanimate)
    {
        let tileX = this.stage.x + ((col + colanimate) * this.stage.tilewidth);
        let tileY = this.stage.y + ((row + rowanimate) * this.stage.tileheight);
        return {tileX: tileX, tileY: tileY};

    }

    drawTile(x, y, r, g, b) {
        this.ctx.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
        this.ctx.fillRect(x + 2, y + 2, this.stage.tilewidth - 3, this.stage.tileheight - 3);
    }

    createLevel()
    {
        this.levelCreated = false;

        while (!this.levelCreated)
        {

            for (var i = 0; i < this.stage.rows; i++) {
                for (var j = 0; j < this.stage.columns; j++) {
                    this.stage.tiles[i][j].type = this.getRandomTile();
                }
            }

//       --------------     delete the cluster and give tiles level without any cluster-------------

            this.destroyClusters();

//           ------------------- find available moves in the stage------------------
//           
            this.findmoves();
            if (this.moves.length > 0)
            {
                this.levelCreated = true;
            }

        }
    }

    findmoves()
    {
        this.moves = [];
//     -------------------   for horizontal move finding----------------------

        for (let i = 0; i < this.stage.rows; i++)
        {
            for (let j = 0; j < this.stage.columns - 1; j++)
            {
                this.swap(i, j, i, j + 1);
                this.searchCluster();
                this.swap(i, j, i, j + 1);

                if (this.clusters.length > 0)
                {
                    this.moves.push({row1: i, col1: j, row2: i, col2: j + 1, horizontalmove: true});
                }
            }
        }
//     -------------------   for vertical move finding----------------------

        for (let i = 0; i < this.stage.columns; i++)
        {
            for (let j = 0; j < this.stage.rows - 1; j++)
            {
                this.swap(j, i, j + 1, i);
                this.searchCluster();
                this.swap(j, i, j + 1, i);

                if (this.clusters.length > 0)
                {
                    this.moves.push({row1: j, col1: i, row2: j + 1, col2: i, verticalmove: true});
                }
            }
        }
    }

    destroyClusters()
    {
        this.searchCluster();

        while (this.clusters.length > 0)
        {
            this.assignAndShiftValue();
            this.shiftTileAndSwapTile();
            this.searchCluster();
        }
//        no cluster data
//        document.write('<br>');
//        for (let i = 0; i < this.stage.rows; i++) {
//            document.write('<br>');
//            for (let j = 0; j < this.stage.columns; j++) {
//                document.write(this.stage.tiles[i][j].type);
//            }
//        }
    }
    assignAndShiftValue()
    {
        this.assignTypeToClusterTiles();

        for (var i = 0; i < this.stage.columns; i++) {
            let shift = 0;
            for (var j = this.stage.rows - 1; j >= 0; j--) {
                if (this.stage.tiles[j][i].type === -1) {
                    shift++;
                    this.stage.tiles[j][i].shift = 0;

                } else {
                    this.stage.tiles[j][i].shift = shift;
                }
            }
        }
    }
    shiftTileAndSwapTile()
    {
        for (let i = 0; i < this.stage.columns; i++)
        {

            for (let j = this.stage.rows - 1; j >= 0; j--)
            {
//                console.log(j,i);
                if (this.stage.tiles[j][i].type === -1)
                {
                    this.stage.tiles[j][i].type = this.getRandomTile();
                } else
                {
                    let shift = this.stage.tiles[j][i].shift;
                    if (shift > 0)
                    {
                        this.swap(j, i, j + shift, i);
                    }
                }

                this.stage.tiles[j][i].shift = 0;
            }
        }
    }

    swap(currentrow, currentcol, updatedrow, updatedcol)
    {
        let temp = this.stage.tiles[currentrow][currentcol].type;
        this.stage.tiles[currentrow][currentcol].type = this.stage.tiles[updatedrow][updatedcol].type;
        this.stage.tiles[updatedrow][updatedcol].type = temp;
    }

    assignTypeToClusterTiles()
    {
        for (let i = 0; i < this.clusters.length; i++)
        {
            let onecluster = this.clusters[i];
            let colshif = 0;
            let rowshif = 0;

            for (let j = 0; j < onecluster.length; j++)
            {
                //black illusion on delete
                this.stage.tiles[onecluster.row + rowshif][onecluster.column + colshif].type = -1;
                if (onecluster.horizontal)
                {
                    colshif++;
                } else if (onecluster.vertical)
                {
                    rowshif++;
                }
            }
        }
    }

    searchCluster()
    {
        this.clusters = [];

//        --------------horizontal search-----------
        for (let i = 0; i < this.stage.rows; i++)
        {
            this.clusterFound = false;

            for (let j = 0; j < this.stage.columns; j++)
            {
                if (j === this.stage.columns - 1)
                {
                    this.clusterFound = true;
                    if (this.clusterFound) {
                        if (this.clusterLength >= 3) {
                            // Found a horizontal cluster
                            //can assign the -1 value type in here also
                            this.clusters.push({column: j - this.clusterLength + 1, row: i,
                                length: this.clusterLength, horizontal: true});

                        }
                        this.clusterLength = 1;
                    }
                } else
                {
                    if (this.stage.tiles[i][j].type === this.stage.tiles[i][j + 1].type && this.stage.tiles[i][j].type !== -1)
                    {
                        this.clusterLength++;
                    } else
                    {
//                        diff
                        this.clusterFound = true;
                        if (this.clusterFound) {
                            if (this.clusterLength >= 3) {
                                // Found a horizontal cluster
                                //can assign the -1 value type in here also
                                this.clusters.push({column: j - this.clusterLength + 1, row: i,
                                    length: this.clusterLength, horizontal: true});
                            }
                            this.clusterLength = 1;
                        }
                    }
                }

            }
        }

//       --------------- Vertical search--------------

        for (let i = 0; i < this.stage.columns; i++)
        {
            this.clusterFound = false;

            for (let j = 0; j < this.stage.rows; j++)
            {
                if (j === this.stage.rows - 1)
                {
                    this.clusterFound = true;
                    if (this.clusterFound) {
                        if (this.clusterLength >= 3) {
                            // Found a horizontal cluster
                            //can assign the -1 value type in here also
                            this.clusters.push({column: i, row: j + 1 - this.clusterLength,
                                length: this.clusterLength, vertical: true});
                        }
                        this.clusterLength = 1;
                    }

                } else
                {
                    if (this.stage.tiles[j][i].type === this.stage.tiles[j + 1][i].type && this.stage.tiles[j][i].type !== -1)
                    {
                        this.clusterLength++;
                    } else
                    {
//                   ----------     diff--------------------------
                        this.clusterFound = true;
                        if (this.clusterFound) {

                            if (this.clusterLength >= 3) {
                                // Found a horizontal cluster
                                //can assign the -1 value type in here also
                                this.clusters.push({column: i, row: j + 1 - this.clusterLength,
                                    length: this.clusterLength, vertical: true});
                            }

                            this.clusterLength = 1;
                        }
                    }
                }

            }
        }
//           ------------------checking cluster-------------
//        for (let i = 0; i < this.clusters.length; i++)
//        {
//            console.log(i, this.clusters[i]);
//        }

    }

    getRandomTile() {
        return Math.floor(Math.random() * this.tilecolors.length);
    }

    mouseDown(e)
    {
        let pos = this.getMousePos(canvas, e);

        if (!this.drag)
        {

            let mouseovertile = this.getMouseTile(pos);
//            console.log("tile", mouseovertile);

            if (mouseovertile.valid)
            {
                let swaped = false;
                if (this.stage.tileselect.selected)
                {//selected tile deselect
                    if (mouseovertile.col === this.stage.tileselect.column && mouseovertile.row === this.stage.tileselect.row) {
                        // Same tile selected, deselect
//                        console.log("here");
                        this.stage.tileselect.selected = false;
                        this.drag = true;
                        return;

                    } else if (this.canSwap(mouseovertile.col, mouseovertile.row, this.stage.tileselect.column, this.stage.tileselect.row)) {
                        // Tiles can be swapped, swap the tiles
                        this.stepleft -= 1;
                        this.mouseSwap(mouseovertile.col, mouseovertile.row, this.stage.tileselect.column, this.stage.tileselect.row);
                        swaped = true;
                    }

                }
                if (!swaped) {
//                 setting the new selected tile
                    this.stage.tileselect.column = mouseovertile.col;
                    this.stage.tileselect.row = mouseovertile.row;
                    this.stage.tileselect.selected = true;
//                    console.log("selecttile", this.stage.tileselect);
                }
            } else {
                // Invalid tile
                this.stage.tileselect.selected = false;
            }

            this.drag = true;
        }

//       ---------------------- buttons----------------
        for (let i = 0; i < this.buttons.length; i++)
        {

            if (pos.x >= this.buttons[i].x && pos.x < this.buttons[i].x + this.buttons[i].width &&
                    pos.y >= this.buttons[i].y && pos.y < this.buttons[i].y + this.buttons[i].height) {

//                     Button i was clicked
                if (i === 0) {
                    console.log("reset");
                    this.startGame();

                }
            }
        }
    }
    mouseMove(e)
    {


        if (this.drag && this.stage.tileselect.selected)
        {
            let pos = this.getMousePos(canvas, e);
            let mouseovertile = this.getMouseTile(pos);
            if (mouseovertile.valid)
            {
                if (this.canSwap(this.stage.tileselect.column, this.stage.tileselect.row, mouseovertile.col, mouseovertile.row)) {
                    this.stepleft -= 1;
                    this.mouseSwap(mouseovertile.col, mouseovertile.row, this.stage.tileselect.column, this.stage.tileselect.row);
                }
            }

        }
    }

    mouseSwap(c1, r1, c2, r2) {

        this.currentmove = {col1: c1, row1: r1, col2: c2, row2: r2};
        this.stage.tileselect.selected = false;
        this.animationstate = this.animationstates.swipetiles;
        this.gamestate = this.gamestates.process;
    }

    canSwap(tilex1, tiley1, tilex2, tiley2)
    {
        if ((Math.abs(tilex1 - tilex2) === 1 && tiley1 === tiley2) || (Math.abs(tiley1 - tiley2) === 1 && tilex1 === tilex2))
        {
            return true;
        } else
        {
            return false;
        }
    }

    mouseUp() {

        this.drag = false;
    }

    mouseOut() {

        this.drag = false;
    }

    getMousePos(canvas, e)
    {
        let rect = canvas.getBoundingClientRect();

        return {
            x: Math.round((e.clientX - rect.left) / (rect.right - rect.left) * canvas.width),

            y: Math.round((e.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height)
        };
    }
    getMouseTile(pos) {
        // Calculate the index of the tile
        let tileindexx = Math.floor((pos.x - this.stage.x) / this.stage.tilewidth);

        let tileindexy = Math.floor((pos.y - this.stage.y) / this.stage.tileheight);


        // Check if the tile is valid
        if (tileindexx >= 0 && tileindexx < this.stage.columns && tileindexy >= 0 && tileindexy < this.stage.rows) {

            return {
                valid: true,
                row: tileindexy,
                col: tileindexx
            };
        }

        // No valid tile
        return {
            valid: false,
            row: 0,
            col: 0
        };
    }
}


var candy = new Candy();
candy.init();