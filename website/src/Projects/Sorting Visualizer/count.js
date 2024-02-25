// countsort function to sort array
async function countsort(heightarray,al)
{
    let k=heightarray[0]
    for(let i=0;i<al;i++)
    k=Math.max(k,heightarray[i])

    let count=new Array(k+1)
    for(let i=0;i<=k;i++)
    count[i]=0;

    for(let i=0;i<al;i++)
    count[heightarray[i]]++

    for(let i=1;i<=k;i++)
    count[i]+=count[i-1]
    
    let output=[]
    for(let i=al-1;i>=0;i--)
    output[--count[heightarray[i]]]=heightarray[i]

    for(let i=0;i<al;i++)
    {
    heightarray[i]=output[i]
    await waitforme(v);//wait for  miliseconds
    document.getElementById(array_of_bars[i].id).style.height=`${heightarray[i]}px`
    document.getElementById(array_of_bars[i].id).style.borderLeft="2px solid red"
    }
}

