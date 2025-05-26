var verify_from_code = function (code) {
    var app_url = "https://script.google.com/macros/s/AKfycbxg6cfCjFvgdcbBghtEeNwZU354lSQlZSvuxM_UBHQGFdwZbcmq0qOtRQH7kF1kl3c/exec";
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

var accommodation_option = function (data){
    return `<p>
        You have been selected to stay at the wedding venue.<br/>
        Please indicate if you will be taking the accommodation when you rsvp.<br/>
        Accommodation option: ${data.room_option}<br/>
        Cost: ${data.cost}<br/>
        Please reach out to Jonathan or Rosanna to sort out payment for this accommodation.<br/>
        Please also note the accommodation includes dinner the night before the wedding and all breakfasts.
    </p>
    <div class="row">
        <div class="col-md-6 col-sm-12 col-xs-12 leftcol" text-align="right">
            <h5>Pay in Rands</h5>
            <p>Bank: FNB/RMB<br/>
            Account Holder: Jonathan Julyan<br/>
            Account Type: FNB Fusion Premier Account<br/>
            Account Number: 62436721254<br/>
            Branch Code: 250655<br/>
            Ref: ${data.code}</p>
        </div>
        <div class="col-md-6 col-sm-12 col-xs-12 rightcol">
            <h5>Pay in Euros</h5>
            <p>Revolut <br/>
            <a href="http://revolut.me/rosannada">@rosannada</a>
            </p>
        </div>
    </div>`
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
    if (valid_data.valid === true && valid_data.accommodation === true){
        var acc_data = accommodation_from_code(data.id);
        innerHtml = accommodation_option(acc_data.data[0]);
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