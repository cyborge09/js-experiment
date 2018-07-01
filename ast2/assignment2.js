/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var graph = function ()
{

    var datas = dataGenerate(10, 500);

   
    datas.forEach(function (datum)
        {
            pointdata(datum);
        });


    function dataGenerate(count, max)
    {

        var data = [];
        for (var i = 0; i < count; i++)
        {

            var top = parseInt(Math.random() * max);
            var left = parseInt(Math.random() * max);
            var datum = {top: top, left: left};
            data.push(datum);
        }
        //console.log(data);
        return data;

    }
  
    function pointdata(data)
    {
        var main = document.getElementById("main");
        main.style.width = "1000px";
        main.style.height = "1000px";
        main.style.background = "red";
        main.style.position = "relative";

        var element = document.createElement("div");
        element.style.width = "10px";
        element.style.height = "10px";
        element.style.background = "black";
        element.style.position = "absolute";
        element.style.top = data.top + "px";
        element.style.left = data.left + "px";

        main.appendChild( element);


        element.onclick = function ()
        {
            main.removeChild(element);
        };


    }

};
graph();