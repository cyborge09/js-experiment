/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var animate = function ()
{


    var images = ["./images/I1.jpg", "./images/I2.jpg", "./images/I3.jpg"];
    var $slidewrapper = document.getElementById("slide-wrapper");
    var $imagewrapper = document.getElementById("image-wrapper");
    var $leftbutton = document.getElementById("left");
    var $rightbutton = document.getElementById("right");
    var currentIndex = 0;
    var nextIndex = 0;
    var speed=40;

    loadimage();

    $rightbutton.addEventListener("click", function () {

        currentIndex = nextIndex;
        nextIndex = (nextIndex += 1);


        console.log(currentIndex);
        console.log(nextIndex);
        if (nextIndex === 3)
        {
            transition(0, 2, "previous",10);
            nextIndex=0;
            
           
        } else
        {
            transition(nextIndex, currentIndex, "next",speed);
        }

    });

    $leftbutton.addEventListener("click", function () {
        currentIndex = nextIndex;
        nextIndex = (nextIndex -= 1);
        console.log(currentIndex);
        console.log(nextIndex);

        if (nextIndex === -1)
        {
            transition(2,0,"next",10);
            nextIndex=2;
        }
        else
        {
            transition(nextIndex, currentIndex, "previous",speed);
        }

        
        
    });
    function loadimage()
    {
        for (var i = 0; i < images.length; i++)
        {
            console.log(images.length);
            var newImage = document.createElement("img");
            newImage.src = images[i];
            console.log(newImage);
            $imagewrapper.appendChild(newImage);
        }

    }

    function margin(Index) {
        return (Index * -1368);
    }

    function transition(targetIndex, addIndex, transSide,speed)
    {
        var addMargin = margin(addIndex);
        var targetMargin = margin(targetIndex);


        var interval = setInterval(function () {
            if (transSide === "next")
                addMargin -= 38;
            else
                addMargin += 38;

            $imagewrapper.style.marginLeft = addMargin + 'px';
            console.log(addMargin);
            console.log(targetMargin);
            if (addMargin === targetMargin) {
                clearInterval(interval);
            }
        }, speed);

    }


};
animate();