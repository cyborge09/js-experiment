/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

class Bird
{
    constructor(props)
    {
        this.$bird = document.createElement("div");
        this.classname = props.classname;
        this.height = props.height || 15;
        this.width = props.height || 15;
        this.parent = props.parent;
        this.birdleft = props.birdleft || 15;
        this.birdtop = props.birdright || 15;
        this.parent = props.parent || 15;
    }
    
    init()
    {
//        ---------------bird init------------
        this.$bird.className = "this.classname";
        this.$bird.style.width = "this.width"+"px";
        this.$bird.style.height = "this.height"+"px";
        this.$bird.style.top = "this.birdtop"+"px";
        this.$bird.style.left = "this.birdleft"+"px";
        this.parent.appendChild(this.$bird);  
        
    }
}

