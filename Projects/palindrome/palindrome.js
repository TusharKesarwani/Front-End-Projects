function palindrome_check(){
  var str1 = document.getElementById("input").value;
  var str=str1.replace(/\s/g, "");
  if(isPalindrome(str)===true){
  document.getElementById("prog").innerHTML = `<b>"${str}"</b> is a palindrome!.`;
  document.getElementById("input").value="";
  
}
  else
  document.getElementById("prog").innerHTML = `<b>"${str}"</b> is not a palindrome!.`;
}
function isPalindrome(str1) {
  str=str1.toLowerCase();
  for (let i = 0; i < Math.floor(str.length / 2); i++)
  {
    var char1=str[i],char2=str[str.length - 1 - i];
    if (char1 !== char2)
    {
      return false;
    }

  }
  return true;
}
function reset(){
  document.getElementById("input").value="";
  document.getElementById("prog").innerHTML="";
}
