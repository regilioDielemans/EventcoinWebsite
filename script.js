function login(){
    xhr = new XMLHttpRequest();
    var url = "https://ueg.herokuapp.com/http://eventcoin.herokuapp.com/api/login";
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.onreadystatechange = function () { 
        if (xhr.readyState == 4 && xhr.status == 200) {
            var json = JSON.parse(xhr.responseText);         
            
            if (json.role == 0) {
                document.getElementById("redirectText").removeAttribute("hidden");
                console.log("The email adress: " + json.email + " has logged in")
                console.log(json.token)
                sessionStorage.token = json.token;
                setTimeout(openWindow, 0);
            }else{
                alert("U heeft geen administrator rechten.");
            }
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

function addfestival(){ 
    var token = sessionStorage.token
    var requestToken = "bearer " + token;
    xhr = new XMLHttpRequest();
    var url = "https://eventcoin.herokuapp.com/api/festival";
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.setRequestHeader("Authorization",requestToken)
    console.log("voor onreadyStatechange")
    xhr.onreadystatechange = function () { 
        if (xhr.readyState == 4 && xhr.status == 200) {
            var json = JSON.parse(xhr.responseText);
            if(xhr.readyState == 4 && xhr.status == 412){
                var json = JSON.parse(xhr.responseText);
            }
        }
    
        console.log("in onreadyStatechange")
        var festivalName = document.getElementById('festivalName').value
        var festivalLocation = document.getElementById('festivalLocation').value
        var festivalMapUrl = document.getElementById('festivalMapUrl').value
        var festivalStart = document.getElementById('festivalStart').value
        var festivalEnd = document.getElementById('festivalEnd').value
        var festivalCoinPrice = document.getElementById('festivalCoinPrice').value
        var festivalDescNL = document.getElementById('festivalDescNL').value
        var festivalDescEN = document.getElementById('festivalDescEN').value
        var festivalPhotoUrl = document.getElementById('festivalPhotoUrl').value
        var festivalVideoUrl = document.getElementById('festivalVideoUrl').value

        var festivalCollectionId = 999;
        var data = JSON.stringify({"name":festivalName,"location":festivalLocation,"map":festivalMapUrl,"dateStart":festivalStart,"dateEnd":festivalEnd,"coinPrice":festivalCoinPrice,"descriptionNL":festivalDescNL,"descriptionEN":festivalDescEN,"imageUrl":festivalPhotoUrl,"collectionId":festivalCollectionId,"trailerUrl":trailerUrl,"sponsorArray":[],"lineUp":[]})
        xhr.send(data);
        console.log(data);
    }
}

function openWindow(){
    window.open("http://localhost/eventcoinwebsite/homepage.html", "_self")
}