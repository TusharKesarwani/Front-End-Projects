document.getElementById('sub').addEventListener('click',function(){
    let h = document.getElementById('height').value;
    let w = document.getElementById('weight').value;
    h/=100.0;
    let bmi = w/(h*h);
    bmi = parseFloat(bmi).toFixed(2);
    let img;
    let data='';
    if(bmi<19){
        data='underweight';
        img=".assets/underweight.jpg";
    }
    else if(bmi>=19 && bmi<=25){
        data='Healthy';
        img=".assets/healthy.jpg";
    }
    else if(bmi>25&&bmi<=30){
        data='overweight';
        img=".assets/overweight.jpg";
    }
    else{
        data='Obese';
        img=".assets/obese.jpg";
    }
    document.getElementById('body').setAttribute("src",img);
    document.getElementById('res').innerHTML=`You are ${data}.`;
    document.getElementById('result').innerHTML=`Your BMI is <strong>${bmi}</strong>.`;
    document.getElementById('info').setAttribute("class","card show");
});
