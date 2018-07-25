/*  */
var btn = document.querySelector("button");

btn.addEventListener("click", showResults);

function quadraticSolver(){
    var a_input = document.querySelector("#a");
    var b_input = document.querySelector("#b");
    var c_input = document.querySelector("#c");

    var a = Number(a_input.value) || 0;
    var b = Number(b_input.value) || 0;
    var c = Number(c_input.value) || 0;

    var d = Math.pow(b, 2) - 4*a*c;

    if(d < 0){
      var x1 = "(" + (-b) + " + " + (Math.sqrt(-d)) + "i)/" + 2*a;
      var x2 = "(" + (-b) + " - " + (Math.sqrt(-d)) + "i)/" + 2*a;
    } else {
      var x1 = String((-b + Math.sqrt(d)) / (2 * a));
      var x2 = String((-b - Math.sqrt(d)) / (2 * a));
    }
    
    return "x1: " + x1 + " - x2: " + x2;
    

}

function showResults(e){
  e.preventDefault();
  var result = quadraticSolver();
  var output = document.querySelector(".outputBox");
  output.textContent = result;
}