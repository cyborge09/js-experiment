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
        this.rise_margin = 0;
        this.imagecount = 0;
        this.dy = 1;
        this.speed = 0;
        this.degree = 0;
        this.height = props.height || 15;
        this.width = props.height || 15;
        this.parent = props.parent;
        this.birdleft = props.birdleft || 15;
        this.birdtop = props.birdtop || 15;
        this.parent = props.parent || 15;

    }

    init()
    {
//        ---------------bird init------------
        this.$bird.className = this.classname;
        this.$bird.style.width = this.width + "px";
        this.$bird.style.height = this.height + "px";
        this.$bird.style.top = this.birdtop + "px";
        this.$bird.style.left = this.birdleft + "px";
        this.parent.appendChild(this.$bird);
    }
    birdposition()
    {
        if (this.rise_margin > 0) {

            this.dy = -1;

            this.rise_margin--;
            (this.rise_margin === 0) ? this.speed = 1 : this.speed = 5;
           ;
        } else {

            this.dy = 1;

            (this.speed > 6) ? this.speed = 6 : this.speed += 0.5;
            ((this.degree >= 90) ? this.degree = 90 : ((this.degree >= 0) ? this.degree += 10 : this.degree += 2));
            
        }
        this.birdtop += this.dy * this.speed;


    }

    renderbird()
    {
        this.transformbird();
        this.$bird.style.top = this.birdtop + "px";
        this.birdposition();
    }

    renderbirdUp() {
        this.degree = -35;
        this.rise_margin = 13;
    }


    transformbird()
    {
        if (this.dy === 1)
        {
            this.$bird.style.transform = "rotate(" + this.degree + "deg)";
        } else
        {
            this.$bird.style.transform = "rotate(" + this.degree + ")";
        }
    }
}

