/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var data = "aaabbcccdddddd33";

console.log(findLargest(data));

function findLargest(data)
{
    var sets = separateData(data);
    var largest = sets[0];
    for(var i =1 ; i<sets.length;i++)
    {
        if(sets[i].repetation>=largest.repetation)
        {
            largest=sets[i];
        }
    }
    return largest;
}

function separateData(data)
{
    var dataArr = data.split('');
    var result = repetation(dataArr);
    return result;
}

function repetation(dataArr)
{
    var result =[];
    currentValue = dataArr[0];
    var repeaterCounter=1;
    for(var i=1;i<dataArr.length;i++)
    {
        if(dataArr[i]===currentValue)
        {
            repeaterCounter++;
            
        }
        else
        {
            var set = assignRepeater(repeaterCounter,i-1,dataArr);
            result.push(set);
            repeaterCounter = 1;
            currentValue= dataArr[i];  
        }
          
    }
    var set = assignRepeater(repeaterCounter,i-1,dataArr);
    result.push(set);
    return result;
}

function assignRepeater(repeat,position,data)
{
    var set={
            variable: data[position],
            repetation: repeat         
    };
    return set;
}