// function to swapbars
async function swapbars(n)
{
   let b1 = document.getElementById(array_of_bars[n].id);
   let b2 = document.getElementById(array_of_bars[n+1].id);

   let temp=heightarray[n]
   heightarray[n]=heightarray[n+1]
   heightarray[n+1]=temp

   temp=b1.style.height;
   b1.style.height=b2.style.height
   b2.style.height=temp

}

    async function sorting() {
    for (let m = 0; m < al - 1; m++) {
    for (let n = 0; n < al - 1; n++) {
        if ((heightarray[n])>=heightarray[n+1]) {
          await waitforme(v)//wait for  miliseconds
          swapbars(n)
        }
      }
      document.getElementById(array_of_bars[al-m-1].id).style.borderLeft="2px solid turquoise";
    }
    document.getElementById(array_of_bars[0].id).style.borderLeft="2px solid turquoise";
  }


