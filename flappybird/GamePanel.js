/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


class GamePanel {

    constructor(props)
    {
        this.$background = props.backgrounddiv;
        this.$basescreen = props.basescreendiv;
        this.$scoreboard = props.scoreboard;
        this.update_background = 0;
        this.speed = 2;
        this.width = props.width || 600;
        this.height = props.height || 1000;
        this.parent = props.parent;
        this.idbase = props.idbase;
        this.idbackground = props.idbackground;
        this.classbackground = props.classbackground;
        this.classnamebase = props.classnamebase;
        this.classnamescoreboard = props.classnamescoreboard;
        this.basebackground = props.basebackground;
        this.backbackground = props.backbackground;
    }

    init()
    {
//      ----------------init background image----------
        this.$background.className = this.idbackground;
        this.$background.style.width = this.width + 'px';
        this.$background.style.height = this.height + 'px';
        this.$background.style.background = this.backbackground;
        this.parent.appendChild(this.$background);

//       ---------------init base background-----------
        this.$basescreen.className = this.classnamebase;
        this.$basescreen.id = this.idbase;
        this.$basescreen.style.width = this.width + 'px';
        this.$basescreen.style.height = this.height + 'px';
        this.$basescreen.style.backgroundImage = this.basebackground;
        this.$background.appendChild(this.$basescreen);
        
//       ------------------inti scoreboard-------------
        this.$scoreboard.className = this.classnamescoreboard;
        this.$scoreboard.style.top = "20px";
        this.$scoreboard.style.left = "20px";
        this.$background.appendChild(this.$scoreboard);
        

    }

    baseUpdate()
    {

        this.update_background += this.speed * -1;

    }

    scrollBg() {
        this.$basescreen.style.backgroundPosition = this.update_background + "px 100%";
        this.baseUpdate();
    }

}

