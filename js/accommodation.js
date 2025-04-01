var data_from_code = function (code) {
    var app_url = "https://script.google.com/macros/s/AKfycbwkH0SRfKrXb5EQdZZ8lrNAXd9U09kmWWXL22WiUnr7v56iuv3MWIRKJ_7WqwN1NwY/exec";
    app_url = app_url + "?code=" + code + "&verifyonly=" + false;
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

window.onload = function () {
    var url = document.location.href,
        params = url.split('#')[0].split('?')[1].split('&'),
        data = {}, tmp;
    for (var i = 0, l = params.length; i < l; i++) {
         tmp = params[i].split('=');
         data[tmp[0]] = tmp[1];
    }
    var valid_data = data_from_code(data.id);
    document.getElementById('validation-code').value = data.id;
    var innerHtml = "That is not a valid code!";
    if(valid_data.valid === false){
        window.location.href = "index.html";
    }
    if (valid_data.valid === true){
        innerHtml = "Extra Things to Come!";
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