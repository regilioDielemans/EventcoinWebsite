function login(){
    xhr = new XMLHttpRequest();
    var url = "https://eventcoin.herokuapp.com/api/login";
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.onreadystatechange = function () { 
        if (xhr.readyState == 4 && xhr.status == 200) {
            var json = JSON.parse(xhr.responseText);
            console.log("The email adress: " + json.email + " has logged in")
            document.getElementById("redirectText").removeAttribute("hidden");
            setTimeout(openWindow, 3000);
        }
        if (xhr.readyState == 4 && xhr.status == 412) {
            var json = JSON.parse(xhr.responseText);
            if (json.code == 1) {
                alert("Het ingevoerde email adres is incorrect.\nProbeer het opnieuw.");
            }
            if (json.code == 2) {
                alert("Het ingevoerde wachtwoord is incorrect. \nProbeer het opnieuw.")
            }
        }
    }
    var emailInput = document.getElementById('exampleInputEmail1').value
    var passInput = document.getElementById('exampleInputPassword1').value

    console.log(emailInput + ", " + passInput);

    var data = JSON.stringify({"email":emailInput,"password":passInput});
    xhr.send(data);
}

function openWindow(){
    window.open("http://localhost/eventcoinwebsite/homepage.html", "_self")
}