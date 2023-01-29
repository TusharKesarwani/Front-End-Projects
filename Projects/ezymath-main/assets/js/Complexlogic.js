function Complex(real, imaginary) {
    this.real = 0;
    this.imaginary = 0;
    this.real = (typeof real === 'undefined') ? this.real : parseFloat(real);
    this.imaginary = (typeof imaginary === 'undefined') ? this.imaginary : parseFloat(imaginary);
  }
  Complex.transform = function(num) {
    var complex;
    complex = (typeof num === 'number') ? new Complex(num, 0) : num;
    complex = (num instanceof Complex) ? num : complex;
    return complex;
  };
  function display(re, im) {
  
    if(im === '0') return '' + re;
    if(re === 0) return '' + im + 'i';
    if(im < 0) return '' + re + im + 'i';
    return '' + re + '+' + im + 'i';
  }
  function complexAdd(first, second) {
      var num1, num2;
      num1 = Complex.transform(first);
      num2 = Complex.transform(second);
      var real = num1.real + num2.real;
      var imaginary = num1.imaginary + num2.imaginary;
      return display(real, imaginary);
  }
  function complexSub(first, second) {
      var num1, num2;
      num1 = Complex.transform(first);
      num2 = Complex.transform(second);
      var real = num1.real - num2.real;
      var imaginary = num1.imaginary - num2.imaginary;
      return display(real, imaginary);
  }
  function complexMul(first, second) {
      var num1, num2;
      num1 = Complex.transform(first);
      num2 = Complex.transform(second);
      var real = num1.real*num2.real-num1.imaginary*num2.imaginary;
      var imaginary = num1.real*num2.imaginary+num1.imaginary*num2.real;
      return display(real, imaginary);
  }
  function complexDiv(first, second) {
      var num1, num2;
      num1 = Complex.transform(first);
      num2 = Complex.transform(second);
      var denom = num2.imaginary * num2.imaginary + num2.real * num2.real;
      if(denom==0)
      {
          return 'Invalid , You can not divide by 0';
      }
      var real = (num1.real * num2.real + num1.imaginary * num2.imaginary) /denom;
      var imaginary = (num2.real * num1.imaginary - num1.real * num2.imaginary) /denom; 
      return display(real, imaginary);   
  }
  
  function add() {
      var a = new Complex(document.getElementById('creal1').value,  document.getElementById('cimg1').value);
      var b = new Complex(document.getElementById('creal2').value,  document.getElementById('cimg2').value);
      var res = complexAdd(a,b);
      document.getElementById('compresult').innerHTML="The result is &nbsp;" + res;
  }
  
  function sub() {
      var a = new Complex(document.getElementById('creal1').value,  document.getElementById('cimg1').value);
      var b = new Complex(document.getElementById('creal2').value,  document.getElementById('cimg2').value);
      var res = complexSub(a,b);
      document.getElementById('compresult').innerHTML="The result is &nbsp;" + res;
  }
  function mul() {
      var a = new Complex(document.getElementById('creal1').value,  document.getElementById('cimg1').value);
      var b = new Complex(document.getElementById('creal2').value,  document.getElementById('cimg2').value);
      var res = complexMul(a,b);
      document.getElementById('compresult').innerHTML="The result is &nbsp;" + res;
  
  }
  function div() {
      var a = new Complex(document.getElementById('creal1').value,  document.getElementById('cimg1').value);
      var b = new Complex(document.getElementById('creal2').value,  document.getElementById('cimg2').value);
      var res = complexDiv(a,b);
      document.getElementById('compresult').innerHTML="The result is &nbsp;" + res;
  }
  
  function err() {
      katex.render("Invalid!", document.getElementById('compresult'), {
          throwOnError: false
      });
  }
  
  function comOperation(value) {
      if (value == "Addition") {
          add();
      } else if (value == "Subtraction") {
          sub();
      } else if (value == "Multiplication") {
          mul();
      } else if (value == "Division") {
          div();
      } else {
          err();
      }
  }
  
  function mag(){
      var x = new Complex(document.getElementById('creal').value,document.getElementById('cimg').value);
      var ans=x.real*x.real + x.imaginary*x.imaginary;
      let explain="\\[Magnitude = \\sqrt{real^2+imaginary^2}\\]"+"\\[Magnitude = \\sqrt{("+x.real+")^2+("+x.imaginary+")^2}=\\sqrt{"+x.real*x.real+"+"+x.imaginary*x.imaginary+"}=\\sqrt{"+ans+"}\\]";
      ans=Math.sqrt(ans).toFixed(3);
      explain+="\\[Magnitude ="+ans+"\\]";
      document.getElementById('comresult').innerHTML="Magnitude is &nbsp;" + ans;
      document.getElementById('comexplain').innerHTML=explain;
      renderMathInElement(document.getElementById("comexplain"));
  }
  function arg(){
      var x = new Complex(document.getElementById('creal').value,document.getElementById('cimg').value);
      var ans=Math.atan(x.imaginary/x.real).toFixed(3);
      let explain="\\[Argument =tan^{-1}\\frac{imaginary}{real}\\]"+"\\[Argument =tan^{-1}\\frac{"+x.imaginary+"}{"+x.real+"}=tan^{-1}"+(x.imaginary/x.real).toFixed(3)+"\\]";
      explain+="\\[Argument ="+ans+"\\space radians\\]";
      document.getElementById('comresult').innerHTML="Argument is &nbsp;" + ans + "&nbsp; radians";
      document.getElementById('comexplain').innerHTML=explain;
      renderMathInElement(document.getElementById("comexplain"));
  }
  function conj(){
      var x = new Complex(document.getElementById('creal').value,document.getElementById('cimg').value);
      x.imaginary=x.imaginary*-1;
      let explain;
      if(x.imaginary>=0){
          explain="\\[Conjugate = real\\space+ \\space(-1)*imaginary \\]"+"\\[Conjugate = "+x.real +"+"+x.imaginary+" i\\]";
          document.getElementById('comresult').innerHTML="Conjugate is &nbsp;" + x.real + "&nbsp; +" + x.imaginary + "i"
      }
      else{
          explain="\\[Conjugate = real\\space+ \\space(-1)*imaginary \\]"+"\\[Conjugate = "+x.real+"\\space"+ x.imaginary+" i\\]";
          document.getElementById('comresult').innerHTML="Conjugate is &nbsp;" + x.real + "&nbsp; " + x.imaginary + "i";
      }
      document.getElementById('comexplain').innerHTML=explain;
      renderMathInElement(document.getElementById("comexplain"));   
  }
  
  function volofsphere() {
      var x = document.getElementById("chngsidesphere").value;
      var per = Math.pow(x, 3) / 10000 + 3 * x + (3 * Math.pow(x, 2)) / 100;
      if (x!=""){
          document.getElementById("sphereAns").innerHTML = "\\[Percentage \\space increase \\space in \\space the \\space volume \\space of \\space the \\space sphere \\space is \\space\\]";
          document.getElementById("sphereAns1").innerHTML = "\\[\\frac{(change \\space in \\space radius)^3}{10000} + 3\\times (change \\space in \\space radius) + \\frac{(3 \\times (change \\space in \\space radius)^2)}{100}\\]";
          document.getElementById("sphereAns2").innerHTML = "\\[\\frac{"+x+"^3}{10000} + 3\\times "+x+" + \\frac{(3 \\times "+x+"^2)}{100}\\]";
          document.getElementById("sphereAns3").innerHTML = "\\[ "+(Math.pow(x, 3) / 10000).toFixed(2)+" + "+(3 * x).toFixed(2)+" + "+((3 * Math.pow(x, 2)) / 100).toFixed(2)+" \\space = \\space "+per.toFixed(3)+" \\% \\]";
          } else{
              document.getElementById("sphereAns").innerHTML = "";
              document.getElementById("sphereAns1").innerHTML = "\\[Enter \\space all \\space values\\]";
              document.getElementById("sphereAns2").innerHTML = "";
              document.getElementById("sphereAns3").innerHTML = "";}
          renderMathInElement(document.getElementById("sphereAns"));
          renderMathInElement(document.getElementById("sphereAns1"));
          renderMathInElement(document.getElementById("sphereAns2"));
          renderMathInElement(document.getElementById("sphereAns3"));
  }
  
  function sqr_rt(){
      let explain="\\[From\\space De\\space Moivre's\\space Formula,\\space z^n=(r^n)(cos(n\\theta)+i \\space sin(n\\theta))\\]"+"\\[So,\\space \\sqrt{z}=\\sqrt{r}(cos(\\frac{\\theta}{2})+i \\space sin(\\frac{\\theta}{2}))\\]"
      explain+="\\[where, \\space r=\\sqrt{real^2+imaginary^2} \\space\\space , \\space \\space \\theta=tan^{-1}\\frac{imaginary}{real}\\]";
      var x = new Complex(document.getElementById('creal').value,document.getElementById('cimg').value);
      var deg=Math.atan(x.imaginary/x.real).toFixed(3);
      var r=Math.sqrt(x.real*x.real + x.imaginary*x.imaginary).toFixed(3);
      explain+="\\[r=\\sqrt{("+x.real+")^2+("+x.imaginary+")^2}="+r+"\\space \\space , \\space \\space \\theta=tan^{-1}\\frac{"+x.imaginary+"}{"+x.real+"}="+deg+"\\]";
      r=Math.sqrt(r).toFixed(3);
      var s = Math.sin(deg/2).toFixed(3);
      var c = Math.cos(deg/2).toFixed(3);
      var rePart = r*c;
      var imPart = r*s;
      if(x.imaginary>=0){
          document.getElementById('comresult').innerHTML="Square root is &nbsp;" + rePart.toFixed(3) + "&nbsp; + " + imPart.toFixed(3) + "i";
          explain+="\\[\\sqrt{"+x.real+"+"+x.imaginary+"i \\space}="+r+"(cos("+deg/2+")+i \\space sin("+deg/2+"))="+r+"("+c+"+"+s+"i)\\]";
          explain+="\\[\\sqrt{"+x.real+"+"+x.imaginary+"i \\space}="+rePart.toFixed(3)+"+"+imPart.toFixed(3)+"i\\]";
      }
      else{
          document.getElementById('comresult').innerHTML="Square root is &nbsp;" + rePart.toFixed(3) + "&nbsp; " + imPart.toFixed(3) + "i";
          explain+="\\[\\sqrt{"+x.real+"+"+x.imaginary+"i \\space}="+r+"(cos("+deg/2+")+i \\space sin("+deg/2+"))="+r+"("+c+s+"i)\\]";
          explain+="\\[\\sqrt{"+x.real+"+"+x.imaginary+"i \\space}="+rePart.toFixed(3)+imPart.toFixed(3)+"i\\]";
      }
      document.getElementById('comexplain').innerHTML=explain;
      renderMathInElement(document.getElementById("comexplain"));
  }
  function err1() {
      katex.render("Invalid!", document.getElementById('comresult'), {
          throwOnError: false
      });
  }
  function comOp(value) {
      if (value == "Magnitude") {
          mag();
      } 
      else if (value == "Argument") {
          arg();
      }else if (value == "Conjugate") {
          conj();
      } else if( value == "SquareRoot"){
          sqr_rt();
      }
      else {
          err1();
      }
  }
  
  function volofcuboid() {
      var l = document.getElementById("chnglengthcuboid").value;
      var b = document.getElementById("chngbreadthcuboid").value;
      var h = document.getElementById("chngheightcuboid").value;
      var percentInc = ((1 + (l / 100)) * (1 + (b / 100)) * (1 + (h / 100)) -1 ) * 100;
      if (l!="" && b!="" && h!=""){
      document.getElementById("cuboidAns").innerHTML = "\\[Percentage \\space increase \\space in \\space the \\space volume \\space of \\space the \\space cuboid \\space is \\space\\]";
      document.getElementById("cuboidAns1").innerHTML = "\\[((1 + \\frac{Change \\space in \\space length}{100}) \\times (1 + \\frac{Change \\space in \\space breadth}{100}) \\times (1 + \\frac{Change \\space in \\space height}{100}) -1 ) \\times 100\\]";
      document.getElementById("cuboidAns2").innerHTML = "\\[((1 + \\frac{"+l+"}{100}) \\times (1 + \\frac{"+b+"}{100}) \\times (1 + \\frac{"+h+"}{100}) -1 ) \\times 100\\]";
      document.getElementById("cuboidAns3").innerHTML = "\\[("+(1 + (l / 100)).toFixed(2)+" \\times "+(1 + (b / 100)).toFixed(2)+" \\times "+(1 + (h / 100)).toFixed(2)+"-1 ) \\times 100 \\space = \\space "+percentInc.toFixed(3)+" \\% \\]";
      } else{
          document.getElementById("cuboidAns").innerHTML = "";
          document.getElementById("cuboidAns1").innerHTML = "\\[Enter \\space all \\space values\\]";
          document.getElementById("cuboidAns2").innerHTML = "";
          document.getElementById("cuboidAns3").innerHTML = "";
      }
      renderMathInElement(document.getElementById("cuboidAns"));
      renderMathInElement(document.getElementById("cuboidAns1"));
      renderMathInElement(document.getElementById("cuboidAns2"));
      renderMathInElement(document.getElementById("cuboidAns3"));
  }
  
  function euler(){
    let explain="\\[Euler \\space Form \\space =re^{i\\theta}\\]";
    explain+="\\[where, \\space r=\\sqrt{real^2+imaginary^2} \\space\\space , \\space \\space \\theta=tan^{-1}\\frac{imaginary}{real}\\]";
    var r = parseInt(document.getElementById("cpereal").value);
    var i = parseInt(document.getElementById("cpeimg").value);
    var result= document.getElementById("comperesult");
    if(!isNaN(r) && (!isNaN(i))){
          var x = (Math.sqrt((r*r)+(i*i)));
          var x1;
          if(!Number.isInteger(x)){
              var j = (r*r)+(i*i);
              x = "&#8730;  "+ j ;
          } explain+="\\[r=\\sqrt{("+r+")^2+("+i+")^2}="+x+"\\]";
          var y = nerdamer((Math.atan(i/r))/3.141592653589793).evaluate();
          explain+="\\[\\theta=tan^{-1}\\frac{"+i+"}{"+r+"}\\space radians=";
          if(y<0) {   
              y=nerdamer((-1)*y).toString();
              x1=x+"e^{-iπ"+y+"}";
              x=x+"e<sup>-iπ"+y+"</sup>";
              explain+="-π" +y+"\\]";
          } else{
              y=y.toString();
              x1=x+"e^{iπ"+y+"}";
          x=x+"e<sup>iπ"+y+"</sup>";
          explain+="π" +y+"\\]";
          } result.innerHTML = x;
          explain+="\\[Euler \\space Form \\space ="+x1+"\\]";
          document.getElementById('compeexplain').innerHTML=explain;
      } else{
          document.getElementById('compeexplain').innerHTML= "\\[Please \\space enter \\space valid \\space input\\]";
          result.innerHTML = "";
      } renderMathInElement(document.getElementById("compeexplain"));
  }
  
  function npower()
  {
    
    var r = parseFloat(document.getElementById("cpnreal").value);
    var i = parseFloat(document.getElementById("cpnimg").value);
    var n = parseInt(document.getElementById("cpnpow").value);
    var x = (Math.sqrt((r*r)+(i*i))).toFixed(3);
    let result="";
    let explain="\\[1.Find \\space magnitude \\space and \\space Argument\\]";
    explain+="\\[magnitude=\\sqrt{("+r+")^2+("+i+")^2}="+x+"\\]";
    var y = Math.atan(i/r);
    explain+="\\[argument(\\theta)=tan^{-1}\\frac{"+i+"}{"+r+"}\\space radians=";
    if(i>=0)
      result="\\[("+r+"+"+i+"i)^"+n;
    else
      result="\\[("+r+i+"i)^"+n; 
  
    if(r>0 && i<0)
       y=y+6.28319;
    else if(r<0 && i>0)
       y=y+3.14159  
    y=y.toFixed(3);   
    
    explain+=y+"radians\\]";
    explain+="\\[2.By \\space De  \\space Moivre's  \\space Theorem,\\space z^n=(r^n)(cos(n\\theta)+i \\space sin(n\\theta))\\]";
    explain+="\\[("+r+"+"+y+"i)^"+n+"=("+x+")^"+n+"(cos("+n+"\\times"+y+")+isin("+n+"\\times"+y+"))\\]";
    x=Math.pow(x,n).toFixed(3);
    y=(y*n).toFixed(3);
    
    explain+="\\[\\space \\space \\space ="+x+"(cos("+y+")+isin("+y+"))\\]";
    r=(x*Math.cos(y)).toFixed(3);
    i=(x*Math.sin(y)).toFixed(3);
    
    if(i>=0){
      result+="="+r+"+"+i+"i\\]";
      explain+="\\[\\space \\space \\space ="+r+"+"+i+"i\\]";
    }
      
    else{
      result+="="+r+i+"i\\]";
      explain+="\\[\\space \\space \\space ="+r+i+"i\\]";
    }
      
    document.getElementById("compnthresult").innerHTML=result;;
    document.getElementById('compnthexplain').innerHTML=explain;
    renderMathInElement(document.getElementById("compnthresult"));
    renderMathInElement(document.getElementById("compnthexplain"));
  }
  
  function display_devi(){
      var x = document.getElementById('deviation');
      if (x.style.display === 'none') {
      x.style.display = 'block';
    } else {
      x.style.display = 'none';
    }
   } 
  
  function samvar()
  {
     var num = document.getElementById('stdinp').value;
      
      valid=/^([-]{0,1}\d{1,}[\.]{0,1}\d{0,}[ ]?)*$/
  
  
      if(num=="")
      {
         document.getElementById('std-var-rslt').innerHTML = "Please enter number";
      }
      else if(!valid.test(num))
      {
          document.getElementById('std-var-rslt').innerHTML = "Enter space separated numbers. Use of alphabets and special character is not allowed for calculation purpose";
      }
      else
      {
          var outputstring="";
          num=num.trim();
          num = num.split(" ");
          var len=parseInt(num.length);
         
          var number=[]
          for (var i = 0; i < len; i++) {
              number[i] = parseFloat(num[i].trim());
          }
  
          var sum=0;
  
  
          for (i = 0; i < len; i++) {
             sum+=number[i];
          }
  
          var meanrzlt= sum/len;
           var varrzlt=0;
          for (i = 0; i < len; i++) {
              varrzlt = varrzlt + ((number[i])-meanrzlt)*((number[i])-meanrzlt);
          }
  
          varrzlt = varrzlt/(len-1);
   var conint;
   var sampstddev=Math.sqrt(varrzlt);
   var q=Math.sqrt(len)
  conint= sampstddev/q;
    
        
          
         var outputstring=""
         var text="x̄";
         var text2="2";
      outputstring+="Count of inputs: "+len+"<br>";
          outputstring+="Sum(Σx): "+sum+"<br>";
          outputstring+="Mean(μ): "+meanrzlt+"<br>";
          outputstring+="Variance(σ"+text2.sub()+"): "+varrzlt+"<br>";
          outputstring+="Sample Standard Deviation: "+sampstddev+" <p>&nbsp;</p>";
          outputstring+="Confidence Interval(s" +text.sub()+"): "+conint+"<br>";
       document.getElementById('std-var-rslt').innerHTML = outputstring;
  }
  }
  
  function popvar()
  {
         var num = document.getElementById('stdinp').value;
      
      valid=/^([-]{0,1}\d{1,}[\.]{0,1}\d{0,}[ ]?)*$/
  
  
      if(num=="")
      {
         document.getElementById('std-var-rslt').innerHTML = "Please enter number";
      }
      else if(!valid.test(num))
      {
          document.getElementById('std-var-rslt').innerHTML = "Enter space separated numbers. Use of alphabets and special character is not allowed for calculation purpose";
      }
      else
      {
          var outputstring="";
          var text="x̄";
          var text2="2";
          num=num.trim();
          num = num.split(" ");
          var len=parseInt(num.length);
         
          var number=[]
          for (var i = 0; i < len; i++) {
              number[i] = parseFloat(num[i].trim());
          }
  
          var sum=0;
  
  
          for (i = 0; i < len; i++) {
             sum+=number[i];
          }
  
          var meanrzlt= sum/len;
           var varrzlt=0;
          for (i = 0; i < len; i++) {
              varrzlt = varrzlt + ((number[i])-meanrzlt)*((number[i])-meanrzlt);
          }
          var conint;
          varrzlt = varrzlt/len;
  
         var sampstddev=Math.sqrt(varrzlt);
         var q=Math.sqrt(len)
          conint= sampstddev/q;
         var outputstring=""
  
      outputstring+="Count of inputs: "+len+"<br>";
          outputstring+="Sum(Σx): "+sum+"<br>";
          outputstring+="Mean(μ): "+meanrzlt+"<br>";
          outputstring+="Variance(σ"+text2.sub()+"): "+varrzlt+"<br>";
          outputstring+="Population Standard Deviation: "+sampstddev+" <p>&nbsp;</p>";
          outputstring+="Confidence Interval(s" +text.sub()+"): "+conint+"<br>";
  
  
       document.getElementById('std-var-rslt').innerHTML = outputstring;
  }
  }
  function hydrocal()
  {
      var a=document.getElementById("dept").value;
      var b=document.getElementById("dens").value;
      var ans="";
      if(a===""||b=="")
      {
          ans="Please enter all the values to obtain answer";
      }
      else{
          var prs=b*9.80655*a+1;
          document.getElementById("hydroans1").innerHTML="\\[p \\space = \\space ρ \\space \\times g \\times h \\space + \\space p0\\]";
          document.getElementById("hydroans2").innerHTML="\\[p \\space = \\space "+b+" \\space \\times 9.806 \\times "+a+" \\space + 1.013 \\space \\]";
          document.getElementById("hydroans3").innerHTML="\\[p \\space = "+(b*9.80655*a).toFixed(3)+" \\space + \\space 1.013 = \\space "+prs.toFixed(3)+"\\]";
          renderMathInElement(document.getElementById("hydroans1"));
          renderMathInElement(document.getElementById("hydroans2"));
          renderMathInElement(document.getElementById("hydroans3"));
          document.getElementById("hydroans4").innerHTML="\\[Your \\space answer \\space is \\space : \\space "+prs.toFixed(3)+" \\space atm\\]";
          renderMathInElement(document.getElementById("hydroans4"));
          ans="Our hydrostatic pressure calculator uses the below hydrostatic pressure formula <br>    p = ρ * g * h + p0 where <br>  p is the hydrostatic pressure, ρ is the density of fluid,<br>  g is the gravitational acceleration (the average value for the Earth is g = 9.80655 m/s²), <br>   h is the depth,<br> p0 is the external pressure (usually atmospheric pressure p0 = 1 atm = 1013.25 hPa).";
      
          }
          document.getElementById("hydroans").innerHTML=ans;
  }
  
  function straincal()
  {
      var a=document.getElementById("chnln").value;
      var b=document.getElementById("orln").value;
      var c=document.getElementById("orunit").value;
      var d=document.getElementById("chunit").value;
      var ans="";
      if(a==""||b=="")
      {
          ans="Please enter all the values to obtain answer";
      }
      else{
      if(c==='inch')
      {
          b=b*2.54;
      }
      else if(c==="mm")
      {
          b=b/10;
      }
      else if(c==="m")
      {
          b=b*100;
      }
      else if(c==="µm")
      {
          b=b/10000;
      }
  
      if(d==='inch')
      {
          a=a*2.54;
      }
      else if(d==="mm")
      {
          a=a/10;
      }
      else if(d==="m")
      {
          a=a*100;
      }
      else if(d==="µm")
      {
          a=a/10000;
      }
  
      var strain=a/b;
      ans="The calculated Strain(S) is: "+strain+"<br> <br> <br>";
      ans+="Strain is a measure of a materials dimensions due to a load deformation. It takes the initial length and the extension of that length due to the load and creates a ratio of the two.<br>  ε= Δl/l<br> Where: <br>   ε = Strain<br>Δl = Change in length<br>l = Length"
     
  }
  document.getElementById("strainans").innerHTML= ans;
  
  }
  
  function stresscalc()
  {
      var b=document.getElementById("area").value;
      var a=document.getElementById("strforce").value;
      var c=document.getElementById("aunit").value;
      var d=document.getElementById("funit").value;
      var ans="";
      if(a==""||b=="")
      {
          ans="Please enter all the values to obtain answer";
      }
      else{
      if(c==='inch')
      {
          b=b/1550;
      }
      else if(c==="mm")
      {
          b=b/1000000;
      }
      else if(c==="cm")
      {
          b=b/10000;
      }
      else if(c==="ft")
      {
          b=b/10.764;
      }
  
      if(d==='gn')
      {
          a=a*1000000000;
      }
      else if(d==="kn")
      {
          a=a*1000;
      }
      else if(d==="mn")
      {
          a=a*1000000;
      }
  
      var stress=a/b;
      ans="The calculated Stress is: "+stress +" Pa"+"<br> <br> <br>";
  
      ans+="Stress is defined as “The restoring force per unit area of the material”. It is a tensor quantity. Denoted by Greek letter σ. Measured using Pascal or N/m2. Mathematically expressed as <br>    σ=F/A Where, <br>    F is the restoring force measured in Newton or N. <b>    A is the area of cross-section measured in m2. <br>    σ is the stress measured using N/m2 or Pa. <br>"
  }
  document.getElementById("stressans").innerHTML=ans;
      
  }
  
  function factorial(n){
      let answer = 1;
      if (n == 0 || n == 1){
        return answer;
      }else{
        for(var i = n; i >= 1; i--){
          answer = answer * i;
        }
        return answer;
      }  
    }
    
    // HP starts
    function calcexhp(){
      var a = document.getElementById("firstTerm");
      var d = document.getElementById("diff");
      var n = document.getElementById("noofTerms");
  
      a.value = 1;
      d.value = 3;
      n.value = 5;
  
      hp();
    }
    function hp() {
      var a = document.getElementById("firstTerm").value;
      var d = document.getElementById("diff").value;
      var n = document.getElementById("noofTerms").value;
      var printseries = document.getElementById("printHPseries");
      var printemp = "";
      var num = (Math.log(2*a + (2*n-1)*d)/(2*a-d));
      var num1 = num/d;
      if(a == "" || d == "" || n == ""){
          printemp += "\\[Please \\space enter \\space all \\space fields \\]";
          printseries.innerHTML = printemp;
          renderMathInElement(printseries);
      }
     else if (!isNaN(parseInt(n)) || !isNaN(parseInt(a)) || !isNaN(parseInt(d))) {
              printemp += "\\[Sum \\space of \\space Nterms \\space of \\space HP \\space = \\space \\frac{1}{d} ln \\frac{2a+(2n-1)d}{2a-d} \\]";
              printemp += "\\[S_n \\space = \\space \\frac{1}{" + d + "} ln \\frac{2*" + a + "+(2*" + n + "- 1)" + d + "}{2*" + a + "-" + d + "} \\]";
              printemp += "\\[S_n \\space = \\space \\frac{1}{" + d + "} ln (" + (num).toFixed(3) + ")\\]";
              printemp += "\\[S_n \\space = \\space " + (num1).toFixed(3) + "\\]";
              printseries.innerHTML = printemp;
              renderMathInElement(printseries);
        }
        else
        {
          printemp += "\\[Enter \\space numbers \\space only. \\space Blank \\space inputs \\space are \\space not \\space allowed \\]";
          printseries.innerHTML = printemp;
          renderMathInElement(printseries);
        }
  }
  // HP ends
  
  function bpcal(op)
  {
      let a=document.getElementById("psuc").value;
      let b=document.getElementById("suc").value;
      let c=document.getElementById("tri").value;
      let ans="";
  
     
      if(a==""||b==""||c=="")
      {
          ans="Input Error: Please enter all the values to obtain required answer";
      }
      else if(a>1)
      {
          ans="Input Error: Probability can't be greater than 1";
      }
      else if(b<c)
      {
          ans="Input Error: Successful events can't be greater than total number of trials.";
      }
     
      else{
          if(op===1){
              let pmf= factorial(c) / (factorial(b) * factorial(c-b));            
              let n=Math.pow(a,b);
              let s=1-a, t=c-b;
              let m=Math.pow(s,t);
              pmf=pmf*n*m;
              pmf=pmf.toPrecision(5)
              ans="The PMF is: " +pmf;
          }
          else if(op===2){
              let mean= c*a;          
              ans="The Mean is: " + mean;
          }
          else{
              let variance = a*b*c;
              ans="The Variance is: " + variance;
  
          }
      }
      document.getElementById("bpans").innerHTML=ans;
  
  
  }
  
  function stresscalc()
  {
      var b=document.getElementById("area").value;
      var a=document.getElementById("strforce").value;
      var c=document.getElementById("aunit").value;
      var d=document.getElementById("funit").value;
      var ans="";
      if(a==""||b=="")
      {
          ans="Please enter all the values to obtain answer";
      }
      else{
      if(c==='inch')
      {
          b=b/1550;
      }
      else if(c==="mm")
      {
          b=b/1000000;
      }
      else if(c==="cm")
      {
          b=b/10000;
      }
      else if(c==="ft")
      {
          b=b/10.764;
      }
  
      if(d==='gn')
      {
          a=a*1000000000;
      }
      else if(d==="kn")
      {
          a=a*1000;
      }
      else if(d==="mn")
      {
          a=a*1000000;
      }
  
      var stress=a/b;
      ans="The calculated Stress is: "+stress +" Pa"+"<br> <br> <br>";
  
      ans+="Stress is defined as “The restoring force per unit area of the material”. It is a tensor quantity. Denoted by Greek letter σ. Measured using Pascal or N/m2. Mathematically expressed as <br>    σ=F/A Where, <br>    F is the restoring force measured in Newton or N. <b>    A is the area of cross-section measured in m2. <br>    σ is the stress measured using N/m2 or Pa. <br>"
  }
  document.getElementById("stressans").innerHTML=ans;  
  }
  
  function arcal() {
        var a=document.getElementById("ang12").value;
        var b=document.getElementById("rad").value;
        var y=document.getElementById("radit").value;
        var d=document.getElementById("angit").value;
        if(a == "" || b == "") {
          document.getElementById("arcans1").innerHTML ="\\[Error: \\space All \\space values \\space are \\space required \\space to \\space obtain \\space answer\\]";
          renderMathInElement(document.getElementById("arcans1"));
          document.getElementById("arcans2").innerHTML = ""; document.getElementById("arcans3").innerHTML = ""; document.getElementById("arcans4").innerHTML = ""; 
          document.getElementById("arcans5").innerHTML = ""; document.getElementById("arcans6").innerHTML = ""; return;
          } else {
          if(d=="degree") {
              b/=57.296;
              document.getElementById("arcans1").innerHTML = "\\[\\frac{\\theta \\space (degree)}{57.296} \\space = "+b.toFixed(2)+" \\space (radian)\\]";
              renderMathInElement(document.getElementById("arcans1")); } else{ document.getElementById("arcans1").innerHTML = ""; }
          var c= a*b;
          document.getElementById("arcans2").innerHTML = "\\[Arc \\space length = \\space "+a+" \\times "+b.toFixed(2)+" = \\space "+c.toFixed(3)+" \\space m\\]";
          renderMathInElement(document.getElementById("arcans2"));
          if(y=="cm") {
              c=c/100;
              document.getElementById("arcans3").innerHTML = "\\[\\frac{Arc \\space length \\space (m)}{100} = \\space "+c.toFixed(3)+" \\space cm\\]";
              renderMathInElement(document.getElementById("arcans3"));
              document.getElementById("arcans4").innerHTML = ""; document.getElementById("arcans5").innerHTML = "";
          } else if(y=="mm") {
              c=c/1000;
              document.getElementById("arcans4").innerHTML = "\\[\\frac{Arc \\space length \\space (m)}{1000} = \\space "+c.toFixed(3)+" \\space mm\\]";
              renderMathInElement(document.getElementById("arcans4"));
              document.getElementById("arcans3").innerHTML = ""; document.getElementById("arcans5").innerHTML = "";
          } else if(y=="inch") {
                c=c/0.0254;
                  document.getElementById("arcans5").innerHTML = "\\[\\frac{Arc \\space length \\space (m)}{0.0254} = \\space "+c.toFixed(3)+" \\space inch\\]";
                  renderMathInElement(document.getElementById("arcans5"));
                  document.getElementById("arcans4").innerHTML = ""; document.getElementById("arcans3").innerHTML = "";
          } else{
              document.getElementById("arcans3").innerHTML = ""; document.getElementById("arcans4").innerHTML = ""; document.getElementById("arcans5").innerHTML = "";}
          document.getElementById("arcans6").innerHTML ="\\[The \\space Arc \\space length \\space is: \\space "+c.toFixed(3)+" \\space "+y+"\\]";
          renderMathInElement(document.getElementById("arcans6"));}
  }
  
  function cresccal() {
      var r1 = document.getElementById("cresc_rad1").value;
      var r2 = document.getElementById("cresc_rad2").value;
      var d = document.getElementById("cresc_dist").value;
      if (r1 == "" || r2 == "" || d == "") {
          document.getElementById("crescans1").innerHTML = "\\[Error: \\space All \\space values \\space are \\space required \\space to \\space obtain \\space answer \\space\\]";
          document.getElementById("crescans2").innerHTML =""; document.getElementById("crescans3").innerHTML = ""; renderMathInElement(document.getElementById("crescans1"));
      } else {
          if (!isNaN(Math.acos((r2 ** 2 - r1 ** 2 - d ** 2) / (2 * r1 * d))) && !isNaN(Math.acos((r2 ** 2 + d ** 2 - r1 ** 2) / (2 * r2 * d))) ){ 
              var lune1 = Math.trunc(2 * (Math.sqrt((r1 + r2 + d) * (r2 + d - r1) * (d + r1 - r2) * (r1 + r2 - d)) / 4) + r1 ** 2 * Math.acos((r2 ** 2 - r1 ** 2 - d ** 2) / (2 * r1 * d)) - r2 ** 2 * Math.acos((r2 ** 2 + d ** 2 - r1 ** 2) / (2 * r2 * d)));
              var op = Math.trunc(Math.PI * r1 ** 2 - lune1);
              var lune2 = Math.trunc(Math.PI * r2 ** 2 - op);
              document.getElementById("crescans1").innerHTML = "\\[r1 = Radius \\space of \\space circle \\space 1 \\space = \\space "+r1+" \\newline r2 = Radius \\space of \\space circle \\space 2 \\space = \\space "+r2+" \\newline d = Circle \\space center \\space distance \\space = \\space "+d+"\\]";
              document.getElementById("crescans2").innerHTML = "\\[Area \\space of \\space Lune \\space 1: \\newline 2 \\times \\frac{\\sqrt{(r1 + r2 + d) \\times (r2 + d - r1) \\times (d + r1 - r2) \\times (r1 + r2 - d)} }{4} + \\newline r1^2 \\times acos(\\frac{(r2^2 - r1^2 - d^2)}{(2^r1 \\times d)}) - r2^2 \\times acos(\\frac{(r2^2 + d^2 - r1^2)}{ (2 \\times r2 \\times d)})\\]";
              document.getElementById("crescans3").innerHTML =  "\\[2 \\times \\frac{\\sqrt{("+r1+" + "+r2+" + "+d+") \\times ("+r2+" + "+d+" - "+r1+") \\times ("+d+" + "+r1+" - "+r2+") \\times ("+r1+" + "+r2+" - "+d+")} }{4} + \\newline "+r1+"^2 \\times acos(\\frac{("+r2+"^2 - "+r1+"^2 - "+d+"^2)}{(2^"+r1+" \\times "+d+")}) - "+r2+"^2 \\times acos(\\frac{("+r2+"^2 + "+d+"^2 - "+r1+"^2)}{ (2 \\times "+r2+" \\times "+d+")}) \\space   = \\space "+ lune1.toFixed(3)+"\\]";
              document.getElementById("crescans5").innerHTML ="\\[Overlap \\space Area: \\space \\newline \\pi \\times r1^2 - (Area \\space of \\space Lune \\space 1) \\newline "+(math.pi).toFixed(2)+" \\times "+r1+"^2 - ("+lune1.toFixed(2)+") \\space = \\space "+op.toFixed(3)+"\\]";
              document.getElementById("crescans6").innerHTML = "\\[ Area \\space of \\space Lune \\space 2:  \\space \\newline \\pi \\times r1^2 - (Overlap \\space Area) \\newline "+(math.pi).toFixed(2)+" \\times "+r2+"^2 - ("+op.toFixed(2)+") \\space = \\space "+lune2.toFixed(3)+"\\]";
              renderMathInElement(document.getElementById("crescans1")); renderMathInElement(document.getElementById("crescans2"));
              renderMathInElement(document.getElementById("crescans3")); renderMathInElement(document.getElementById("crescans5")); renderMathInElement(document.getElementById("crescans6"));
          } else{
              document.getElementById("crescans1").innerHTML  = "Error: Enter proper values";
              document.getElementById("crescans2").innerHTML = ""; document.getElementById("crescans3").innerHTML = ""; }
      }
  }
  
  function ssqcal()
  {
      var num=document.getElementById("ssq").value;
      valid=/^([-]{0,1}\d{1,}[\.]{0,1}\d{0,}[ ]?)*$/;
      var s="";
      if(num=="")
      {
         s= "Please enter number";
      }
      else if(!valid.test(num))
      {
          s= "Enter space separated numbers. Use of alphabets and special character is not allowed for calculation purpose";
      }
      else{
      num=num.trim();
      num = num.split(" ");
      var len=parseInt(num.length);
     
      var number=[]
      for (var i = 0; i < len; i++) {
          number[i] = parseFloat(num[i].trim());
      }
  
      var sum=0;
   
      for (i = 0; i < len; i++) {
          console.log(number[i]);
       }
  
      for (i = 0; i < len; i++) {
         sum=sum+(number[i]**2);
      }
      s="Your answer is: "+sum;
      }
  
      document.getElementById("ssqans").innerHTML=s;
  
  
  }
  
  function sspncal()
  {
      var num=document.getElementById("sspn").value;
      num = parseInt(num);
      valid=/^([-]{0,1}\d{1,}[\.]{0,1}\d{0,}[ ]?)*$/;
      var poweroutput = document.getElementById("sspnans");
      var powertemp="";
       if(!valid.test(num))
      {
          powertemp += "\\[Enter \\space any \\space numbers. \\space Use \\space of \\space alphabets \\space and \\space special \\space character \\space is \\space not \\space allowed \\space for \\space calculation \\space purpose \\]";
          poweroutput.innerHTML = powertemp;
          renderMathInElement(poweroutput);
      }
      else if(num<1){
          powertemp += "\\[Natural \\space Numbers \\space cannot \\space be \\space negative \\]";
          poweroutput.innerHTML = powertemp;
          renderMathInElement(poweroutput);
      }
      else{
          var powersum=Math.trunc((num*(num+1)*(2*num+1)*(3*(num**2)+(3*num)-1)));
          var powersum1 = powersum/30;
          powertemp += "\\[Sum \\space of \\space the \\space Power \\space Four \\space of \\space the \\space First \\space n \\space Natural \\space Numbers \\space is \\]";
          powertemp += "\\[ \\sum {n}^4 \\space = \\space \\frac{n(n+1)(2n+1)(3n^2+3n-1)}{30}  \\]";
          powertemp += "\\[\\sum {n}^4 \\space = \\space \\frac{" + num + "(" + num + " + 1)(2 \\times" + num + "+ 1)(3 \\times" + num + "^2 + (3 \\times" + num + ")-1)}{30} \\]";
          powertemp += "\\[\\sum {n}^4 \\space = \\space \\frac{" + num + "\\times" + (num+1) + "\\times" + ((2*num)+1) + " \\times " + (3*(num**2)+(3*num)-1) + "}{30}  \\]";
          powertemp += "\\[\\sum {n}^4 \\space = \\space \\frac{" + powersum + "}{30} \\]";
          powertemp += "\\[\\sum {n}^4 \\space = \\space " + powersum1 + "\\]";
          poweroutput.innerHTML = powertemp;
          renderMathInElement(poweroutput);
      }
  
  }
  
  function ssfncal(){
      var num=document.getElementById("ssfn").value;
      num = parseInt(num);
      valid=/^([-]{0,1}\d{1,}[\.]{0,1}\d{0,}[ ]?)*$/;
      var poweroutput = document.getElementById("ssfnans");
      var powertemp="";
      if(!valid.test(num))
      {
          powertemp += "\\[Enter \\space any \\space numbers. \\space Use \\space of \\space alphabets \\space and \\space special \\space character \\space is \\space not \\space allowed \\space for \\space calculation \\space purpose \\]";
          poweroutput.innerHTML = powertemp;
          renderMathInElement(poweroutput);
      }
      else if(num<1){
          powertemp += "\\[Natural \\space Numbers \\space cannot \\space be \\space negative \\]";
          poweroutput.innerHTML = powertemp;
          renderMathInElement(poweroutput);
      } 
      else{
          var powersum=Math.trunc(( (num)**2 * (num + 1)**2 * (2 * num**2 + 2 * num - 1)  ));
          var powersum1 = powersum/12;
          powertemp += "\\[Sum \\space of \\space the \\space Power \\space Five \\space of \\space the \\space First \\space n \\space Natural \\space Numbers \\space is \\]";
          powertemp += "\\[ \\sum {n}^5 \\space = \\space \\frac{n^2 (n+1)^2 (2n^2 + 2n -1 )}{12}  \\]";
          powertemp += "\\[ \\sum {"+num+"}^5 \\space = \\space \\frac{"+num+"^2 \\times ("+num+"+1)^2 \\times (2 \\times "+num+"^2 + 2 \\times "+num+" \\space - \\space 1 )}{12}  \\]";
          powertemp += "\\[ \\sum {"+num+"}^5 \\space = \\space \\frac{"+(num**2)+" \\times "+(num +1)+"^2 \\times (2 \\times "+(num**2)+" + 2 \\times "+num+" \\space - \\space 1 )}{12}  \\]";
          powertemp += "\\[ \\sum {"+num+"}^5 \\space = \\space \\frac{"+powersum+"}{12}  \\]";
          powertemp += "\\[ \\sum {"+num+"}^5 \\space = \\space "+powersum1.toFixed(2)+" \\]";
          poweroutput.innerHTML = powertemp;
          renderMathInElement(poweroutput);
      }
  }
  
  function ssqncal()
  {
      var num=document.getElementById("ssqn").value;
      num = parseInt(num);
      valid=/^([-]{0,1}\d{1,}[\.]{0,1}\d{0,}[ ]?)*$/;
      var soutput = document.getElementById("ssqnans");
      var s="";
      if(num=="")
      {
         s += "\\[Please \\space enter \\space number \\]";
         soutput.innerHTML = s;
         renderMathInElement(soutput);
      }
      else if(!valid.test(num))
      {
          s += "\\[Enter \\space space \\space separated \\space numbers. \\space Use \\space of \\space alphabets \\space and \\space special \\space character \\space is \\space not \\space allowed \\space for \\space calculation \\space purpose \\]";
          soutput.innerHTML = s;
          renderMathInElement(soutput);
      }
      else if(num<1){
          s += "\\[Natural \\space Numbers \\space cannot \\space be \\space negative \\]";
          soutput.innerHTML = s;
          renderMathInElement(soutput);
      }
      else{
          var sum=Math.trunc((num*(num+1)*(2*num+1)));
          var sum1 = sum/6;
          s += "\\[Sum \\space of \\space the \\space Squares \\space of \\space the \\space First \\space n \\space Natural \\space Numbers \\space is \\]";
          s += "\\[ \\sum {n}^2 \\space = \\space \\frac{n(n+1)(2n+1)}{6}  \\]";
          s += "\\[\\sum {n}^2 \\space = \\space \\frac{" + num + "(" + num + " + 1)(2 \\times" + num + "+ 1)}{6} \\]";
          s += "\\[\\sum {n}^2 \\space = \\space \\frac{" + num + "\\times" + (num+1) + "\\times" + ((2*num)+1) + "}{6} \\]";
          s += "\\[\\sum {n}^2 \\space = \\space \\frac{" + sum + "}{6} \\]";
          s += "\\[\\sum {n}^2 \\space = \\space " + sum1 + "\\]";
          soutput.innerHTML = s;
          renderMathInElement(soutput);
      }
  
  }
  
  function scbncal()
  {
      var num=document.getElementById("scbn").value;
      num = parseInt(num);
      valid=/^([-]{0,1}\d{1,}[\.]{0,1}\d{0,}[ ]?)*$/;
      var soutput3 = document.getElementById("scbnans");
      var stemp="";
      if(num=="")
      {
          stemp += "\\[Please \\space enter \\space number \\]";
          soutput3.innerHTML = stemp;
          renderMathInElement(soutput3);
      }
      else if(!valid.test(num))
      {
          stemp += "\\[Enter \\space space \\space separated \\space numbers. \\space Use \\space of \\space alphabets \\space and \\space special \\space character \\space is \\space not \\space allowed \\space for \\space calculation \\space purpose \\]";
          soutput3.innerHTML = stemp;
          renderMathInElement(soutput3);
      }
      else if(num<1){
          stemp += "\\[Natural \\space Numbers \\space cannot \\space be \\space negative \\]";
          soutput3.innerHTML = stemp;
          renderMathInElement(soutput3);
      }
      else{
          var sum=Math.trunc((num*(num+1)));
          var sum1 = (sum/2);
          var sum2 = (sum1)**2;
          stemp += "\\[Sum \\space of \\space the \\space Cubes \\space of \\space the \\space First \\space n \\space Natural \\space Numbers \\space is \\]";
          stemp += "\\[ \\sum {n}^3 \\space = \\space (\\frac{n(n+1)}{2})^2  \\]";
          stemp += "\\[\\sum {n}^3 \\space = \\space (\\frac{" + num + "(" + num + " + 1)}{2})^2 \\]";
          stemp += "\\[\\sum {n}^3 \\space = \\space (\\frac{" + num + "\\times" + (num+1) + "}{2})^2 \\]";
          stemp += "\\[\\sum {n}^3 \\space = \\space (\\frac{" + sum + "}{2})^2 \\]";
          stemp += "\\[\\sum {n}^3 \\space = \\space (" + sum1 + ")^2\\]";
          stemp += "\\[\\sum {n}^3 \\space = \\space " + sum2 + "\\]";
          soutput3.innerHTML = stemp;
          renderMathInElement(soutput3);
      }
  
  }
  
  function ssncal()
  {
      var num=document.getElementById("ssn").value;
      num = parseInt(num);
      valid=/^([-]{0,1}\d{1,}[\.]{0,1}\d{0,}[ ]?)*$/;
      var sumoutput = document.getElementById("ssnans");
      var sumtemp="";
      if(num=="")
      {
         sumtemp += "\\[Please \\space enter \\space number \\]";
         sumoutput.innerHTML = sumtemp;
         renderMathInElement(sumoutput);
      }
      else if(!valid.test(num))
      {
          sumtemp += "\\[Enter \\space space \\space separated \\space numbers. \\space Use \\space of \\space alphabets \\space and \\space special \\space character \\space is \\space not \\space allowed \\space for \\space calculation \\space purpose \\]";
          sumoutput.innerHTML = sumtemp;
          renderMathInElement(sumoutput);
      }
      else if(num<1){
          sumtemp += "\\[Natural \\space Numbers \\space cannot \\space be \\space negative \\]";
          sumoutput.innerHTML = sumtemp;
          renderMathInElement(sumoutput);
      }
      else{
          var sumN=Math.trunc((num*(num+1)));
          var sum1N = sumN/2;
          sumtemp += "\\[Sum \\space of \\space the \\space First \\space n \\space Natural \\space Numbers \\space is \\]";
          sumtemp += "\\[ \\sum {n} \\space = \\space \\frac{n(n+1)}{2}  \\]";
          sumtemp += "\\[ \\sum {n} \\space = \\space \\frac{" + num + "(" + num + " + 1)}{2} \\]";
          sumtemp += "\\[ \\sum {n} \\space = \\space \\frac{" + num + "\\times" + (num+1) +  "}{2} \\]";
          sumtemp += "\\[ \\sum {n} \\space = \\space \\frac{" + sumN + "}{2} \\]";
          sumtemp += "\\[ \\sum {n} \\space = \\space " + sum1N + "\\]";
          sumoutput.innerHTML = sumtemp;
          renderMathInElement(sumoutput);
      }
  
  }
  
  function sencal(){
      var num=document.getElementById("sen").value;
      num = parseInt(num);
      valid=/^([-]{0,1}\d{1,}[\.]{0,1}\d{0,}[ ]?)*$/;
      var sumoutput = document.getElementById("senans");
      var sumtemp="";
      if(num=="")
      {
         sumtemp += "\\[Please \\space enter \\space number \\]";
         sumoutput.innerHTML = sumtemp;
         renderMathInElement(sumoutput);
      }
      else if(!valid.test(num))
      {
          sumtemp += "\\[Enter \\space space \\space separated \\space numbers. \\space Use \\space of \\space alphabets \\space and \\space special \\space character \\space is \\space not \\space allowed \\space for \\space calculation \\space purpose \\]";
          sumoutput.innerHTML = sumtemp;
          renderMathInElement(sumoutput);
      }
      else if(num<1){
          sumtemp += "\\[Natural \\space Numbers \\space cannot \\space be \\space negative \\]";
          sumoutput.innerHTML = sumtemp;
          renderMathInElement(sumoutput);
      }
      else{
          var sumN=Math.trunc((num*(num+1)));
          sumtemp += "\\[Sum \\space of \\space the \\space First \\space n \\space Even \\space Natural \\space Numbers \\space is \\]";
          sumtemp += "\\[ \\sum {2n} \\space = \\space n(n+1)  \\]";
          sumtemp += "\\[ \\sum {2n} \\space = \\space " + num + "(" + num + " + 1) \\]";
          sumtemp += "\\[ \\sum {2n} \\space = \\space " + num + "\\times" + (num+1) +  " \\]";
          sumtemp += "\\[ \\sum {2n} \\space = \\space " + sumN + "\\]";
          sumoutput.innerHTML = sumtemp;
          renderMathInElement(sumoutput);
      }
  
  }
  
  function ssoncal()
  {
      var num=document.getElementById("sson").value;
      num = parseInt(num);
      valid=/^([-]{0,1}\d{1,}[\.]{0,1}\d{0,}[ ]?)*$/;
      var sumoutput1 = document.getElementById("ssonans");
      var sumtemp1="";
      if(num=="")
      {
         sumtemp1 += "\\[Please \\space enter \\space number \\]";
         sumoutput1.innerHTML = sumtemp1;
         renderMathInElement(sumoutput1);
      }
      else if(!valid.test(num))
      {
          sumtemp1 += "\\[Enter \\space space \\space separated \\space numbers. \\space Use \\space of \\space alphabets \\space and \\space special \\space character \\space is \\space not \\space allowed \\space for \\space calculation \\space purpose \\]";
          sumoutput1.innerHTML = sumtemp1;
          renderMathInElement(sumoutput1);
      }
      else if(num<1){
          sumtemp1 += "\\[Natural \\space Numbers \\space cannot \\space be \\space negative \\]";
          sumoutput1.innerHTML = sumtemp1;
          renderMathInElement(sumoutput1);
      }
      else{
          var sumCN= (num**2);
          sumtemp1 += "\\[Sum \\space of \\space the \\space First \\space n \\space Odd \\space Natural \\space Numbers \\space is \\]";
          sumtemp1 += "\\[ \\sum ({2n-1}) \\space = \\space n^{2}  \\]";
          sumtemp1 += "\\[ \\sum ({2n-1}) \\space = \\space" + num + "^{2}" + "\\]";
          sumtemp1 += "\\[ \\sum ({2n-1}) \\space =" + sumCN + "\\]";
          sumoutput1.innerHTML = sumtemp1;
          renderMathInElement(sumoutput1);
      }
  
  }
  
  
  function leap(){
      try{
          let yearInput = parseInt(document.getElementById("leapin").value);
          if(yearInput >= 0 ){
              if( yearInput%4 == 0){
                  if(yearInput%100 == 0){
                      if(yearInput%400 == 0){
                      document.getElementById("leapresult1").innerHTML = "It is a leap year.";
                      }
                      else{
                          document.getElementById("leapresult1").innerHTML = "It's not a leap year.";
                      }                    
                  }
                  else{
                  document.getElementById("leapresult1").innerHTML = "It is a leap year.";
                  }
              }
              else{
                  document.getElementById("leapresult1").innerHTML = "It's not a leap year.";
              }
          }
          else{
              throw "Input Error!";
          }
      }
      catch(err){
          //show error message
          document.getElementById("leapresult1").innerHTML = "Please insert a valid year.";
      }
  }
  
  
    function numcubesRangecal()
      {
  
      var num1=document.getElementById("numrange1").value;
      var num2=document.getElementById("numrange2").value;
      var s="";
      if(num1=="" || num2=="")
      {
         s= "Please enter both numbers";
      }
      else{
          var count = 0;
          s="Number of Perfect Cubes in the given range: ";
          cubes = "Cubes are: ";
          cbrt1 = Math.trunc(Math.cbrt(num1));
          cbrt2 = Math.trunc(Math.cbrt(num2));
          for(var i=cbrt1; i<=cbrt2;i++){
              if(i**3>=num1 && i**3<=num2){
                  count++;
                  var ans = i**3;
                  cubes += ans.toString() + ", ";
              }
          }
          cubes = cubes.substring(0, cubes.length-2);
          s += count;
      }
      document.getElementById("numcubesRangeans").innerHTML=s;
      document.getElementById("numcubesans").innerHTML=cubes;
  }
  
  
  function squaresRangecal()
  {
      var num1=document.getElementById("sqrange1").value;
      var num2=document.getElementById("sqrange2").value;
      let work = document.getElementById("sqrt-workn");
      let print = "<h2>Working Steps </h2> &emsp;";
      var s="";
      if(num1=="" || num2=="")
      {
         s= "Please enter both numbers";
      }
      else{
          var pr ="";
          s="Perfect squares in the given range: ";
          sqrt1 = Math.trunc(Math.sqrt(num1));
          sqrt2 = Math.trunc(Math.sqrt(num2));
          print += "STEP1 : Take square root ( only integer part )of the two given inputs<br>";
          print += "So,square root of &nbsp;" + num1 + "&nbsp; = &nbsp;" + sqrt1 + "&nbsp; and &nbsp; Square root of &nbsp;" + num2 +"&nbsp; = &nbsp;"+sqrt2+"<br>";
          print += "<br>STEP2 : Print squares of &nbsp;"+ sqrt1 +"&nbsp; to &nbsp;"+ sqrt2 +"&nbsp; that comes under the range of &nbsp;"+ sqrt1+"&nbsp; and &nbsp;"+ sqrt2 +"&nbsp; <br> (including &nbsp;"+ sqrt1 +"&nbsp; and &nbsp;"+ sqrt2 +"&nbsp; both if their squares also are in range)<br><br>";
          for(var i=sqrt1; i<=sqrt2;i++){
              if(i**2>=num1 && i**2<=num2){
                  var ans = i**2;
                  pr +=ans.toString() + "   ";
                  s += ans.toString() + "   ";
              }
          }
          print += "So, answer = &nbsp;"+pr;
      }
      document.getElementById("squaresRangeans").innerHTML=s;
      work.innerHTML = print;
  }
  
  function cubesRangecal()
  {
  
      var num1=document.getElementById("range1").value;
      var num2=document.getElementById("range2").value;
      var s="";
      let work = document.getElementById("cbrt-workn");
      let print = "<h2>Working Steps </h2> &emsp;";
      if(num1=="" || num2=="")
      {
         s= "Please enter both numbers";
      }
      else{
          var pr ="";
          s="Cubes in the given range: ";
          cbrt1 = Math.trunc(Math.cbrt(num1));
          cbrt2 = Math.trunc(Math.cbrt(num2));
          print += "STEP1 : Take cube root ( only integer part )of the two given inputs<br>";
          print += "So,Cube root of &nbsp;" + num1 + "&nbsp; = &nbsp;" + cbrt1 + "&nbsp; and &nbsp; Cube root of &nbsp;" + num2 +"&nbsp; = &nbsp;"+cbrt2+"<br>";
          print += "<br>STEP2 : Print cubes of &nbsp;"+ cbrt1 +"&nbsp; to &nbsp;"+ cbrt2 +"&nbsp; that comes under the range of &nbsp;"+ cbrt1+"&nbsp; and &nbsp;"+ cbrt2 +"&nbsp; <br> (including &nbsp;"+ cbrt1 +"&nbsp; and &nbsp;"+ cbrt2 +"&nbsp; both if their cubes also are in range)<br><br>";
          for(var i=cbrt1; i<=cbrt2;i++){
              if(i**3>=num1 && i**3<=num2){
                  var ans = i**3;
                  pr +=ans.toString() + "   ";
                  s += ans.toString() + "   ";
              }
          }
          print += "So, answer = &nbsp;"+pr;
      }
      document.getElementById("cubesRangeans").innerHTML=s;
      work.innerHTML = print;
  }
  
  var toDegree = function (radians) {
      return radians * (180 / Math.PI);
  }
  function segcal()
  {
      var a=document.getElementById("segr").value;
      var b=document.getElementById("sega").value;
      var c=document.getElementById("angseg").value;
      var output = document.getElementById("segans");
      var ans="";
      if(a==""||b=="")
      {
          ans += "\\[Enter \\space all \\space the \\space values \\space to \\space obtain \\space answer \\]";
          output.innerHTML = ans;
          renderMathInElement(output);
      }
      else{
  
      if(c=="degree")
      {
          var t=Math.sin(b);
          ans += "\\[\\frac{1}{2} \\times " +  a + "^{2} \\times  ( ( \\frac{π}{180} ) " + b + " - sin (" + b + "))  \\]";
          ans += "\\[\\frac{1}{2} \\times " + (a**2)  + " \\times  ( ( \\frac{π}{180} ) " + b + " - sin (" + b + ")) \\]";
          ans += "\\[\\frac{1}{2} \\times " + ((a*a)*((Math.PI/180)*(b-t)))+ " \\]"
          ans += "\\[Area \\space of \\space segment \\space in \\space degrees \\space is \\space " +  (((a*a)*((Math.PI/180)*(b-t)))*0.5) + " \\]";
          output.innerHTML = ans;
      }
      else{
          var t=Math.sin(b);
          var area= a*a*(b-t)*0.5
     ans += "\\[\\frac{1}{2} \\times " +  a + "^{2} \\times ( " + b + " - sin ( " + b + ")) \\]";
     ans += "\\[\\frac{1}{2} \\times " + (a**2)  + " \\times (  " + b + " - sin(" + b + ")) \\]";
     ans += "\\[\\frac{1}{2} \\times " + ((a*a)*(b-t)) + " \\]"
     ans += "\\[Area \\space of \\space segment \\space in \\space radian \\space is \\space " + area + " \\]";
     output.innerHTML = ans;
      }
  }
  renderMathInElement(output);
  }
  
  function impcal() {
      var a=document.getElementById("num").value;
      var b=document.getElementById("den").value;
      document.getElementById("impans").innerHTML ="";
      if(a==""||b==""){
          document.getElementById("impans").innerHTML ="\\[Enter \\space all \\space the \\space required \\space inputs \\space to \\space obtain \\space answer\\]";
          renderMathInElement(document.getElementById("impans"));
      } else if(b>=a){
          document.getElementById("impans").innerHTML ="\\[The \\space value \\space of \\space numerator \\space must \\space be \\space greater \\space than \\space be \\space denominator\\]";
          renderMathInElement(document.getElementById("impans"));
      } else if (b == 0){
          document.getElementById("impans").innerHTML ="\\[The \\space value \\space of \\space denominator \\space cannot \\space be \\space 0\\]";
          renderMathInElement(document.getElementById("impans"));
      } else {
          var r=a%b;
          var q=(a-r)/b;
          document.getElementById("impans").innerHTML ="\\[The \\space required \\space answer \\space is: \\space"+q+" \\space \\frac{"+r+"}{"+b+"}\\]";    
          renderMathInElement(document.getElementById("impans"));
      }
  }
  
  function factorial(n){
      let answer = 1;
      if (n == 0 || n == 1){
        return answer;
      }else{
        for(var i = n; i >= 1; i--){
          answer = answer * i;
        }
        return answer;
      }  
    }
  
   function calcexhpcal(){
      document.getElementById("ath").value = 5;
      document.getElementById("differ").value = 2;
      document.getElementById("totno").value = 3;
      hpcal();
  }
  function hpcal()
  {
      var x=parseInt(document.getElementById("ath").value);
      var y=parseInt(document.getElementById("differ").value);
      var z=parseInt(document.getElementById("totno").value);
      var ansout = document.getElementById("hpans");
      var anstemp ="";
      if(x == "" || y == "" || z == ""){
          anstemp += "\\[Please \\space enter \\space all \\space fields \\]";
          ansout.innerHTML = anstemp;
          renderMathInElement(ansout);
      }
     else if(!isNaN(parseInt(x)) && !isNaN(parseInt(y)) && !isNaN(parseInt(z)))
     {
      var numb = x + ((y - 1)*z);
      var num6 = (1 / numb) ;
      anstemp += "\\[nth \\space Term \\space of \\space HP \\space = \\space \\frac{1}{a+(n-1)d} \\]";
      anstemp += "\\[nth \\space Term \\space of \\space HP \\space = \\space \\frac{1}{" + x +  "+ (" + y + " - 1)" + z + "} \\]";
      anstemp +=  "\\[nth \\space Term \\space of \\space HP \\space = \\space" + (num6).toFixed(3) + "\\]";
      ansout.innerHTML = anstemp;
      renderMathInElement(ansout);
     }
     else
     {
       anstemp += "\\[Enter \\space numbers \\space only. \\space Blank \\space inputs \\space are \\space not \\space allowed \\]";
       ansout.innerHTML = anstemp;
       renderMathInElement(ansout);
     }
  }
  
  
  function calcexhpcal11(){
      document.getElementById("lterm1").value = 5;
      document.getElementById("cdiffer1").value = 2;
      document.getElementById("totnum1").value = 3;
      hpcal11();
  }
  function hpcal11()
  {
      var x=parseInt(document.getElementById("lterm1").value);
      var y=parseInt(document.getElementById("cdiffer1").value);
      var z=parseInt(document.getElementById("totnum1").value);
      var ansout = document.getElementById("hpans11");
      var anstemp ="";
      if(!isNaN(parseInt(x)) && !isNaN(parseInt(y)) && !isNaN(parseInt(z)))
     {
      var numb = x - ((y - 1)*z);
      var num6 = (1 / numb) ;
      anstemp += "\\[nth \\space Term \\space of \\space HP \\space from \\space End \\space = \\space \\frac{1}{l-(n-1)d} \\]";
      anstemp += "\\[nth \\space Term \\space of \\space HP \\space from \\space End \\space = \\space \\frac{1}{" + x +  "- (" + y + " - 1) \\times" + z + "} \\]";
      anstemp +=  "\\[nth \\space Term \\space of \\space HP \\space from \\space End \\space = \\space" + (num6).toFixed(3) + "\\]";
      ansout.innerHTML = anstemp;
     }
     else
     {
       anstemp += "\\[Enter \\space numbers \\space only. \\space Blank \\space inputs \\space are \\space not \\space allowed \\]";
       ansout.innerHTML = anstemp;
      
     }
     renderMathInElement(ansout);
  }
  
  
  
  function ppcal()
  {
      var a=document.getElementById("lamb").value;
      var b=document.getElementById("occ").value;
      var ans="";
      if(a==""||b=="")
      {
          ans="Please enter all the values";
      }
  
      else
      {
             var s=a**b;
             var y=(2.718)**(-a);
             var z=factorial(b);
             var num= (s*y)/z;
             ans+="\\[\\space P(X{=}"+b+")= \\frac{"+a+"^"+b+" \\times e^{-"+a+"}}{"+b+"!}\\]";
             ans+="\\[\\space P(X{=}"+b+")= \\frac{"+(s*y).toFixed(4)+"}{"+z+"}\\]";
             ans+="\\[\\space P(X{=}"+b+")= "+num.toFixed(4)+"\\]";
             ans+="The answer is  "+num.toFixed(4);
      }
  
      document.getElementById("ppans").innerHTML=ans;
      renderMathInElement(document.getElementById("ppans"));
  
  }
  
  function eircal()
  {
      var a=document.getElementById("air").value;
      var b=document.getElementById("nop").value;
      var c=document.getElementById("cprd").value;
      var ans="";
      var result= document.getElementById("eirans");
      if(a==""||b==""||c=="")
      {
          ans="\\[Enter \\space all \\space the \\space values \\space to \\space obtain \\space answer\\]";
      }
  
      else
      {
          var R = parseInt(a);
          var x=R/100;
          ans ="\\[Interest \\space Rate \\space per \\space period = \\frac{R}{100} = \\frac{" + R + "}{100} = " + x + "\\]";
          var y=parseInt(c);
          var z=parseInt(b);
          var rate_period= ((1+(x/z))**z)-1;
          var rate_p=rate_period*100;
          var rate = (1+rate_period)**y - 1;
          var rate_per = rate*100;
          ans +="\\[Effective \\space interest \\space rate \\space per \\space period(i) \\space \\] \\[=(1+ \\frac{r}{m})^{m}-1\\]";
          ans +="\\[=(1+\\frac{" + x + "}{" + z + "})^{" + z + "}-1\\]";
          ans +="\\[="+ rate_period +"\\]";
          ans +="\\[Effective \\space interest \\space Rate \\space per \\space period(i \\%)=" + rate_period +"\\space X \\space 100=" + rate_p + "\\% \\]";
          ans +="\\[Effective \\space Interest \\space rate \\space for \\space m \\space periods(i_t) \\space \\]";
          ans +="\\[= \\space (1+ \\frac{r}{m})^{mt}-1 \\]";
          ans +="\\[= \\space (1+ \\frac{" + x + "}{" + z + "})^{" + z + "\\times" + y + "}-1 \\]";
          ans +="\\[= \\space " + rate + "\\]";
          ans +="\\[Effective \\space Interest \\space rate \\space for \\space m \\space periods(i_t \\%)=" + rate + "\\space \\times \\space 100=" + rate_per + "\\% \\]";
      }
      result.innerHTML = ans;
      renderMathInElement(result);
  }
  
  function errpercal(){
      var a=document.getElementById("acval").value;
      var b=document.getElementById("expval").value;
      if(a==""||b==""){
          document.getElementById("errperans").innerHTML ="\\[Please \\space enter \\space all \\space the \\space values\\]";
          renderMathInElement(document.getElementById("errperans"));
          document.getElementById("errperans1").innerHTML ="";
          document.getElementById("errperans2").innerHTML ="";
      } else{
      var c= ((b-a)/a)*100;
      document.getElementById("errperans1").innerHTML= "\\[Percentage \\space Error = \\frac{Observed \\space value - \\space True \\space value}{True \\space value} \\times 100 \\]"
      renderMathInElement(document.getElementById("errperans1"));
      document.getElementById("errperans2").innerHTML ="\\[\\frac{("+b+"-"+a+")}{"+a+"} \\times 100 \\space = \\space \\frac{("+(b-a)+")}{"+a+"} \\times 100 \\space = \\space "+((b-a)/a).toFixed(2)+" \\times 100\\]";
      renderMathInElement(document.getElementById("errperans2"));
      document.getElementById("errperans").innerHTML ="\\[Hence, \\space the \\space error \\space percentage \\space is \\space = \\space"+c.toFixed(3)+"%\\]";
      renderMathInElement(document.getElementById("errperans"));
      }
  }
  
  function confidence() {
      var n = document.getElementById("conf-obsv").value;
      var mean = document.getElementById("conf-mean").value;
      var deviation = document.getElementById("conf-dev").value;
      var z = document.getElementById("z-select").selectedOptions[0].value;
      valid = /^([-]{0,1}\d{1,}[\.]{0,1}\d{0,}[ ]?)*$/;
      var zval = 0;
      var ans1 = 0;
      var ans2 = 0;
      var s = "";
      if (z === "Select Z value") {
          s = "Please select a Z value";
      }
      else if (n == "" || mean == "" || deviation == "") {
          s = "Please enter number";
      } else if (!valid.test(n)) {
          s = "Use of alphabets and special character is not allowed for calculation purpose";
      } else {
          if (z === "80%") {
              zval = 1.282;
          }
          else if (z === "85%") {
              zval = 1.440;
          }
          else if (z === "90%") {
              zval = 1.645;
          }
          else if (z === "95%") {
              zval = 1.960;
          }
          else if (z === "100%") {
              zval = 2.576;
          }
          console.log(z);
          var ans = zval * (deviation / Math.sqrt(n));
          ans1 = mean - ans;
          ans2 = mean + ans;
  
          s = " Confidence interval: " + ans1 + " to " + ans2;
      }
      document.getElementById("confans").innerHTML = s;
  }
  
  function unitcircCal(){
      var deg = document.getElementById("unitdeg").value;
      if(deg==""||isNaN(deg))
      {
          document.getElementById("unitcircxans").innerHTML = "Please enter proper numeric value";
  
      }
      else{
      var rad=0.0174533*deg;
      var x = Math.cos(rad);
      var y = Math.sin(rad);
  
      document.getElementById("unitcircxans").innerHTML = "\\[X: " + x+"\\newline Y:  "+ y+"\\]";
      document.getElementById("unitcircyans").innerHTML = "\\[X \\space =cos("+deg+"\\degree )="+x+"  \\space \\newline Y \\space =sin("+deg+"\\degree )="+y+"  \\]"
      renderMathInElement(document.getElementById("unitcircxans"));
      renderMathInElement(document.getElementById("unitcircyans"));
      }
  }
  
  function wmccal()
  {
      var num1=document.getElementById("wmcx").value;
      var num2=document.getElementById("wmcw").value;
      if(num1==""||num2=="")
      {
          ans="Please enter all the values";
      }
      else{
  
      num1=num1.trim();
      num1 = num1.split(" ");
      var len1=parseInt(num1.length);
      var number1=[]
      for (var i = 0; i < len1; i++) 
      {
          number1[i] = parseFloat(num1[i].trim());
      }
  
      num2=num2.trim();
      num2 = num2.split(" ");
      var len2=parseInt(num2.length);
      var number2=[]
      for (i = 0; i < len2; i++) 
      {
          number2[i] = parseFloat(num2[i].trim());
      }
     
      if(len1!=len2)
      {
          ans="Your number of data and weight are not equal ";
      }
      else
      {
          var ans1=[];
          var sum=0, wsum=0;
          for (i = 0; i < len1; i++) 
          {
              ans1[i] = number2[i]*number1[i];
              sum+=ans1[i];
              wsum+=number2[i];
          }
  
          for (i = 0; i < len1; i++) 
          {
              console.log(ans[i]);
          }
  
          console.log(wsum);
          console.log(sum);
          var wm=sum/wsum;
          ans="The calculated weighted mean is: "+wm;}
      }
      document.getElementById("wmcans").innerHTML=ans;
  }
  
  function calcexdbltimeCal(){
      var n = document.getElementById("inctime");
  
      n.value = 2;
  
      dbltimeCal();
  }
  
  function dbltimeCal(){
      var inc = parseInt(document.getElementById("inctime").value);
      var ans = Math.log(2) / Math.log(1 + inc);
      document.getElementById("dbltimeans").innerHTML = "\\[Doubling \\space Time \\space is \\space \\space \\frac{log \\space (2) }{log \\space (1 + (\\% \\space per \\space period \\space increase)) } \\space \\space that \\space is, \\]";
      renderMathInElement(document.getElementById("dbltimeans"));
      document.getElementById("dbltimeans1").innerHTML = "\\[\\frac{log \\space (2)}{log \\space (1 + ("+inc+")) } \\space = \\space "+ans.toFixed(3)+" \\space periods\\]";
      renderMathInElement(document.getElementById("dbltimeans1"));
  }
  
  function calcexperchngCal(){
      var n = document.getElementById("initialVal");
      var x = document.getElementById("finalVal");
  
      n.value = 10;
      x.value = 20;
  
      perchngCal();
  }
  
  function perchngCal(){
      var initial = parseInt(document.getElementById("initialVal").value);
      var final = parseInt(document.getElementById("finalVal").value);
      var output = document.getElementById("perchngans");
      var temp = "";
  
      if (!isNaN(initial) && !isNaN(final))
      {
          var ans = ((final-initial)/Math.abs(initial))*100;
  
          temp += "\\[The \\space Percentage \\space change \\space will \\space be,\\]"
          temp += "\\[\\space = \\space \\frac{((Final value) - (Initial value))}{ |(Initial value)| } \\times 100\\]"
          temp += "\\[\\space = \\space \\frac{(("+final+") - ("+initial+"))}{ |("+initial+")| } \\times 100\\]"
          temp += "\\[\\space = \\space \\frac{"+(final-initial)+"}{ |("+initial+")| } \\times 100\\]"
          temp += "\\[\\space = \\space \\frac{"+(final-initial)+"}{ "+(Math.abs(initial))+" } \\times 100\\]"
          temp += "\\[\\space = \\space "+((final-initial)/Math.abs(initial)).toFixed(2)+" \\times 100\\]"
          temp += "\\[\\space = \\space "+ans.toFixed(3)+"\\]"
          temp += "\\[Hence, \\space\\]"
          temp += "\\[\\space = \\space "+final+" \\space is \\space a \\space "+ans.toFixed(2)+" \\space \\% change \\space of \\space "+initial+"\\]"
  
          output.innerHTML = temp;
      }
      else
      {
          temp += "\\[Please \\space enter \\space valid \\space input\\]"
      }
      renderMathInElement(output);
  }
  
  function peroffCal(){
      var original = parseInt(document.getElementById("originalPrice").value);
      var off = parseInt(document.getElementById("offper").value);
      var tax = parseInt(document.getElementById("salestax").value);
      var output1 = document.getElementById("peroffans1");
      var output2 = document.getElementById("peroffans2");
      var temp1 = "";
      var temp2 = "";
      var final = (original + (original*(tax/100)))*(off/100);
      var savings = original - final;
  
      if(!isNaN(original) && !isNaN(tax) && !isNaN(off)){
  
          temp1 += "\\[The \\space Percentage \\space Off \\space will \\space be,\\]"
          temp1 += "\\[First, \\space we \\space calculate \\space the \\space final \\space value\\]"
          temp1 += "\\[Final \\space Price \\space = \\space (Original \\space Price) +  ( (Original \\space Price) \\times \\frac{(Tax \\space value)}{100} ) \\times \\frac{(Off \\space value)}{100}\\]"
          temp1 += "\\[\\space = \\space ("+original+") +  ( ("+original+") \\times \\frac{("+tax+")}{100} ) \\times \\frac{("+off+")}{100}\\]"
          temp1 += "\\[\\space = \\space ("+original+") +  ( ("+original+") \\times "+(tax/100).toFixed(2)+" ) \\times "+(off/100).toFixed(2)+"\\]"
          temp1 += "\\[\\space = \\space ("+original+") +  ( "+(original * (tax/100)).toFixed(2)+" ) \\times "+(off/100).toFixed(2)+"\\]"
          temp1 += "\\[\\space = \\space "+(original * (original * (tax/100))).toFixed(2)+"  \\times "+(off/100).toFixed(2)+"\\]"
          temp1 += "\\[\\space = \\space "+final.toFixed(3)+"\\]"
  
          output1.innerHTML = temp1;
  
          temp2 += "\\[Finally,\\space we \\space subtract \\space this \\space (Final \\space Price) \\space value \\space from \\space the \\space (Orginal \\space Price)\\]"
          temp2 += "\\[Savings \\space = \\space (Orginal \\space Price) \\space - \\space (Final \\space Price)\\]"
          temp2 += "\\[\\space = \\space "+original+" - "+final.toFixed(2)+"\\]"
          temp2 += "\\[\\space = \\space "+savings.toFixed(3)+"\\]"
  
          output2.innerHTML = temp2;
      } else{
          temp1 = "\\[Please \\space enter \\space valid \\space input\\]"
          output1.innerHTML = temp1;
      }
      renderMathInElement(output1);
      renderMathInElement(output2);
  }
  
  function moduloCal(){
      var x = parseInt(document.getElementById("modx").value);
      var y = parseInt(document.getElementById("mody").value);
      var r = x%y;
      var output = document.getElementById("moduloans");
      var xy = x/y;
      var yy = y*xy;
      
      var step = "\\[x \\pmod y= \\space x - (frac{x}{y}) \\times y\\]";
      step += "\\[x \\pmod y= \\space "+x+" - (frac{"+x+"}{"+y+"}) \\times "+y+"\\]";
      step += "\\[x \\pmod y= \\space "+x+" - "+xy+" \\times "+y+"\\]";
      step += "\\[x \\pmod y= \\space "+x+" - "+yy+" \\]";
      step += "\\[x \\pmod y= \\space "+r+" \\]";
  
      output.innerHTML = step;
  
      renderMathInElement(output);
  }
  
  function covcalcu(){
      var num1=document.getElementById("setx").value;
      var num2=document.getElementById("sety").value;
      valid=/^([-]{0,1}\d{1,}[\.]{0,1}\d{0,}[ ]?)*$/;
      var output = document.getElementById("covans");
      var s="";
      if(num1==""||num2=="") {
          s= "\\[Please \\space enter \\space number\\]";
          output.innerHTML = s;
          renderMathInElement(output);
          return;
      }else if(!valid.test(num1&&num2)){
          s= "\\[Enter \\space space \\space separated \\space numbers. \\space Use \\space of \\space alphabets \\space and \\space special \\space character \\space is \\space not \\space allowed\\]";
          output.innerHTML = s;
          renderMathInElement(output);
          return;
  
      } else{
          num1=num1.trim();
          num1 = num1.split(" ");
          var len1=parseInt(num1.length);
          var number1=[], sum1=0, sum2=0;
          for (var i = 0; i < len1; i++){
              number1[i] = parseFloat(num1[i].trim());
              sum1+=number1[i];
          }
          sum1=sum1/len1;
          num2=num2.trim();
          num2 = num2.split(" ");
          var len2=parseInt(num2.length);
          if (len1 == 1 || len2 == 1){
              s = "\\[Please \\space enter \\space more \\space than \\space value \\space for \\space each \\space data \\space set\\]";
              output.innerHTML = s;
              renderMathInElement(output);
              return;
          }
          if(len1!=len2) {
              s="\\[Your \\space datasets \\space X \\space and \\space Y \\space contain \\space different \\space numbers \\space of \\space element\\]";
              output.innerHTML = s;
              renderMathInElement(output);
              return;
          } 
          else{
              var number2=[];
              for (i = 0; i < len2; i++) {
                  number2[i] = parseFloat(num2[i].trim());
                  sum2+=number2[i];
              }
              s += "\\[Calculate the mean value for xi by adding all values and dividing them by sample size\\]"
              s += "\\[Calculate the mean value for yi by adding all values and dividing them by sample size\\]"
              s += "\\[Now, calculate the x diff. It can be calculated by subtracting each element of x from the mean value of x\\]"
              s += "\\[Do the same for y, calculate ydiff by subtracting all values of y from the mean value of y\\]"
              s += "\\[ Multiply all values of xdiff and ydiff and place them in a new column\\]"
              s += "\\[Add the last column values, which are the product of the two differences. Divide by the sample size,\\]"
              s += "\\[he value after dividing by sample size is covariance,\\]"
              sum2=sum2/len2;
              var covsum=0;
              for (i = 0; i < len2; i++) {
                  var d=number2[i]-sum2;
                  var f=number1[i]-sum1;
                  covsum+=(d*f);
              }
              var cov=(covsum)/(len2-1);
              s += "\\[he value after dividing by sample size is covariance, which is "+cov+" in this case\\]"
              s +=  "\\[The \\space calculated \\space covariance \\space is:\\space "+cov+"\\]";
              output.innerHTML = s;
              renderMathInElement(output);
      }
  }
  }
  
  function covcal() {
      var num=document.getElementById("cvsd").value;
      var s="";
      var output = document.getElementById("cvans");
      valid=/^([-]{0,1}\d{1,}[\.]{0,1}\d{0,}[ ]?)*$/;
      if(num==""){
         s= "\\[Please \\space enter \\space number\\]";
      } else if(!valid.test(num)){
          s= "\\[Enter \\space space \\space separated \\space numbers. \\newline Use \\space of \\space alphabets \\space and \\space special \\space character \\space is \\space not \\space allowed \\space for \\space calculation\\]";
      } else{
      num=num.trim();
      num = num.split(" ");
      var len=parseInt(num.length);
      if (len == 1){
          s = "\\[Please \\space enter \\space more \\space than \\space one \\space value\\]";
          return;
      }
      var number=[]
      for (var i = 0; i < len; i++) {
          number[i] = parseFloat(num[i].trim());
      }
      var sum=0;
      s += "\\[First, \\space take \\space a \\space loop \\space upto \\space the \\space length \\space of \\space dataset, "+len+"\\]";
      s += "\\[And, \\space add \\space all \\space of \\space the \\space data \\space in \\space dataset\\]";
      for (i = 0; i < len; i++) {
         sum=sum+number[i];
      }
      var mean=sum/len;
      s += "\\[We \\space get \\space the \\space sum \\space here \\space "+sum+" \\space\\]";
      s += "\\[Then \\space we \\space divide \\space this \\space sum \\space by \\space the \\space length \\space the \\space dataset\\]";
      s += "\\[\\space Mean \\space = \\space \\frac{"+sum+"}{"+len+"}\\]"
      s += "\\[\\space = \\space "+mean.toFixed(3)+"\\]"
      var varrzlt=0;
      for (i = 0; i < len; i++) {
          varrzlt = varrzlt + ((number[i]-mean)**2);
      }
      s +="\\[Then \\space we \\space take \\space a \\space loop \\space where \\space each \\space data \\space from \\space dataset \\space is\\]";
      s +="\\[Substracted \\space and \\space squared, \\space we \\space get, \\space "+varrzlt.toFixed(2)+ " \\space as \\space the \\space value\\]";
      varrzlt = varrzlt/(len-1);
      s +="\\[This \\space value \\space is \\space now \\space divided \\space by \\space the \\space (length - 1)\\]";
      s +="\\[\\space = \\space \\frac{"+varrzlt.toFixed(2)+"}{"+len+" - 1}\\]";
      s +="\\[\\space = \\space \\frac{"+varrzlt.toFixed(2)+"}{"+(len - 1)+"}\\]";
      s +="\\[\\space = \\space "+varrzlt.toFixed(3)+"\\]";
      var sdev = Math.sqrt(varrzlt);
      s +="\\[Finally, \\space the \\space Coeffecient \\space of \\space Variation \\space will \\space be,\\]";
      s += "\\[\\space = \\space \\frac{(\\sqrt{"+varrzlt.toFixed(2)+"})}{"+mean+"}\\]";
      s += "\\[\\space = \\space \\frac{"+sdev.toFixed(2)+"}{"+mean+"}\\]";
      s += "\\[\\space = \\space "+(sdev/mean).toFixed(3)+"\\]";
      }
      output.innerHTML=s;
      renderMathInElement(output);
  }
  
  
  function rmscal()
  {
      var num=document.getElementById("rmi").value;
      var answer="";
      if(num=="")
      {
          answer="Please enter all the values";
      }
      else
      {
          num=num.trim();
          num = num.split(" ");
          var len=parseInt(num.length);
         
          var number=[]
          for (var i = 0; i < len; i++) {
              number[i] = parseFloat(num[i].trim());
          }
          var sum=0;
          for (i = 0; i < len; i++) {
              sum=sum+(number[i]**2);
          }
  
          avg=sum/len;
          rmss=Math.sqrt(avg);
          answer+="\\[RMS \\space = \\space \\sqrt{\\frac{1}{n} \\sum_i{x_i^2}}\\]"
          answer+="\\[RMS \\space = \\space \\sqrt{\\frac{1}{"+len+"} \\times "+sum.toFixed(4)+"}\\]"
          answer+="\\[RMS \\space = \\space \\sqrt{"+1/len.toFixed(4)+" \\times "+sum.toFixed(4)+"}\\]"
          answer+="\\[RMS \\space = \\space \\sqrt{"+(1/len) * sum.toFixed(4)+"}\\]"
          answer+="\\[RMS \\space = \\space "+Math.sqrt((1/len) * sum).toFixed(4)+"\\]"
          answer+="\\[The \\space root \\space mean  \\space square \\space of\\space  given\\space  input \\space is: "+rmss.toFixed(4)+"\\]";
  
      }
      document.getElementById("rmsans").innerHTML=answer;
  
      renderMathInElement(document.getElementById("rmsans"));
  }
  
  function pvaluecal()
  { 
      var z = parseFloat(document.getElementById("pvalueinp").value);
      
      var output = document.getElementById("pvalueans");
      var temp = "";
      var Zval = (1/Math.sqrt(2*3.14)* (2.71)**((z**2)/2));
      var ans = 2*Zval;
      var exp = "";
      if(isNaN(z))
      {
          temp = "Please enter proper value";
          output.innerHTML = temp;
      }
      else
      {
          exp += "\\[P\\space value\\space = \\space 2\\times \\phi (Z)\\]";
          exp += "\\[\\phi (Z)\\space = \\space frac{1}{\\sqrt{(2\\times \\pi)} \\times (e)^{frac{z^2}{2}}} \\]";
          exp += "\\[P\\space value\\space = \\space 2\\times frac{1}{\\sqrt{(2\\times 3.14)} \\times (2.71)^{frac{"+z+"^2}{2}}}\\]";
          exp += "\\[P\\space value\\space = \\space "+ans+"\\]";
          output.innerHTML = exp;
      }
      renderMathInElement(output);
  }
  
  
  
  function zscorecal()
  { 
      var a = parseFloat(document.getElementById("rawscore").value);
      var b = parseFloat(document.getElementById("ppmean").value);
      var c = parseFloat(document.getElementById("stdtn").value);
      var ans = document.getElementById("zscoreans");
      var temp = "";
      var z= (a-b)/c;
      if(isNaN(a) || isNaN(b) || isNaN(c))
      {
          temp += "\\[Please \\space enter \\space all \\space the \\space values \\]";
          ans.innerHTML = temp;
          renderMathInElement(ans);
      }
      else
      {
          if(b<0){
              temp += "\\[Z \\space Score \\space = \\space \\frac{Raw \\space Score \\space (X) \\space - \\space Population \\space Mean \\space (μ)}{Standard \\space Deviation \\space (σ)} \\]"
              temp += "\\[Z \\space Score \\space = \\space \\frac {" + a + "- (" + b + ")}{" + c + "} \\space = \\space \\frac{" + (a-b) + "}{" + c + "} \\]";
              temp += "\\[Z \\space Score \\space = \\space " + z.toFixed(4) + " \\]"
              ans.innerHTML = temp;
              renderMathInElement(ans);
          }
          else{
                temp += "\\[Z \\space Score \\space = \\space \\frac{Raw \\space Score \\space (X) \\space - \\space Population \\space Mean \\space (μ)}{Standard \\space Deviation \\space (σ)} \\]"
                temp += "\\[Z \\space Score \\space = \\space \\frac {" + a + " - " + b + "}{" + c + "} \\space = \\space \\frac{" + (a-b) + "}{" + c + "} \\]";
                temp += "\\[Z \\space Score \\space = \\space " + z.toFixed(4) + " \\]"
                ans.innerHTML = temp;
                renderMathInElement(ans);
      }
  }
  }
  
  function solveSlope() {
      var x1 = document.getElementById("inputlinex1").value;
      var y1 = document.getElementById("inputliney1").value;
      var x2 = document.getElementById("inputlinex2").value;
      var y2 = document.getElementById("inputliney2").value;
      if (x1 == "" || y1 == "" || x2 == "" || y2 == "") {
          document.getElementById("resultofline").innerHTML = "Please enter all four points";
          document.getElementById("answerofline").innerHTML = "";
          document.getElementById("answerofline2").innerHTML = "";
      } else if (parseInt(x2) - parseInt(x1) == 0) {
          document.getElementById("resultofline").innerHTML = "Infinity";
          document.getElementById("answerofline").innerHTML = "";
          document.getElementById("answerofline2").innerHTML = "";
      } else {
          let temp = (y2 - y1) / (x2 - x1);
          let sol = "\\[Slope=\\frac{" + y2 + "-" + y1 + "}{" + x2 + "-" + x1 + "}\\]";
          let sol2 = "\\[Slope=" + temp + "\\]";
          document.getElementById("resultofline").innerHTML = "\\[Slope=\\frac{y2-y1}{x2-x1}\\]"
          document.getElementById("answerofline").innerHTML = sol;
          document.getElementById("answerofline2").innerHTML = sol2;
          renderMathInElement(document.getElementById("answerofline"));
          renderMathInElement(document.getElementById("answerofline2"));
          renderMathInElement(document.getElementById("resultofline"));
      }
  }
  
  function suppangcal(){
      var a=document.getElementById("ang").value;
      var ans="";
      if(a==""){
          ans="Enter the angle to find the supplementary";
      } else{
          var t=parseInt(a);
          var v=180-t;
          ans="\\[The \\space supplementary \\space angle \\space of \\space"+a+" \\space will \\space be \\newline 180 \\degree \\space - \\space t \\degree \\newline 180 \\degree \\space - \\space "+t+" \\degree \\newline = \\space "+v+" \\degree \\]";
      }
      document.getElementById("suppangans").innerHTML=ans;
      renderMathInElement(document.getElementById("suppangans"));
  }
  
  function suppangvercal(){
      var a=document.getElementById("ang1").value;
      var b=document.getElementById("ang2").value;
      var ans="";
      if(a==""||b==""){
          ans="Enter both angles to verify";
      } else{
          var x=parseInt(a), y=parseInt(b);
          if(x+y==180)
              ans="\\[Here \\space \\space "+a+" \\degree \\space + \\space "+b+" \\degree \\space = 180 \\degree \\newline Hence, \\newline Both \\space the \\space entered \\space angles \\space "+a+"\\degree \\space and \\space "+b+"\\degree \\newline are \\space Supplementary\\]";
          else
              ans="\\[Here \\space \\space "+a+" \\degree \\space + \\space "+b+" \\degree \\space != 180 \\degree \\newline Hence, \\newline Both \\space the \\space entered \\space angles \\space "+a+"\\degree \\space and \\space "+b+"\\degree \\newline are \\space Not \\space Supplementary\\]";
      }
      document.getElementById("suppangverans").innerHTML=ans;
      renderMathInElement(document.getElementById("suppangverans"));
  }
  
  function compangcal(){
      var a=document.getElementById("cang").value;
      var ans="";
      if(a==""){
          ans="Enter the angle to find the complementary";
      } else{
          var t=parseInt(a);
          var v=90-t;
          ans="\\[The \\space complementary \\space angle \\space of \\space"+a+" \\space will \\space be \\newline 90 \\degree \\space - \\space t \\degree \\newline 90 \\degree \\space - \\space "+t+" \\degree \\newline = \\space "+v+" \\degree \\]";
      }
      document.getElementById("compangans").innerHTML=ans;
      renderMathInElement(document.getElementById("compangans"));
  }
  
  function compangvercal(){
      var a=document.getElementById("cvang1").value;
      var b=document.getElementById("cvang2").value;
      var ans="";
      if(a==""||b==""){
          ans="Enter both angles to verify";
      } else{
          var x=parseInt(a), y=parseInt(b);
          if(x+y==90)
              ans="\\[Here \\space \\space "+a+" \\degree \\space + \\space "+b+" \\degree \\space = 90 \\degree \\newline Hence, \\newline Both \\space the \\space entered \\space angles \\space "+a+"\\degree \\space and \\space "+b+"\\degree \\newline are \\space Complementary\\]";
          else
              ans="\\[Here \\space \\space "+a+" \\degree \\space + \\space "+b+" \\degree \\space != 90 \\degree \\newline Hence, \\newline Both \\space the \\space entered \\space angles \\space "+a+"\\degree \\space and \\space "+b+"\\degree \\newline are \\space Not \\space Complementary\\]";
      }
      document.getElementById("compangverans").innerHTML=ans;
      renderMathInElement(document.getElementById("compangverans"));
  }
  function cotermangcal(){
      var a=document.getElementById("cotang").value;
      var ans="";
      var pos="\\[Positive \\space Coterminal \\space Angle:\\space";
      var neg="\\[Negative \\space Coterminal \\space Angle:\\space";
      if(a==""){
          ans="Enter the angle to find the coterminal angle";
      } else{
          var t=parseInt(a);
          for(let i=1;i<5;i++){
              pos+=t+360*i+"°,";
              neg+=t-360*i+"°,";
          }
          pos=pos.slice(0,-1)+"...\\]";
          neg=neg.slice(0,-1)+"...\\]";
          ans=pos+neg;
      }
      document.getElementById("cotermangans").innerHTML=ans;
      renderMathInElement(document.getElementById("cotermangans"));
  }
  function cotvercal(){
      var a=document.getElementById("cotang1").value;
      var b=document.getElementById("cotang2").value;
      var ans="";
      if(a==""||b==""){
          ans="Enter both angles to verify";
      } else{
          var x=parseInt(a), y=parseInt(b),m1,m2;
          m1=x%360;
          m2=y%360;
          console.log(m1,m2)
          if(m1==m2 ||Math.abs(m1)+Math.abs(m2)==360)
              ans="\\[Here \\space \\space "+a+" \\degree \\space mod \\space360 \\degree \\space = "+b+" \\degree \\space mod \\space 360 \\degree \\newline Hence,Both \\space the \\space entered \\space angles \\space "+a+"\\degree \\space and \\space "+b+"\\degree \\newline are \\space Coterminal\\]";
          else
              ans="\\[Here \\space \\space "+a+" \\degree \\space mod \\space360 \\degree \\space != "+b+" \\degree \\space mod \\space 360 \\degree \\newline Hence,  Both \\space the \\space entered \\space angles \\space "+a+"\\degree \\space and \\space "+b+"\\degree \\newline are \\space not \\space Coterminal\\]";
              
      }
      document.getElementById("cotverans").innerHTML=ans;
      renderMathInElement(document.getElementById("cotverans"));
  }
  function faccal(){
      var a=document.getElementById("facno").value;
      var ans="";
      if(a=="")
      {
          ans="Please enter number to find factors";
      }
      else
      {
          var factors=[];
          ans="Factors of "+a+ " are: ";
          for(var k=1;k<=a;k++)
          {
              if(a%k==0)
              {
                  factors.push(k);
              }
          }
  
          for(var i=0;i<factors.length;i++)
          {
              ans+=factors[i]+"  ";
          }
  
  
      }
      document.getElementById("facans").innerHTML=ans;
  }
  
  
  function facpaircal()
  {
      a=document.getElementById("facno").value;    
      var ans="";
      if(a=="")
      {
          ans="Please enter number to find pair factors";
      }
      else
      {
          var number1 = 0;
          var number2 = a;
          var answers=[];
          for (var i = 1; i < a; i++)
          {
              if (a % i == 0)
              {
              number1 = i;
                number2 = a/ i;
                if (number2 >= number1)
                {
                answers.push(number1);
                answers.push(number2);
                }
                else
                {
                    break;
                }
             }
          }
  
          ans="Pair factors are: ";
          for(var i =0;i<answers.length-1;i=i+2)
          {
              ans+="( "+answers[i]+","+answers[i+1]+" )  ";
          }
      }
   document.getElementById("facans").innerHTML=ans;
  }
  
  
  function skewcal()
  {   
  var num=document.getElementById("skewinput").value;
  var ans="";
  if(num=="")
  {
      ans="Please enter datasets";
      document.getElementById("skewans").innerHTML=ans;
  }
  else{
      num=num.trim();
      num = num.split(" ");
      var len=parseInt(num.length);
      var sum=0;
      var number=[]
      let steps = "";
      for (var i = 0; i < len; i++) {
          number[i] = parseFloat(num[i].trim());
          sum+=number[i];
      }
      
      steps += "\\[Sum\\space of\\space data\\space set\\space you\\space entered:\\space "+sum+" \\]";
      sum=sum/len;
      var ansno=0;
      for (i = 0; i < len; i++)
      {
          var g=(number[i]-sum);
          g=g**3;
          ansno+=g;
      }
      
      steps += "\\[Now\\space calculate\\space the\\space Mean\\space and\\space the\\space Standard\\space Deviation\\]";
      steps += "\\[Subtract\\space the\\space mean\\space from\\space each\\space raw\\space score\\]";
      steps += "\\[Raise\\space each\\space of\\space these\\space deviations\\space from\\space the\\space mean\\space to\\space the\\space third\\space power\\space and\\space sum\\]";
      steps += "\\[Skewness\\space = \\space sum\\space of\\space the\\space deviations\\space from\\space the\\space mean,\\space raise\\space to\\space the\\space third\\space power,\\space divided\\space by\\space number\\space of\\space cases\\space minus\\space 1,\\space times\\space the\\space standard\\space deviation\\space raised\\space to\\space the\\space third\\space power.</p>\\]";
      var varrzlt=0;
      for (i = 0; i < len; i++) {
          varrzlt = varrzlt + ((number[i])-sum)*((number[i])-sum);
      }
      
      varrzlt = varrzlt/(len-1);
      var sampstddev=Math.sqrt(varrzlt);
      sampstddev=sampstddev**3;
      var rzlt= ansno/((len-1)*sampstddev);
  
      steps += "\\[Skewness\\space = \\space "+rzlt+"\\]";
  
  }
  document.getElementById("skewans").innerHTML=steps;
  renderMathInElement(document.getElementById("skewans"));
  }
  // kurtosis calculator
  // kurtosis calculator
  function kurt_sum(arr) {
      let sum = 0;
      for (var i = 0; i < arr.length; i++) {
          sum += arr[i];
      }
  
      return sum;
  }
  
  function kurt_bar(arr, mean) {
      let diff = 0
      for (var i = 0; i < arr.length; i++) {
          var temp = 0
          temp = arr[i] - mean
          temp = Math.pow(temp, 4)
          diff += temp;
      }
  
      return diff
  }
  function kurtcal()
  {   var num=document.getElementById("kurtinput").value;
       var num1=document.getElementById("kurtinput2").value;
      
  var ans="";
      if(num == ""|| num1 =="")
      {
          ans="Please fill both fields"
      }
      else{
  
          num = num.split(" ");
          let n1 = num.length;
          for (var i = 0; i < n1; i++) {
              num[i] = parseFloat(num[i]);
          }
          var sum=kurt_sum(num)
          var mean=(sum/n1).toFixed(4);
          var numer=kurt_bar(num,mean);
          numer=numer.toFixed(4);
          num1 = parseFloat(num1);
      ans+="\\[In \\space the \\space below \\space formula :\\]"
      ans+="\\[\\mu_4 => Fourth \\space central \\space moment\\]"
      ans+="\\[\\sigma => Standard \\space deviation \\space of \\space the \\space sample\\]"
      ans+="\\[\\bar{x} => Mean \\space of \\space the \\space sample\\]"
      ans+="\\[N=>Sample \\space size\\]"
  
      ans+="\\[Measure \\space of \\space kurtosis \\space \\beta_2 = \\frac{\\mu_4}{\\sigma^{4}}\\]"
      ans+="\\[\\because \\mu_4= \\frac{\\sum_{i=1}^{n} (x_i- \\bar{x})^{4}}{N} \\]"
      ans+="\\[\\therefore \\beta_2 = \\frac{\\sum_{i=1}^{n} (x_i- \\bar{x})^{4}}{N\\sigma^{4}} \\]"   
      ans+="\\[\\beta_2 = \\frac{"+numer+"}{ ("+n1+") \\times"+num1+"^{4}}\\]"
      ans+="\\[\\beta_2 = \\frac{"+numer+"}{"+(n1)+" \\times "+Math.pow(num1,4).toFixed(4)+"} \\]"
      ans+="\\[\\beta_2 = "+(numer/((n1)*Math.pow(num1,4)).toFixed(4)).toFixed(4)+"\\]"
  
      if((numer/((n1)*Math.pow(num1,4)).toFixed(4)).toFixed(4)==3)
      ans+="\\[Since \\space \\beta_2 \\space is \\space equal \\space to \\space 3 \\space the  \\space distribution  \\space is  \\space mesokurtic. \\]"
      else if ((numer/((n1)*Math.pow(num1,4)).toFixed(4)).toFixed(4)>3)
      ans+="\\[Since \\space \\beta_2 \\space > \\space 3 \\space the  \\space distribution  \\space is  \\space leptokurtic. \\]"
      else if ((numer/((n1)*Math.pow(num1,4)).toFixed(4)).toFixed(4)<3)
      ans+="\\[Since \\space \\beta_2 \\space < \\space 3 \\space the  \\space distribution  \\space is  \\space platykurtic. \\]" 
      }
  
  document.getElementById("kurtans").innerHTML=ans;
  renderMathInElement(document.getElementById("kurtans"));
  
  }
  
  function bmifind()
  {
      a=document.getElementById("bmis1").value;  
      b=document.getElementById("bmis2").value;  
      c=document.getElementById("bmis3").value;   
      var ans="";
      if(a==""||b==""||c=="")
      {
          ans="Please enter all field to find answer";
      }
      else
      {
          a=parseFloat(a);
          b=parseFloat(b);
          c=parseFloat(c);
         var height= (a*0.308)+(b*0.0245);
          var bm= c/(height**2);
  
         var vi="The B.M.I is the ratio of your weight in kg and your height in metre's square<br>"
         vi+=" Square of your Height in metre is: "+height**2;
         vi+="<br>Your weight is: "+c;
         vi+="<br>Thus, your B.M.I is: "+ c+" / "+height**2;
         document.getElementById("bmians1").innerHTML=vi;
  
          ans="Your B.M.I is: "+bm;
      }
      document.getElementById("bmians").innerHTML=ans;
  }
  function clockcal()
  {
      a=document.getElementById("hclock").value;  
      b=document.getElementById("mclock").value;   
      var ans="";
      if(a==""||b=="")
      {
          ans="Please enter both minutes and hour to find angle";
      }
      else
      {
          a=parseFloat(a);
          b=parseFloat(b);
          var angmin=b*6;
          var anghour=30*a+0.5*b
  
          ans="Angle from minute to hour hands: "+Math.abs(anghour-angmin)+" degree";
          ans+="<br>"
          ans+="Angle from hour to minute hands: "+Math.abs(360-Math.abs(anghour-angmin))+" degree";
      }
      document.getElementById("clockans").innerHTML=ans;
  }
  
  function traprzlt()
  {
  
      a=parseFloat(document.getElementById("tr1").value);    
      b=parseFloat(document.getElementById("tr2").value);    
      c=parseFloat(document.getElementById("tr3").value);    
      d=parseFloat(document.getElementById("tr4").value);    
      var k=(a+b)/2;
      var traparea= c*k;
      var trapvol=c*d*k;
      var output =  document.getElementById("trapans");
      var temp = "";
      if(isNaN(a) || isNaN(b) || isNaN(c) || isNaN(d)){
          temp += "\\[ Please \\space enter \\space all \\space fields \\]";
          output.innerHTML = temp ;
          renderMathInElement(output);
      }
      else{
     temp += "\\[" + c + "\\times \\frac{(" + a + "+" + b + ")}{2}  \\]";
     temp += "\\[" + c + "\\times" + k + " \\]";
     temp += "\\[ Area \\space of \\space Trapezoid \\space is \\space" + traparea + "\\]";
     temp += "\\[" + c + "\\times" + d + "\\times \\frac{(" + a + "+" + b + ")}{2}  \\]";
     temp += "\\[" + c + "\\times" + d + "\\times" + k + "\\]";
     temp += "\\[ Volume \\space of \\space Trapezoid \\space is \\space" + trapvol + "\\]";
     output.innerHTML = temp ;
     renderMathInElement(output);
      }
  }
  
  function perrankcal(){
      var num=document.getElementById("perrank").value;
      var num2=document.getElementById("peryour").value;
      valid=/^([-]{0,1}\d{1,}[\.]{0,1}\d{0,}[ ]?)*$/;
      document.getElementById("perrankans").innerHTML ="";
      if(num==""||num2==""){
          document.getElementById("perrankans").innerHTML= "Please enter number";
      } else if(!valid.test(num)) {
          document.getElementById("perrankans").innerHTML= "Enter space separated numbers. Use of alphabets and special character is not allowed for calculation purpose";
      } else{
      num=num.trim();
      num = num.split(" ");
      var len=parseInt(num.length);
      var number=[]
      for (var i = 0; i < len; i++) {
          number[i] = parseFloat(num[i].trim());
      }
      num2=parseFloat(num2);
      var count=0;
      document.getElementById("perrankans1").innerHTML="\\[Here \\space we \\space count \\space the \\space cases \\newline when \\space your \\space marks \\space becomes \\space > \\space or \\space = \\space any \\space marks \\space form \\space dataset\\]";
      renderMathInElement(document.getElementById("perrankans1"));
      for(i=0; i<len;i++){
          if(number[i]<=num2){
              count++;}
      }
      var pr= (count/len)*100;
      document.getElementById("perrankans3").innerHTML= "\\[\\frac{Number \\space of \\space times \\space "+num2+" \\space was \\space > or \\space = \\space any \\space marks \\space form \\space all \\space marks \\space dataset}{Total \\space no. \\space of \\space data \\space in \\space dataset} \\times 100 \\]";
      renderMathInElement(document.getElementById("perrankans3"));
      document.getElementById("perrankans").innerHTML= "\\[Hence, \\space the \\space percentile \\space rank \\space for \\space given \\space marks \\space is: \\space \\newline \\frac{"+count+"}{"+len+"} \\times 100 = "+pr.toFixed(3)+"\\]";
      renderMathInElement(document.getElementById("perrankans"));
      }
  }
  
  function halflifeCalc() {
      var decay = document.getElementById("decay").value;
      var answer="";
      var ans="";
      if(decay=="")
      {
      //   answer="";
      //   ans="";
        document.getElementById("halflifeAns").innerHTML="Please enter the decay constant"
      }
      else{
      var lg = Math.log(2);
      console.log(lg);
      var halfLife = lg / decay;
      
      answer+="\\[t_\\frac{1}{2} \\space = \\space \\frac{ln(2)}{\\lambda}\\]"
      answer+="\\[\\lambda => \\space decay \\space constant \\]"
      answer+="\\[t_\\frac{1}{2} = \\space \\frac{"+lg.toFixed(4)+"}{"+decay+"}\\]"
      answer+="\\[t_\\frac{1}{2} = \\space "+(lg.toFixed(4)/decay).toFixed(4)+"\\]"
      ans = "Half Life of the element is " + halfLife.toFixed(4);
      document.getElementById("halflifeAns").innerHTML = answer+ans;
      renderMathInElement(document.getElementById("halflifeAns"));
      }
      
      
  }
  
  function oocal()
  {
      var num4=document.getElementById("oocx").value;
      ans="";
      var answer="";
      if(num4=="")
      {
          answer="Please enter a number";
      }
      else
      {
          var count=0;
          if(num4>5)
          {
              while(num4>5)
              {
               num4=num4/10;
               count=count+1;
              }
          }
          else if(num4<=0.5)
          {
              while(num4 <= 0.5)
              {num4=num4*10;
              count=count-1;
             }
          }
          else if(num4==5)
          {
              count=0;
          }
          answer+="\\[N \\space = \\space n \\times 10 ^ {x}\\]"
          answer+="\\[Here, \\space N = \\space no \\space whose \\space order \\space of \\space magintude \\space we \\space have \\space to \\space find\\]"
          answer+="\\[n \\space should \\space be \\space in \\space the \\space range : 0.5 < n \\leq 5\\]"
          answer+="\\[x \\space => \\space order \\space of \\space magnitude \\]"
          answer+="\\[N \\space = \\space "+num4+" \\times 10 ^ {"+count+"} \\]"
          answer+="\\[The \\space order \\space of \\space mangnitude \\space is : "+(count)+"\\]";
  
      }
      document.getElementById("ooans").innerHTML=answer;
      renderMathInElement(document.getElementById("ooans"));
  }
  
  function mifcal()
  {
      var num1=document.getElementById("mians1").value;
      var num2=document.getElementById("mians2").value;
      ans="";
      if(num1==""||num2=="")
      {
          ans="Please fill all the field";
      }
      else
      {
          num1=parseFloat(num1);
          num2=parseFloat(num2);
          ans += "\\[[Note \\space :- \\space Multiplicative \\space Inverse \\space of \\space a \\space number \\space is \\space an \\space another \\space number \\space which \\]"; 
          ans += "\\[\\space when \\space multiplied \\space with \\space it, \\space always \\space gives \\space 1 ] \\]";
          ans += "\\[Divide \\space the \\space number \\space by \\space 1 \\space\\]";
          ans += "\\[Multiplicative \\space inverse \\space of \\space \\frac{" + num1 + "}{" + num2 + "} \\space = \\space \\frac{1}{\\frac{" + num1 + "}{" + num2 + "}}\\]";
          ans += "\\[= \\space \\frac{" + num2 + "}{" + num1 + "}\\]";
          ans += "\\[= \\space "+ (num2/num1) + " \\]";
      }
      document.getElementById("mians").innerHTML=ans;
      renderMathInElement(document.getElementById("mians"));
  }
  function midcal()
  {
      var num1=document.getElementById("mians1").value;
      var num2=document.getElementById("mians2").value;
      ans="";
      if(num1==""||num2=="")
      {
          ans="Please fill all the field";
      }
      else
      {
          num1=parseFloat(num1);
          num2=parseFloat(num2);
          ans += "\\[[Note \\space :- \\space Multiplicative \\space Inverse \\space of \\space a \\space number \\space is \\space an \\space another \\space number \\space which\\]";
          ans += "\\[ \\space when \\space multiplied \\space with \\space it, \\space always \\space gives \\space 1 ]\\]";
          ans += "\\[Divide \\space the \\space number \\space by \\space 1 \\space\\]";
          ans += "\\[Multiplicative \\space inverse \\space of \\space \\frac{" + num1 + "}{" + num2 + "} \\space = \\space \\frac{1}{\\frac{" + num1 + "}{" + num2 + "}}\\]";
          ans += "\\[= \\space \\frac{" + num2 + "}{" + num1 + "}\\]";
      }
      document.getElementById("mians").innerHTML=ans;
      renderMathInElement(document.getElementById("mians"));
  }
  
  function ainvcal()
  {
      var num =document.getElementById("aians1").value;
      ans="";
      if(num =="")
      {
          ans="Please fill all the field";
      }
      else
      {
          num=parseFloat(num);
          ans1 = -1 * num;
          ans += "\\[[Note \\space :- \\space Additive \\space Inverse \\space of \\space a \\space number \\space is \\space an \\space another \\space number \\space which\\]";
          ans += "\\[ \\space on \\space adding \\space with \\space the \\space original \\space number \\space results \\space in \\space zero \\space value. ]\\]";
          ans += "\\[Additive \\space Inverse \\space of \\space" + num + " \\space = \\space (" + -1 + ") \\times " + (num) + "\\space = \\space " + ans1 +  "\\]";
      }
      document.getElementById("aians").innerHTML= ans;
      renderMathInElement(document.getElementById("aians"));
  
  }
  
  function hypergeos2cal() {
      var num1=parseFloat(document.getElementById("hypergeos12").value);
      var num2=parseFloat(document.getElementById("hypergeos22").value);
      var num3=parseFloat(document.getElementById("hypergeos32").value);
      var num4=parseFloat(document.getElementById("hypergeos42").value);
  
      var output = document.getElementById("hypergeos2ans");
      var temp="";
      var d= (num2*num3)/num4;
  
      if(isNaN(num1) || isNaN(num2) || isNaN(num3) || isNaN(num4))
      {
          temp = "\\[Please \\space enter \\space valid \\space input\\]";
          output.innerHTML = temp;
      }
      else
      {
          var d= (num2*num3)/num4;
          temp += "\\[The \\space value \\space of \\space hypergeometric \\space distribution \\space mean \\space will \\space be,\\]"
          temp += "\\[\\space = \\space \\frac{(Sample \\space Size) \\times (Successes \\space of \\space Lot)}{(Lot \\space Size)}\\]"
          temp += "\\[\\space = \\space \\frac{("+num2+") \\times ("+num3+")}{"+num4+"}\\]"
          temp += "\\[\\space = \\space \\frac{"+(num2*num3)+"}{"+num4+"}\\]"
          temp += "\\[\\space = \\space "+d.toFixed(3)+"\\]";
          temp += "\\[Hence, \\space the \\space value \\space of \\space mean \\space is,\\]"
          "\\[\\space = \\space "+d.toFixed(3)+"\\]"
  
          output.innerHTML = temp;
      }
      renderMathInElement(output);
  }
  
  function hypergeosvarcal()
  {
      var num1=parseFloat(document.getElementById("hypergeos12").value);
      var num2=parseFloat(document.getElementById("hypergeos22").value);
      var num3=parseFloat(document.getElementById("hypergeos32").value);
      var num4=parseFloat(document.getElementById("hypergeos42").value);
      var output = document.getElementById("hypergeos2ans");
      var temp ="";
      if(isNaN(num2) || isNaN(num1) || isNaN(num3) || isNaN(num4)) {
          temp = "\\[Please \\space fill \\space all \\space the \\space field\\]";
  
          output.innerHTML = temp;
      } 
      else {
          temp += "\\[Hypergeometric \\space variation \\space will \\space be,\\]"
          temp += "\\[\\space = \\space \\frac{ ("+num2+" \\times "+num3+" \\times ("+num4+" - "+num3+") \\times ("+num4+" - "+num2+"))}{( "+num4+"^{2} \\times ("+num4+" - 1))}\\]"
          temp += "\\[\\space = \\space \\frac{ ("+num2+" \\times "+num3+" \\times ("+(num4-num3)+") \\times ("+(num4-num2)+"))}{( "+num4+"^{2} \\times ("+num4+" - 1))}\\]"
          temp += "\\[\\space = \\space \\frac{ ("+num2+" \\times "+num3+" \\times ("+(num4-num3)+") \\times ("+(num4-num2)+"))}{( "+num4+"^{2} \\times ("+(num4-1)+"))}\\]"
          temp += "\\[\\space = \\space \\frac{ ("+num2+" \\times "+num3+" \\times ("+(num4-num3)+") \\times ("+(num4-num2)+"))}{"+(num4*num4*(num4-1))+"}\\]"
          temp += "\\[\\space = \\space \\frac{ ("+(num2*num3)+" \\times ("+(num4-num3)+") \\times ("+(num4-num2)+"))}{"+(num4*num4*(num4-1))+"}\\]"
          temp += "\\[\\space = \\space \\frac{ "+(num2*num3*(num4-num3)(num4-num2))+" }{"+(num4*num4(num4-1))+"}\\]"
          temp += "\\[\\space = \\space "+d.toFixed(3)+"\\]"
          temp += "\\[Hence, \\space the \\space values \\space Hypergeometric \\space Standard \\space Deviation \\space is,\\]"
          temp += "\\[\\space = "+d.toFixed(3)+" \\]"
  
          output.innerHTML = temp;
     
      }
      renderMathInElement(output);
  }
  function hypergeosvar2cal() {
      var num1=parseFloat(document.getElementById("hypergeos12").value);
      var num2=parseFloat(document.getElementById("hypergeos22").value);
      var num3=parseFloat(document.getElementById("hypergeos32").value);
      var num4=parseFloat(document.getElementById("hypergeos42").value);
  
      var d= (num2*num3*(num4-num3)*(num4-num2))/(num4*num4*(num4-1));
      var ans = Math.sqrt(d);
      var output = document.getElementById("hypergeos2ans");
      var temp ="";
      if(isNaN(num2) || isNaN(num1) || isNaN(num3) || isNaN(num4)) {
          temp = "\\[Please \\space fill \\space all \\space the \\space field\\]";
  
          output.innerHTML = temp;
      } 
      else {
          temp += "\\[Hypergeometric \\space Standard \\space Deviation \\space will \\space be,\\]"
          temp += "\\[\\space = \\space \\frac{ ("+num2+" \\times "+num3+" \\times ("+num4+" - "+num3+") \\times ("+num4+" - "+num2+"))}{( "+num4+"^{2} \\times ("+num4+" - 1))}\\]"
          temp += "\\[\\space = \\space \\frac{ ("+num2+" \\times "+num3+" \\times ("+(num4-num3)+") \\times ("+(num4-num2)+"))}{( "+num4+"^{2} \\times ("+num4+" - 1))}\\]"
          temp += "\\[\\space = \\space \\frac{ ("+num2+" \\times "+num3+" \\times ("+(num4-num3)+") \\times ("+(num4-num2)+"))}{( "+num4+"^{2} \\times ("+(num4-1)+"))}\\]"
          temp += "\\[\\space = \\space \\frac{ ("+num2+" \\times "+num3+" \\times ("+(num4-num3)+") \\times ("+(num4-num2)+"))}{"+(num4*num4*(num4-1))+"}\\]"
          temp += "\\[\\space = \\space \\frac{ ("+(num2*num3)+" \\times ("+(num4-num3)+") \\times ("+(num4-num2)+"))}{"+(num4*num4*(num4-1))+"}\\]"
          temp += "\\[\\space = \\space \\frac{ "+(num2*num3*(num4-num3)*(num4-num2))+" }{"+(num4*num4*(num4-1))+"}\\]"
          temp += "\\[\\space = \\space "+d.toFixed(3)+"\\]"
          temp += "\\[Hence, \\space the \\space values \\space Hypergeometric \\space Standard \\space Deviation \\space is,\\]"
          temp += "\\[\\space = \\sqrt{"+d.toFixed(2)+"} \\]"
          temp += "\\[\\space = "+ans.toFixed(3)+" \\]"
  
          output.innerHTML = temp;
     
      }
      renderMathInElement(output);
  }
  
  function egccal()
  {
      var num1=document.getElementById("egc1").value;
      var num2=document.getElementById("egc2").value;
      var num3=document.getElementById("egc3").value;
      ans="";
      let explain="";
      if(num1==""||num2==""||num3=="")
      {
          ans="\\[Please \\space fill \\space all \\space the \\space field\\]";
      }
      else
      {
          num1=parseFloat(num1);
          num2=parseFloat(num2);
          num3=parseFloat(num3);
          var si=(num1*((1+(num2/100))**num3)).toFixed(3);
          ans="\\[The \\space effective \\space rate \\space of \\space growth \\space is: "+si+"\\]";
          explain="\\[x(t)="+num1+"(1+\\frac{"+num2+"}{100})^"+num3+"\\]"+"\\[\\space "+num1+"("+((1+(num2/100))**num3).toFixed(3)+")\\]"+"\\[\\space ="+si+"\\]";
     
      }
      document.getElementById("egcans").innerHTML=ans;
      document.getElementById("egcexplain").innerHTML=explain;
      renderMathInElement(document.getElementById("egcans"));
      renderMathInElement(document.getElementById("egcexplain"));
  }
  function iskaprekar(n)
  {
      if (n == 1)
      return true;
      let sq_n = n * n;
      let count_digits = 0;
      while (sq_n)
      {
          count_digits++;
          sq_n = parseInt(sq_n / 10);
      }
   
      let sq_n1 = n * n; 
      for (let r_digits = 1;
          r_digits < count_digits;
          r_digits++)
      {
          let eq_parts = Math.pow(10, r_digits);
          if (eq_parts == n)
              continue;
          let sum = parseInt((sq_n1 / eq_parts) +
                      sq_n1 % eq_parts);
          if (sum == n)
          return true;
      }
      return false;
  }
  function kapfind()
  {
      let num=document.getElementById("kap1").value;
      let ans="";
      if(num==""||isNaN(num))
      {
          ans+="Please enter proper number";
      }
      else
      {
        ans += "Step 1: Number => " + num;
        ans += `<br> Step 2: The Square of ${num} => ${num}^2 = ${Math.pow(num,2)}`;
        if(iskaprekar(num))
        {
          ans += `<br> Step 3: The square can be divided into two parts <br>and such that sum of parts is equal to the original number `;
          ans += `<br> Step 4: Hence ${num} is a Kaprekar Number `;
        }
        else
        {
          ans += `<br> Step 3: The square can't be divided into two parts <br>and such that sum of parts is equal to the original number `;
          ans += `<br> Step 4: Hence ${num} is not a Kaprekar Number `;
        }
      }
      document.getElementById("kapans").innerHTML=ans;
  }
  
  function isPrime( n)
      {
          if (n <= 1)
              return false;
          if (n <= 3)
              return true;
          if (n % 2 == 0 || n % 3 == 0)
              return false;
   
          for (var i = 5; i * i <= n; i = i + 6) {
              if (n % i == 0 || n % (i + 2) == 0) {
                  return false;
              }
          }
          return true;
      }
     
  function wagcal()
  {
      var num1=document.getElementById("wag1").value;
      ans="";
      if(num1==""||isNaN(num1))
      {
          ans="Please enter the number";
      }
      else
      {
          num1=parseInt(num1);
          if(isPrime(num1) && (isPowerOfTwo(num1 * 3 - 1)))
          {
              ans=num1+" is a Wagstaff number"
          }
          else
          {
              ans=num1+" is not a Wagstaff number"   
          }
      }
      document.getElementById("wagans").innerHTML=ans;
  }
  
  function Ranges()
  {
     var num = document.getElementById('getNum').value;
      
      valid=/^([-]{0,1}\d{1,}[\.]{0,1}\d{0,}[ ]?)*$/
  
  
      if(num=="")
      {
         document.getElementById('Meanresult').innerHTML = "Please enter number";
      }
      else if(!valid.test(num))
      {
          document.getElementById('Meanresult').innerHTML = "Enter space separated numbers. Use of alphabets and special character is not allowed for calculation purpose";
      }
      else
      {
          num=num.trim();
          num = num.split(" ");
          var len=parseInt(num.length);
         
          var number=[]
          for (var i = 0; i < len; i++) {
              number[i] = parseFloat(num[i].trim());
          }
  
          var max=Math.max(...number);
          var min=Math.min(...number);
  
          var d=max-min;
  
         var ans= "The highest number is: "+max;
          ans+="<br> The lowest number is: "+min;
          ans+="<br>The Range is: "+max+" -"+" "+min+" = "+d;
          document.getElementById('Meanresult').innerHTML = ans;
  
          document.getElementById('Meanresult').innerHTML = "Range is: "+d;
  
  
  
  }
  }
  
  
  
      function isPowerOfTwo(n)
      {
          return (n != 0 )&& ((n & (n - 1)) == 0);
      }
  
  
  function wagcal()
  {
      var num1=document.getElementById("wag1").value;
      ans="";
      explain="";
      if(num1==""||isNaN(num1))
      {
          ans="\\[Please \\space enter \\space the \\space number\\]";
      }
      else
      {
          num1=parseInt(num1);
          if(isPrime(num1) && (isPowerOfTwo(num1 * 3 - 1)))
          {
              ans="\\["+num1+" is \\space a \\space Wagstaff \\space number.\\]"
              explain="\\["+num1+"\\space is \\space prime \\space and \\space"+num1+"="+"\\frac{2^{"+Math.log2(num1*3-1)+"}-1}{3}\\]";
          }
          else
          {
              ans=num1+" is not a Wagstaff number"   
          }
      }
      document.getElementById("wagans").innerHTML=ans+explain;
      renderMathInElement(document.getElementById("wagans"))
  }
  
  function factorialsol() {
      let factorialVal = document.getElementById("factorialval").value;
      if (factorialVal != "") {
          let factorialsolprint = document.getElementById("factorialsolprint");
  
          let answer = factorial(factorialVal);
  
          factorialsolprint.innerHTML = factorialVal + " ! = " + answer;
      }
      else {
          factorialsolprint.innerHTML = "Please enter a valid number.";
      }
  }
  