function UserLogin() {
	var params = "userId=5&firstname=voornaam&insertion=van de&lastname=achternaam&dateOfBirth=1999-05-23&email=naam@avans.nl&role=1";
	var url = "https://eventcoin.herokuapp.com/api/login";

    var xhttp = new XMLHttpRequest();

    xhttp.open("POST", url, true);
    xhttp.setRequestHeader("Content-type", "application/json");
   
    var data = {"email": "test@avans.nl", "password": "test"};
    xhttp.send(data);
    xhttp.onreadystatechange = function(){
    	if (xhttp.readyState === 4 && xhttp.status === 200) {
    		var json = JSON.parse(xhttp.responseText);
    		console.log(json.email + ", " + json.password);
    	}
    }
    //console.log(data)
   	//var response = xhttp.responseText;
   	//console.log(response);
   		//console.log(response);
    //document.getElementById(responsP).innerHTML = response;
}