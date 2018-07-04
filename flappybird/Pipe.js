/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


class Pipe {
    constructor(props)
    {

        this.$pipetop = document.createElement("div");
        this.$pipebottom = document.createElement("div");

        this.countcreate = 0;
        this.CONSTANTGAP = 30;
        this.width = props.width || 30;
        this.height = props.height || 620;
        this.parent = props.parent;
        this.classname = props.classname;
        this.xaxis = 500;
        this.speed = 2;
        this.dx = -1;
        this.TOP_MINTOP = -300;
        this.TOP_MAXTOP = -550;
        this.PIPEIMAGE_HEIGHT = 400;
        this.pipetop_top;
        this.pipedown_top;


    }

    createPipetop()
    {
        this.pipetop_top = this.getRandomTop(this.TOP_MINTOP, this.TOP_MAXTOP);
        this.$pipetop.className = this.classname;
        this.$pipetop.style.height = this.height + 'px';
        this.$pipetop.style.width = this.width + 'px';
        this.$pipetop.style.left = this.xaxis + 'px';
        this.$pipetop.style.top = this.pipetop_top + 'px';
        this.$pipetop.style.transform = "rotate(180deg)";

        this.parent.appendChild(this.$pipetop);
        return(this.pipetop_top);
    }

    createPipedown(pipetoppos)
    {
        this.pipedown_top = ((pipetoppos - this.TOP_MINTOP) + this.PIPEIMAGE_HEIGHT + this.CONSTANTGAP);
        this.$pipebottom.className = this.classname;
        this.$pipebottom.style.height = this.height + 'px';
        this.$pipebottom.style.width = this.width + 'px';
        this.$pipebottom.style.left = this.xaxis + 'px';
        this.$pipebottom.style.top = this.pipedown_top + 'px';
        this.parent.appendChild(this.$pipebottom);

    }

    updatePipe()
    {
        this.xaxis = this.xaxis + (this.dx * this.speed);
        this.$pipetop.style.left = this.xaxis + 'px';
        this.$pipebottom.style.left = this.xaxis + 'px';
    }

    deletePipetop()
    
    {
        if ((this.xaxis + this.width) < 0)
        {
            this.parent.removeChild(this.$pipetop);
        }
    }
    
    deletePipedown()
    {
        if ((this.xaxis + this.width) < 0)
        {
//            console.log(this.$pipebottom);
            console.log(this.parent);
             this.parent.removeChild(this.$pipebottom);
        }
    }

    getRandomTop(min, max)
    {

        return Math.floor(Math.random() * (max - min + 1) + min);

    }

}
