// Insertion array function
async function Insertionsort(heightarray,al)
{
    for(let i=1;i<al;i++)
    {
        let current=heightarray[i]
        let j=i-1;
        while(heightarray[j]>current&&j>=0)
        {   await waitforme(v)//wait for  miliseconds
            heightarray[j+1]=heightarray[j]
            document.getElementById(array_of_bars[j+1].id).style.height=`${heightarray[j]}px`
            document.getElementById(array_of_bars[j+1].id).style.borderLeft="2px solid white"
            j--
        }
        await waitforme(v)//wait for  miliseconds
        heightarray[j+1]=current
        document.getElementById(array_of_bars[j+1].id).style.height=`${current}px`
        document.getElementById(array_of_bars[j+1].id).style.borderLeft="2px solid white"
    }
}
