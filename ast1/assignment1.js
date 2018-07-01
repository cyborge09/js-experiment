/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



var animate = function()
{

   columnno = 1;
    repeat=0;
    var isIncrementing = true;
   
       var animateinterval = setInterval(function ()
        {
            repeat=repeat+1;
            
            if (isIncrementing === true)
            {
                for (var column= 0; column< columnno; column++)
                {
                    document.write("*");
                    
                }
                document.write("<br/>");
                columnno++;
            } else if (isIncrementing === false)
            {
                for (var column= 0; column< columnno; column++)
                {
                    document.write("*");
                }
                document.write("<br/>");
                columnno--;
            }

            if (columnno === 7)
            {
                isIncrementing = false;
                columnno = columnno - 2;
            } else if (columnno === 0)
            {
                isIncrementing = true;
                columnno = columnno + 2;
            }
            
           if(repeat===61)
           {
               clearInterval(animateinterval);
               stop;
           }
        }, 100);
        
    }

;
animate();
