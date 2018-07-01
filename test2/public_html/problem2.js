/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
//
function solution(data)
{
    var result = adder(data);
    console.log(result);

}
function adder(input)
{
    var result = 0;//for finaldata
    var multiplierData = 0;//for recuuring multiplication
    var data = input.toString();

    while (data.length > 0)
    {
        multiplierData = (parseInt(data.charAt(0)) * parseInt(data.charAt(data.length - 1)));
        if (data.length !== 1)
        {
            result += multiplierData;
        } else if (data.length === 1)
        {
            result += parseInt(data.charAt(0));
        }
        data = data.slice(1, -1);

    }
    if (result.toString().length === 1)
    {

        return result;


    } else
    {
        solution(result);
    }

}

solution(88669);
