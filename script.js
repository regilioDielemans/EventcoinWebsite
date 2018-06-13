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
                alert("Het ingevoerde wachtwoord is incorrect. \nProbeer het opnieuw.");
            }
            if (json.code == 412) {
                alert("U heeft een van de velden opengelaten. \nProbeer het opnieuw. ");
            }
        }
    }
    var emailInput = $('#exampleInputEmail1').val()
    var passInput = $('#exampleInputPassword1').val()

    console.log(emailInput + ", " + passInput);

    var data = JSON.stringify({"email":emailInput,"password":passInput});
    xhr.send(data);
    console.log(data)
}

function addfestival(){ 
    var token = sessionStorage.token
    var requestToken = token;
    xhr = new XMLHttpRequest();
    var url = "https://ueg.herokuapp.com/http://eventcoin.herokuapp.com/api/festival";
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.setRequestHeader("X-Access-Token",requestToken)
    console.log(requestToken)
    xhr.onreadystatechange = function () { 
        if (xhr.readyState == 4 && xhr.status == 200) {
            var json = JSON.parse(xhr.responseText);

            if (json.code == 412) {
                alert("U heeft iets verkeerd ingevoerd.")
            }
        }
    }
        var festivalName = $('#festivalName').val()
        var festivalLocation = $('#festivalLocation').val()
        var festivalMapUrl = $('#festivalMapUrl').val()
        var festivalStart = $('#festivalStart').val()
        var festivalEnd = $('#festivalEnd').val()
        var festivalCoinPrice = $('#festivalCoinPrice').val()
        var coinPriceParsed = parseInt(festivalCoinPrice);
        var festivalDescNL = $('#festivalDescNL').val()
        var festivalDescEN = $('#festivalDescEN').val()
        var festivalPhotoUrl = $('#festivalPhotoUrl').val()
        var festivalCollectionId = $('#festivalCollectionId').val()
        var collectionIdParsed = parseInt(festivalCollectionId);
        var festivalVideoUrl = $('#festivalVideoUrl').val()
        var festivalSponsors = $('#festivalSponsors').val()
        var festivalProducts = $('#festivalProducts').val()
        var productsParsed = parseInt(festivalProducts);

        var lineUpStartDate = $('#lineUpStartDate').val()
        var lineUpEndDate = $('#lineUpEndDate').val()
        var lineUpArtist = $('#lineUpArtist').val()
        var artistIdParsed = parseInt(lineUpArtist);
        var lineUpStage = $('#lineUpStage').val()

        var data = JSON.stringify({"name":festivalName,
            "location":festivalLocation,
            "map":festivalMapUrl,
            "dateStart":festivalStart,
            "dateEnd":festivalEnd,
            "coinPrice":coinPriceParsed,
            "descriptionNL":festivalDescNL,
            "descriptionEN":festivalDescEN,
            "imageUrl":festivalPhotoUrl,
            "collectionId":collectionIdParsed,
            "trailerUrl":festivalVideoUrl,
            "sponsorArray":[festivalSponsors],
            "lineUp":   [{  "dateStart" : lineUpStartDate, 
                            "dateEnd" : lineUpEndDate, 
                            "artist" : 
                            { 
                                "id" : artistIdParsed 
                            }, 
                            "stage" : lineUpStage}],
            "products": [{ 
                "id" : productsParsed
            }]
    })

        xhr.send(data);
        console.log(data);
}

$.put = function(url, data, callback, type){
 
  if ( $.isFunction(data) ){
    type = type || callback,
    callback = data,
    data = {}
  }
 
  return $.ajax({
    url: url,
    type: 'PUT',
    success: callback,
    data: data,
    contentType: type
  });
}

function editArtist(){
    var url = "https://ueg.herokuapp.com/http://eventcoin.herokuapp.com/api/artist";
    var editArtistId = $('#editArtistId').val()
    var newArtistName = $('#editArtistName').val();
    var newArtistUrl = $('#editArtistUrl').val()
    $.put(url, {id: editArtistId, name: newArtistName, url: newArtistUrl}, function(result){
        console.log(result)
    })
}


function editfestival(festvalid){ 
    console.log(festvalid)
    window.open("http://localhost/eventcoinwebsite/editfestival.html?id=" + festvalid, "_self")

}

function openWindow(){
    window.open("http://localhost/eventcoinwebsite/homepage.html", "_self")
}