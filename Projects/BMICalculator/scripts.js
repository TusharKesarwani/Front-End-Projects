document.getElementById('sub').addEventListener('click',function(){
    let h = document.getElementById('height').value;
    let w = document.getElementById('weight').value;
    h/=100.0;
    let bmi = w/(h*h);
    bmi = parseFloat(bmi).toFixed(2);
    let img;
    let data='';
    if(bmi<19){
        data='You Are Underweight';
        img=".assets/underweight.jpg";
    }
    else if(bmi>=19 && bmi<=25){
        data='You Are Healthy';
        img=".assets/healthy.jpg";
    }
    else if(bmi>25&&bmi<=30){
        data='You Are Overweight';
        img=".assets/overweight.jpg";
    }
    else if (bmi>30){
        data='You Are Obese';
        img=".assets/obese.jpg";
    }
    else{
        data='Please Enter a Valid Input'
    }
    document.getElementById('body').setAttribute("src",img);
    document.getElementById('res').innerHTML=` ${data}.`;
    document.getElementById('result').innerHTML=`Your BMI is <strong>${bmi}</strong>.`;
    document.getElementById('info').setAttribute("class","card show");
});
