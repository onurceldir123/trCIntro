
function init() {
  next();
}

function clearComments(x) {
document.getElementById("comment0").innderHTML=" ";
document.getElementById("comment1").innderHTML=" ";
}

function parseCFiles(txt) {
  var startQuestion = txt.indexOf("/*");
  var endQuestion   = txt.indexOf("*/",startQuestion);
  var question      = txt.substring(startQuestion,endQuestion+2);
  console.log(question);
}
function myFunction(fnum) {
  console.log("myfunc");
  console.log(fnum.id);
  var txt =document.getElementById("myH").innerHTML;
  var x = txt.replace(/.* ([0-9]+)$/, '$1');
  console.log(txt);
  console.log(x);
  var test = data.c[parseInt(x)][parseInt(fnum.id.substring(1))];
  var t = document.getElementById(fnum.id).value;
  var tline = document.getElementById("comment"+(fnum.id.substring(1)));
  if (test.indexOf(t)!=0) {
  tline.innerHTML = data.comment[parseInt(x)][parseInt(fnum.id.substring(1))][1];
  } else if (test==t) {
  tline.innerHTML =data.comment[parseInt(x)][parseInt(fnum.id.substring(1))][0];
  }
}

function next() {
  var x = document.getElementById("myH");
  var y = document.getElementById("question0");
  if(x.innerHTML=="Lab 1"){
  x.innerHTML="Lab 1: Soru 1";
  y.innerHTML=data.questions.question1;
  document.getElementById("code").innerHTML=soruyaz(data.questions.code1);
  } else {
  
   x.innerHTML="Lab 1: Soru 2";
   y.innerHTML=data.questions.question2;
  document.getElementById("code").innerHTML=soruyaz(data.questions.code2);
  }

}
function soruyaz(soru){
    var i=0;
    return soru.replace(/(TAG[0-9]+)/g,function(number) {
    console.log(number);
    var tagin ='<input id="f'+i+'", type="text", value="", size="'+number.slice(3)+'" oninput="myFunction(f'+i+')">';
    
    console.log(tagin);
    console.log(i);
    i+=1;
    clearComments(i.toString());
       return tagin;});
  }

