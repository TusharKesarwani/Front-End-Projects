async function quickSort(heightarray,l,r)
{
    if(l<r)
    {
          let pi=await partition(heightarray,l,r)
         await quickSort(heightarray,l,pi-1)//wait till promise is returned
         await quickSort(heightarray,pi+1,r)//wait till promise is returned
    }
}
async function partition(heightarray,l,r)
{
    let pivot=heightarray[r]
    let i=l-1;

    for(let j=l;j<r;j++)
    {   await waitforme(v)   //wait for  miliseconds 
        if(heightarray[j]<pivot)
        {
        await waitforme(v)    
        i++;
        swap(heightarray,i,j)
        }
    }
    await waitforme(v)    //wait for  miliseconds
    swap(heightarray,i+1,r)
    return (i+1)
}

function swap(heightarray,i,j)
{
    let temp=heightarray[i]
    heightarray[i]=heightarray[j]
    heightarray[j]=temp

    let b1=document.getElementById(array_of_bars[i].id)
    let b2=document.getElementById(array_of_bars[j].id)

    temp=b1.style.height
    b1.style.height=b2.style.height
    b2.style.height=temp

    b1.style.borderLeft="2px solid purple"
    b2.style.borderLeft="2px solid purple"
}

