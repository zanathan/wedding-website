var verify_from_code = function (code) {
    var app_url = "https://script.google.com/macros/s/AKfycbyAgYTVPiR6Vo7VSPLhtRhHPGUoUsvaygx5ECwSOHDC7_2u4f_doZ00Dp0h-LdIrLI/exec";
    app_url = app_url + "?code=" + code + "&verifyonly=" + true;
    var data_response = {};
    $.ajax({
        url: app_url,
        method: "GET",
        async: false,
        dataType: "json",
        success: function (response) {
            data_response = response
        },
        error: function () {
            alert("The form failed. Please let Jonathan know and try again later.")
            data_response = {}
        }
    });
    return data_response;
};

var accommodation_from_code = function (code) {
    var app_url = "https://script.google.com/macros/s/AKfycbwY7v4_PkpA7ZzIwuuglhA-Ovusz_K2NeUmfvlz9E-TOJ37WrjGqpAF_R29VNeJZ3f4/exec";
    app_url = app_url + "?code=" + code;
    var data_response = {};
    $.ajax({
        url: app_url,
        method: "GET",
        async: false,
        dataType: "json",
        success: function (response) {
            data_response = response
        },
        error: function () {
            alert("The form failed. Please let Jonathan know and try again later.")
            data_response = {}
        }
    });
    return data_response;
};

var accommodation_option = function (){
    return (`<h3>You're invited to stay at the venue with us!</h3>
    <p>
        If this message has popped up, it only means one thing:<br/>
        you are among the elite few who have been selected to spend your whole weekend on the property with us. (woohoo)<br/>
        Please let us know in the RSVP section if you will be staying at the venue. <br/><br/>

        The venue has asked to please not be contacted, so please let us know if you have any questions.<br/>
        The cost of your accomidation includes your accommodation and all meals.
    </p>`)
}

window.onload = function () {
    var url = document.location.href,
        params = url.split('#')[0].split('?')[1].split('&'),
        data = {}, tmp;
    for (var i = 0, l = params.length; i < l; i++) {
         tmp = params[i].split('=');
         data[tmp[0]] = tmp[1];
    }
    var valid_data = verify_from_code(data.id);
    document.getElementById('validation-code').value = data.id;
    var innerHtml = "";
    if(valid_data.valid === false){
        window.location.href = "index.html";
    }
    if (valid_data.valid === true && valid_data.has_accommodation === true){
        innerHtml = accommodation_option();
    }
    document.getElementById('here').innerHTML = innerHtml;
    document.getElementById('loading').style.display = "none";
};

function addIDToURL(baseurl, path) {
    var code = document.getElementById('validation-code').value;
    var newURL = baseurl;

    if(code){
        newURL = newURL+'?id='+code+path;
    }

    window.location=newURL;
}