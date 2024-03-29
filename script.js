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
    // var token = sessionStorage.token
    // var requestToken = token;
    // xhr = new XMLHttpRequest();
    // var url = "https://ueg.herokuapp.com/http://eventcoin.herokuapp.com/api/festival";
    // xhr.open("POST", url, true);
    // xhr.setRequestHeader("Content-type", "application/json");
    // xhr.setRequestHeader("X-Access-Token",requestToken)
    // console.log(requestToken)
    // xhr.onreadystatechange = function () { 
    //     if (xhr.readyState == 4 && xhr.status == 200) {
    //         var json = JSON.parse(xhr.responseText);
    //         console.log(json)
    //         if (json.code == 412) {
    //             alert("U heeft iets verkeerd ingevoerd.")
    //         }
    //     }
    // }
        var festivalName = $('#festivalName').val()
        var festivalLocation = $('#festivalLocation').val()
        var festivalMapUrl = $('#festivalMapUrl').val()
        var festivalStart = $('#festivalStart').val()
        var festivalEnd = $('#festivalEnd').val()
        var festivalCoinPrice = $('#festivalCoinPrice').val()
        var coinPriceParsed = parseFloat(festivalCoinPrice).toFixed(2);
        var festivalDescNL = $('#festivalDescNL').val()
        var festivalDescEN = $('#festivalDescEN').val()
        var festivalPhotoUrl = $('#festivalPhotoUrl').val()
        var festivalCollectionId = $('#festivalCollectionId').val()
        var collectionIdParsed = parseFloat(festivalCollectionId).toFixed(2);
        var festivalVideoUrl = $('#festivalVideoUrl').val()
        var festivalProducts = $('#festivalProducts').val()
        var productsParsed = parseInt(festivalProducts);



        var sponsors = _sponsors;
        var lineup = _lineup;
        var products = [{id:productsParsed}]
        var data = {
            name:festivalName,
            location:festivalLocation,
            map:festivalMapUrl,
            dateStart:festivalStart,
            dateEnd:festivalEnd,
            coinPrice:coinPriceParsed,
            descriptionNL:festivalDescNL,
            descriptionEN:festivalDescEN,
            imageUrl:festivalPhotoUrl,
            collectionId:collectionIdParsed,
            trailerUrl:festivalVideoUrl,
            sponsorArray:sponsors,
            lineUp:lineup,
            products:products
        } 
        var token = sessionStorage.token;
		console.log(token);
		$.ajax({
			url: 'http://ueg.herokuapp.com/http://eventcoin.herokuapp.com/api/festival',
			type: 'POST',
			dataType: 'json',
			data: data,
			headers:{
				'X-Access-Token': token
			},
			error: function(xhr, textStatus){
				console.log(xhr);
				if (xhr.status == 200) {
					alert("Wijziging successvol doorgevoerd!")
					window.open("/eventcoinwebsite/editartist.html", "_self")
				}
                else{
                    var err = JSON.parse(xhr.responseText)
                    alert("Error: " + xhr.status + "\nMelding: " + err.message)
                }
			}
		});
}


function editArtistFunction() {
            var token = sessionStorage.token;
            var editArtistId = parseInt($('#editArtistId').val())
            var editArtistName = $('#editArtistName').val()
            var editArtistUrl = $('#editArtistUrl').val()
            var data = {id:editArtistId, name: editArtistName, url: editArtistUrl}
            $.ajax({
                url: 'https://ueg.herokuapp.com/http://eventcoin.herokuapp.com/api/artist',
                type: 'PUT',
                dataType: 'json',
                data: data,
                headers:{
                    'X-Access-Token': token
                },
                error: function(xhr, textStatus){
                    if (xhr.status == 200) {
                        alert("Wijziging successvol doorgevoerd!")
                        window.open("/eventcoinwebsite/editartist.html", "_self")
                    }
                    if (xhr.status == 412) {
                        var err = JSON.parse(xhr.responseText);
                        if (err.message == "there doesn't exist an artist with this id") {
                            alert("Het ingevoerde ID is ongeldig.")
                        }
                        if (err.message == "the property `name` is missing") {
                            alert("U heeft geen naam ingevoerd.")
                        }
                        if (err.message == "the property `url` is missing") {
                            alert("U heeft geen website url ingevoerd.")
                        }
                    }
                }
            });
        }

function editSponsor(){
    var token = sessionStorage.token;
    var editFestivalId = parseInt($('#editSponsorFestivalId').val())
    var editFestivalImage = $('#editSponsorImageUrl').val()
    var editFestivalSite = $('#editSponsorSiteUrl').val()
    var data = {id:editFestivalId, imageUrl:editFestivalImage, siteUrl:editFestivalSite}
    $.ajax({
        url: 'https://ueg.herokuapp.com/http://eventcoin.herokuapp.com/api/sponsor',
        type: 'PUT',
        dataType: 'json',
        data: data,
        headers:{
                    'X-Access-Token': token
                },
                error: function(xhr, textStatus){
                        if (xhr.status == 412) {
                            var err = JSON.parse(xhr.responseText);
                    if (err.message == "No sponsor exists with this id") {
                        alert("Het ingevoerde ID is ongeldig.")
                    }
                    if (err.message == "imageUrl is empty") {
                        alert("U heeft geen Url ingevoerd voor de foto.")
                    }
                    if (err.message == "siteUrl is empty") {
                        alert("U heeft geen Url ingevoerd voor de website.")
                    }
                    }
                    if (xhr.status == 200) {
                        alert("Wijziging successvol doorgevoerd!")
                        window.open("/eventcoinwebsite/editsponsor.html", "_self")
                    }
                }
        });
}

function editfestival(festvalid){ 
    window.open("editfestival.html?id=" + festvalid, "_self")

}
function festivalstatistiek(collectionId, festivalName){ 
    window.open("statistiekenfestival.html?collectionId=" + collectionId,"_self")

}

function openWindow(){
    window.open("homepage.html", "_self")
}