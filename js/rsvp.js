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
        innerHtml += `<div class="container">
                        <div class="row rsvp-submission-input-group">
                            <div class="col-md-10 col-md-offset-1">
                                <label for="name-`+index+`">Name:</label>
                                <input type="text" name="name" id="name-`+index+`"                              
                                    placeholder="Name" required value="`+item.name+`" disabled>&nbsp;
                            </div>
                            <div class="col-md-10 col-md-offset-1">
                                <label for="surname-`+index+`">Surname:</label>
                                <input type="text" name="surname" id="surname-`+index+`"                              
                                    placeholder="Surname" required value="`+item.surname+`" disabled>&nbsp;
                            </div>
                            <div class="col-md-10 col-md-offset-1">
                                <label for="rsvp-`+index+`">Tick this box to mark as attending:</label>
                                <input type="checkbox" class="rsvp-submission-checkbox" name="rsvp_checkbox" id="rsvp-`+index+`" title="Tick the box to mark as attending."
                                    required `+checked+`>
                            </div>
                            <div class="col-md-10 col-md-offset-1">
                                <label for="email-`+index+`">Enter your email adress:</label>
                                <input type="text" name="email" id="email-`+index+`"                              
                                    placeholder="Email address" required value="`+item.email+`">
                            </div>
                            <div class="col-md-10 col-md-offset-1">
                                <label for="dietry_requirements-`+index+`">Dietry Requirements:</label><br>
                                <textarea style="height: 56px;" name="dietry_requirements" id="dietry_requirements-`+index+`" 
                                placeholder="Please list any dietry requirements we should be aware of." 
                                required rows="3" cols="50">`+item.dietry_requirements+`</textarea>
                            </div>
                            <div class="col-md-10 col-md-offset-1">
                                <label for="song_request-`+index+`">Song Request:</label><br>
                                <textarea name="song" id="song_request-`+index+`" 
                                placeholder="Song Request. It probably won't play but if you had a song you want to hear put it here." 
                                required rows="4" cols="50">`+item.song_request+`</textarea>
                            </div>
                        </div>
                        <button type="button" id="button-1-`+index+`" class="btn-fill rsvp-submission-btn" onclick="add_plus_one(`+index+`)" style="`+style+`">
                            Add Plus One
                        </button>
                        <button type="button" id="remove_button-1-`+index+`" class="btn-fill rsvp-submission-btn" onclick="remove_plus_one(`+index+`)" style="display: none;">
                            Remove Plus One
                        </button>
                        <div id="new_person-`+index+`"></div>
                    </div>
                    <br>
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
    var app_url = "https://script.google.com/macros/s/AKfycbxg6cfCjFvgdcbBghtEeNwZU354lSQlZSvuxM_UBHQGFdwZbcmq0qOtRQH7kF1kl3c/exec";
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
    document.getElementById('accommodation').value = valid_data.accommodation;
    var innerHtml = "That is not a valid code!"
    if (valid_data.valid === true){
        innerHtml = data_div(valid_data);
    }
    document.getElementById('here').innerHTML = innerHtml;
    document.getElementById('loading').style.display = "none";
};

var on_data_submit = function (e) {
    document.getElementById('loading').style.display = "block";
    setTimeout(function() {
        var elements = document.getElementById('rsvp-submission').elements;
        var code = document.getElementById('validation-code').value;
        var accommodation = document.getElementById('accommodation').value
        var data = [];
        var new_people = [];
        var count = -1;
        for (var i = 0; i < elements.length; i++){
            var id = elements[i].id.split('-');
            var title = id[0];
            var pos = parseInt(id[1]);
            var dict = {
                "validation_code": code,
                "plus_one_allowed": false,
                "has_rsvped": true,
                "accommodation": accommodation
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
            
        window.location.href = "home.html?id="+encodeURIComponent(code);
    }, 0);
};

// update details
var update_rsvp_details = function (data) {
    var app_url = "https://script.google.com/macros/s/AKfycbxg6cfCjFvgdcbBghtEeNwZU354lSQlZSvuxM_UBHQGFdwZbcmq0qOtRQH7kF1kl3c/exec"; 
    $.ajax({
        url: app_url,
        method: "POST",
        async: false,
        dataType: "json",
        data: JSON.stringify(data),
        success: function () {
            alert("The form was submitted successfully.");
        },
        error: function () {
            alert("The form failed. Please let Jonathan know and try again later.");
        }
    });
};

var remove_plus_one = function (index){
    document.getElementById('remove_button-1-'+index).style.display = "none";
    document.getElementById('button-1-'+index).style.display = "";
    document.getElementById('new_person-'+index).innerHTML = "";
};

var add_plus_one = function (index){
    is_going = document.getElementById('rsvp-'+index).checked
    if(is_going === false){
        alert("You cannot add a plus one if you aren't going. Please tick the box before adding a plus one.");
    }else{
        document.getElementById('remove_button-1-'+index).style.display = "";
        document.getElementById('button-1-'+index).style.display = "none";
        innerHtml= `<br>
                    <div class="container">
                        <div class="row rsvp-submission-input-group">
                            <div class="col-md-10 col-md-offset-1">
                                <label for="new_name-`+index+`">Name:</label>
                                <input type="text" name="name" id="new_name-`+index+`"                              
                                    placeholder="Name" required value="">&nbsp;
                            </div>
                            <div class="col-md-10 col-md-offset-1">
                                <label for="new_surname-`+index+`">Surname:</label>
                                <input type="text" name="surname" id="new_surname-`+index+`"                              
                                    placeholder="Surname" required value="">&nbsp;
                            </div>
                            <div class="col-md-10 col-md-offset-1" style="display: none;">
                                <label for="new_rsvp-`+index+`">Tick this box to mark as attending:</label>
                                <input type="checkbox" name="rsvp_checkbox" id="new_rsvp-`+index+`" title="Tick the box to mark as attending."
                                    required checked>
                            </div>
                            <div class="col-md-10 col-md-offset-1">
                                <label for="new_email-`+index+`">Enter your email adress:</label>
                                <input type="text" name="email" id="new_email-`+index+`"                              
                                    placeholder="Email address" required value="">
                            </div>
                            <div class="col-md-10 col-md-offset-1">
                                <label for="new_dietry_requirements-`+index+`">Dietry Requirements:</label><br>
                                <textarea style="height: 56px;" name="dietry_requirements" id="new_menu-`+index+`" 
                                placeholder="Please list any dietry requirements we should be aware of." 
                                required rows="3" cols="50">`+item.dietry_requirements+`</textarea>
                            </div>
                            <div class="col-md-10 col-md-offset-1">
                                <label for="new_song_request-`+index+`">Song Request:</label><br>
                                <textarea name="song" id="new_song_request-`+index+`" 
                                placeholder="Song Request. It probably won't play but if you had a song you want to hear put it here." 
                                required rows="4" cols="50"></textarea>
                            </div>
                        </div>
                    </div>
                    <br>`
        document.getElementById('new_person-'+index).innerHTML = innerHtml;
    }
}

function addIDToURL(baseurl, path) {
    var code = document.getElementById('validation-code').value;
    var newURL = baseurl;

    if(code){
        newURL = newURL+'?id='+code+path;
    }

    window.location=newURL;
}