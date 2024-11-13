var data_div = function (valid_data){
    var innerHtml = `<form id="rsvp-submission" class="rsvp-submission">
        `;
    valid_data.data.forEach(function (item, index) {
        checked="";
        style="";
        if(item.rsvp===true){
            checked = "checked";
        }
        if(item.plus_one_allowed===false){
            style="display: none;"
        }
        innerHtml += `<div class="rsvp-submission-input-group">
                        <input type="text" name="name" id="name-`+index+`"                              
                            placeholder="Name" required value="`+item.name+`">
                    </div>
                    <div class="rsvp-submission-input-group">
                        <input type="text" name="surname" id="surname-`+index+`"                              
                            placeholder="Surname" required value="`+item.surname+`">
                    </div>
                    <div class="rsvp-submission-input-group">
                        <input type="text" name="email" id="email-`+index+`"                              
                            placeholder="Email address" required value="`+item.email+`">
                    </div>
                    <div class="rsvp-submission-input-group">
                        <input type="checkbox" name="rsvp_checkbox" id="rsvp-`+index+`" title="Tick the box to mark as attending."
                            required `+checked+`>
                    </div>
                    <div class="rsvp-submission-input-group">
                        <input type="text" name="menu" id="menu-`+index+`"
                            placeholder="Menu" required value="`+item.menu+`">
                    </div>
                    <div class="rsvp-submission-input-group">
                        <input type="text" name="song" id="song_request-`+index+`"
                            placeholder="Song Request. It probably won't play but if you had a song you want to hear put it here." required value="`+item.song_request+`">
                    </div>
                    <button type="button" id="button-1-`+index+`" class="btn-fill rsvp-submission-btn" onclick="add_plus_one(`+index+`)" style="`+style+`">
                        Add Plus One
                    </button>
                    <button type="button" id="remove_button-1-`+index+`" class="btn-fill rsvp-submission-btn" onclick="remove_plus_one(`+index+`)" style="display: none;">
                        Remove Plus One
                    </button>
                    <div id="new_person-`+index+`"></div>
                    `
    });
    innerHtml += `<button type="button" id="button-0" class="btn-fill rsvp-submission-btn" onclick="on_data_submit()">
                        Submit
                    </button>
                </form>
                `
    return innerHtml;
}

var data_from_code = function (code) {
    var app_url = "https://script.google.com/macros/s/AKfycbxH95kr0KyKgrcj16YKH6UTRl_Y_GhGCJt9FFOSJnkFrQscAP4F_vFiXqpZaWyaOUw/exec";
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
        params = url.split('?')[1].split('&'),
        data = {}, tmp;
    for (var i = 0, l = params.length; i < l; i++) {
         tmp = params[i].split('=');
         data[tmp[0]] = tmp[1];
    }
    var valid_data = data_from_code(data.id);
    document.getElementById('validation-code').value = data.id;
    var innerHtml = "That is not a valid code!"
    if (valid_data.valid === true){
        innerHtml = data_div(valid_data);
    }
    document.getElementById('here').innerHTML = innerHtml;
};

var on_data_submit = function (e) {
    var elements = document.getElementById('rsvp-submission').elements;
    var code = document.getElementById('validation-code').value;
    var data = [];
    var new_people = [];
    var count = -1;
    for (var i = 0; i < elements.length; i++){
        var id = elements[i].id.split('-');
        var title = id[0];
        var pos = parseInt(id[1]);
        var dict = {
            "validation_code": code,
            "plus_one_allowed": false
        };

        if(title === 'button' && pos === 1 && count<new_people.length){
            count=count+1;
        }
        
        if (title.split('_')[0] === 'new'){
            if(new_people.length===count){
                new_people[count] = dict;
            }
            else{
                dict = new_people[count];
            }
            title = title.replace("new_", "")
            if( title === 'rsvp'){
                dict[title] = elements[i].checked;
            }
            else{
                dict[title] = elements[i].value;
            }
            new_people[count] = dict;
        }
        else if(title !== 'button' && title !== 'remove_button'){
            if(data.length<=pos){
                data[pos] = dict;
            }
            else{
                dict = data[pos];
            }

            if( title === 'rsvp'){
                dict[title] = elements[i].checked;
            }
            else{
                dict[title] = elements[i].value;
            }
            data[pos] = dict
        }
    }
    rsvp_data = {
        "code": code,
        "rsvps": data,
        "plus_ones": new_people
    }
    update_rsvp_details(rsvp_data);
        
    window.location.href = "rsvp.html?id="+encodeURIComponent(code);
};

// update details
var update_rsvp_details = function (data) {
    var app_url = "https://script.google.com/macros/s/AKfycbxH95kr0KyKgrcj16YKH6UTRl_Y_GhGCJt9FFOSJnkFrQscAP4F_vFiXqpZaWyaOUw/exec";
    $.ajax({
        url: app_url,
        method: "POST",
        async: false,
        dataType: "json",
        data: JSON.stringify(data),
        success: function () {
            alert("The form was submitted successfully.")
        },
        error: function () {
            alert("The form failed. Please let Jonathan know and try again later.")
        }
    });
};

var remove_plus_one = function (index){
    document.getElementById('remove_button-1-'+index).style.display = "none";
    document.getElementById('button-1-'+index).style.display = "";
    document.getElementById('new_person-'+index).innerHTML = "";
};

var add_plus_one = function (index){
    document.getElementById('remove_button-1-'+index).style.display = "";
    document.getElementById('button-1-'+index).style.display = "none";
    innerHtml= `<div class="rsvp-submission-input-group">
                        <input type="text" name="name" id="new_name-`+index+`"                              
                            placeholder="Name" required value="">
                    </div>
                    <div class="rsvp-submission-input-group">
                        <input type="text" name="surname" id="new_surname-`+index+`"                              
                            placeholder="Surname" required value="">
                    </div>
                    <div class="rsvp-submission-input-group">
                        <input type="text" name="email" id="new_email-`+index+`"                              
                            placeholder="Email address" required value="">
                    </div>
                    <div class="rsvp-submission-input-group">
                        <input type="checkbox" name="rsvp_checkbox" id="new_rsvp-`+index+`" title="Tick the box to mark as attending."
                            required>
                    </div>
                    <div class="rsvp-submission-input-group">
                        <input type="text" name="menu" id="new_menu-`+index+`"
                            placeholder="Menu" required value="">
                    </div>
                    <div class="rsvp-submission-input-group">
                        <input type="text" name="song" id="new_song_request-`+index+`"
                            placeholder="Song Request. It probably won't play but if you had a song you want to hear put it here." required value="">
                    </div>`
    document.getElementById('new_person-'+index).innerHTML = innerHtml;
}