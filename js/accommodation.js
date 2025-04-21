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
    var app_url = "https://script.google.com/macros/s/AKfycbzYSaFRPy41wYRDn_f_YbRPAVjX9zsEOXV20O3iPy4uX00yiPJv42OE_H7xDOJxuS4/exec";
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
        You have been selected to stay at the wedding venue. Please indicate you will be taking the accommodation when you rsvp. <br/>
        Accommodation option: ${data.Room_Option}
    </p>`
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
    console.log(valid_data);
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