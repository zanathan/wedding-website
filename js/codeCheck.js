window.onload = function () {
    var url = document.location.href,
        params = url.split('#')[0].split('?')[1].split('&'),
        data = {}, tmp;
    for (var i = 0, l = params.length; i < l; i++) {
         tmp = params[i].split('=');
         data[tmp[0]] = tmp[1];
    }
    setTimeout(function() {
        var valid_code = validate_code(data.id);
        if (valid_code === false){
            window.location.href = "index.html";
        }
    }, 0);
};

var validate_code = function (code) {
    var app_url = "https://script.google.com/macros/s/AKfycbwkH0SRfKrXb5EQdZZ8lrNAXd9U09kmWWXL22WiUnr7v56iuv3MWIRKJ_7WqwN1NwY/exec";
    app_url = app_url + "?code=" + code + "&verifyonly=" + true;
    var valid_code = false;
    $.ajax({
        url: app_url,
        method: "GET",
        async: false,
        dataType: "json",
        success: function (response) {
            if (response.valid === true) {
                valid_code = true;
            } else {
                valid_code = false;
            }
        },
        error: function () {
            valid_code = false
        }
    });
    return valid_code;
};