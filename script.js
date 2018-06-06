function UserLogin() {
var params = 'name'

    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "https://eventcoin.herokuapp.com/api/login", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    xhttp.send();
    var response = JSON.parse(xhttp.responseText);
}