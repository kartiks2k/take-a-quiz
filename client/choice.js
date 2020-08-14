var e = document.getElementById("form-control");
console.log(e);
var strUser = e.options[e.selectedIndex].value;

var categoryChoice = "";

console.log(strUser);

if( strUser == 'any') {
  categoryChoice = "";
}
else {
  categoryChoice = "&category=" + strUser;
}
console.log(strUser);
console.log(categoryChoice);
