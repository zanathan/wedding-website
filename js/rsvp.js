var eventCheckboxes = function (item, index, is_new, hide){
    hide_style="";
    var new_val = "";
    if(hide === true){
        hide_style="display: none;"
    }
    if(is_new === true){
        new_val = "new_" 
    }
    var has_dinner = "";
    var has_breakfast = "";
    var has_rejected = "";
    if(item.pre_wedding_dinner===true){
        has_dinner = "checked";
    }
    if(item.post_wedding_breakfast===true){
        has_breakfast = "checked";
    }
    if(item.not_attending_other_events===true){
        has_rejected = "checked";
    }
    return `<div class="col-md-10 col-md-offset-1">
        <label id="`+new_val+`pre_wedding_dinner_label-`+index+`" for="`+new_val+`pre_wedding_dinner-`+index+`" style="`+hide_style+`">Please send me the details for the Welcome Dinner:</label>
        <input type="checkbox" class="rsvp-submission-checkbox" name="dinner_checkbox" id="`+new_val+`pre_wedding_dinner-`+index+`" title="Please send me the details for the Welcome Dinner."
            required `+has_dinner+` style="`+hide_style+`" onclick={event_selected_toggle(`+index+`,`+is_new+`);}>
    </div>
    <div class="col-md-10 col-md-offset-1">
        <label id="`+new_val+`post_wedding_breakfast_label-`+index+`" for="`+new_val+`post_wedding_breakfast-`+index+`" style="`+hide_style+`">Please send me the details for the Farwell Breakfast:</label>
        <input type="checkbox" class="rsvp-submission-checkbox" name="breakfast_checkbox" id="`+new_val+`post_wedding_breakfast-`+index+`" title="Please send me the details for the Farwell Breakfast."
            required `+has_breakfast+` style="`+hide_style+`" onclick={event_selected_toggle(`+index+`,`+is_new+`);}>
    </div>
    <div class="col-md-10 col-md-offset-1">
        <label id="`+new_val+`not_attending_other_events_label-`+index+`" for="`+new_val+`not_attending_other_events-`+index+`"  style="`+hide_style+`">Unfortunately I will not attend either:</label>
        <input type="checkbox" class="rsvp-submission-checkbox" name="not_attending_other_events_checkbox" id="`+new_val+`not_attending_other_events-`+index+`" title="Unfortunately I will not attend either."
            required `+has_rejected+` style="`+hide_style+`" onclick={no_events_toggle(`+index+`,`+is_new+`);}>
    </div>`;
}

var checkbox_toggle = function (index, val){
    var new_val = "";
    if(val === true){
        new_val = "new_" 
    }
    const checked = document.getElementById(new_val+'accommodation-'+index).checked;
    if(checked===true){
        document.getElementById(new_val+'no_accommodation-'+index).checked = false;
    }
}

var no_checkbox_toggle = function (index, val){
    var new_val = "";
    if(val === true){
        new_val = "new_" 
    }
    const checked = document.getElementById(new_val+'no_accommodation-'+index).checked;
    if(checked===true){
        document.getElementById(new_val+'accommodation-'+index).checked = false;
    }
}

var no_events_toggle = function (index, val){
    var new_val = "";
    if(val === true){
        new_val = "new_" 
    }
    const checked = document.getElementById(new_val+'not_attending_other_events-'+index).checked;
    if(checked===true){
        document.getElementById(new_val+'pre_wedding_dinner-'+index).checked = false;
        document.getElementById(new_val+'post_wedding_breakfast-'+index).checked = false;
    }
}

var event_selected_toggle = function (index, val){
    var new_val = "";
    if(val === true){
        new_val = "new_" 
    }
    const pre_checked = document.getElementById(new_val+'pre_wedding_dinner-'+index).checked;
    const post_checked = document.getElementById(new_val+'post_wedding_breakfast-'+index).checked;
    if(pre_checked===true || post_checked===true){
        document.getElementById(new_val+'not_attending_other_events-'+index).checked = false;
    }
}

var event_toggle = function (index, val){
    is_new = '';
    if(val===true){
        is_new = 'new_';
    }
    const checked = document.getElementById(is_new+'no_accommodation-'+index).checked;
    if(checked===true){
        document.getElementById(is_new+'pre_wedding_dinner-'+index).style.display = "";
        document.getElementById(is_new+'pre_wedding_dinner_label-'+index).style.display = "";
        document.getElementById(is_new+'post_wedding_breakfast-'+index).style.display = "";
        document.getElementById(is_new+'post_wedding_breakfast_label-'+index).style.display = "";
        document.getElementById(is_new+'not_attending_other_events-'+index).style.display = "";
        document.getElementById(is_new+'not_attending_other_events_label-'+index).style.display = "";
    }
    else{
        document.getElementById(is_new+'pre_wedding_dinner-'+index).style.display = "none";
        document.getElementById(is_new+'pre_wedding_dinner_label-'+index).style.display = "none";
        document.getElementById(is_new+'post_wedding_breakfast-'+index).style.display = "none";
        document.getElementById(is_new+'post_wedding_breakfast_label-'+index).style.display = "none";
        document.getElementById(is_new+'not_attending_other_events-'+index).style.display = "none";
        document.getElementById(is_new+'not_attending_other_events_label-'+index).style.display = "none";
    }
}

var accommodationCheckbox = function (item, index, is_new){
    var new_val = "";
    if(is_new === true){
        new_val = "new_" 
    }
    if(item.has_accommodation===true){
        var has_accepted = "";
        var has_rejected = "";
        var header = "";
        var info_text = ""
        if(item.accommodation===true){
            has_accepted = "checked";
            header = "Accommodation"
        }
        if(item.no_accommodation===true){
            has_rejected = "checked";
        }
        return `<h3>Accommodation</h3>
        <p>Both the Welcome Dinner and Farewell Breakfast are included in the accommodation. If you do not want to stay at the venue the optional events have a per-person cost. Please tick below and we'll send you the details and pricing closer to the time</p>
        <div class="col-md-10 col-md-offset-1">
            <label for="`+new_val+`accommodation-`+index+`">Please send me the accommodation details:</label>
            <input type="checkbox" class="rsvp-submission-checkbox" name="accommodation_checkbox" id="`+new_val+`accommodation-`+index+`" title="Please send me the accommodation details."
                required `+has_accepted+` onclick={checkbox_toggle(`+index+`,`+is_new+`);event_toggle(`+index+`,`+is_new+`);}>
        </div>
        <div class="col-md-10 col-md-offset-1">
            <label for="`+new_val+`no_accommodation-`+index+`">I will not be taking the accommodation:</label>
            <input type="checkbox" class="rsvp-submission-checkbox" name="no_accommodation_checkbox" id="`+new_val+`no_accommodation-`+index+`" title="I will not be taking the accommodation."
                required `+has_rejected+` onclick={no_checkbox_toggle(`+index+`,`+is_new+`);event_toggle(`+index+`,`+is_new+`);}>
        </div>`+ eventCheckboxes(item, index, is_new, item.no_accommodation!==true);
    }
    else {
        return `<h3>Welcome Dinner and Farewell Breakfasts</h3>
        <p>Both the Welcome Dinner and Farewell Breakfast are optional events with a per-person cost. If you'd like to attend, please tick below and we'll send you the details and pricing closer to the time</p>`+ eventCheckboxes(item, index, is_new, false);
    }
}

var data_div = function (valid_data){
    var innerHtml = `<form id="rsvp-submission" class="rsvp-submission">
        `;

    valid_data.data.forEach(function (item, index) {
        checked="";
        style="";
        dietry_checked="";
        dietry_style="";
        if(item.dietry_requirements==="None"){
            dietry_checked="checked";
            dietry_style="display: none;"
        }
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
                                <label for="email-`+index+`">Enter your email adress:</label>
                                <input type="text" name="email" id="email-`+index+`"                              
                                    placeholder="Email address" required value="`+item.email+`">
                            </div>
                            <div class="col-md-10 col-md-offset-1">
                                <label for="rsvp-`+index+`">Tick this box to mark as attending:</label>
                                <input type="checkbox" class="rsvp-submission-checkbox" name="rsvp_checkbox" id="rsvp-`+index+`" title="Tick the box to mark as attending."
                                    required `+checked+`>
                            </div>`
                            + accommodationCheckbox(item, index, false) +
                            `<div class="col-md-10 col-md-offset-1">
                                <label for="dietry_requirements_checkbox-`+index+`">I confirm i have no dietary requirements:</label>
                                <input type="checkbox" class="rsvp-submission-checkbox" name="dietry_requirements_checkbox" id="dietry_requirements_checkbox-`+index+`" title="I confirm i have no dietary requirements."
                                    required `+dietry_checked+` onclick=dietry_toggle(`+index+`,`+false+`)>
                            </div>
                            <div class="col-md-10 col-md-offset-1">
                                <label id="dietry_requirements_label-`+index+`" for="dietry_requirements-`+index+`" style="`+dietry_style+`">Dietry Requirements:</label><br>
                                <textarea style="height: 56px;`+dietry_style+`" name="dietry_requirements" id="dietry_requirements-`+index+`" 
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

var accommodation_from_code = function(code){
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
}

var data_from_code = function (code) {
    var app_url = "https://script.google.com/macros/s/AKfycbyAgYTVPiR6Vo7VSPLhtRhHPGUoUsvaygx5ECwSOHDC7_2u4f_doZ00Dp0h-LdIrLI/exec";
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
    document.getElementById('accommodation').value = valid_data.has_accommodation;
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
        var startVal = 0;
        var elements = document.getElementById('rsvp-submission').elements;
        var code = document.getElementById('validation-code').value;
        var accommodation = document.getElementById('accommodation').value
        var data = [];
        var new_people = [];
        var count = -1;
        for (var i = startVal; i < elements.length; i++){
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
                else if(title === 'accommodation'){
                    dict['has_accommodation'] = true
                    dict[title] = elements[i].checked;
                    if(elements[i].checked === true){
                        dict['pre_wedding_dinner'] = true
                        dict['post_wedding_breakfast'] = true
                        dict['not_attending_other_events'] = false
                    }
                }
                else if(title === 'no_accommodation'){
                    dict[title] = elements[i].checked;
                }
                else if(title === 'pre_wedding_dinner'){
                    dict[title] = elements[i].checked;
                }
                else if(title === 'post_wedding_breakfast'){
                    dict[title] = elements[i].checked;
                }
                else if(title === 'not_attending_other_events'){
                    dict[title] = elements[i].checked;
                }
                else if(title === 'dietry_requirements_checkbox'){
                    if(elements[i].checked === true){
                        dict['dietry_requirements'] = 'None'
                    }
                }
                else if(title === 'dietry_requirements'){
                    if(elements[i].value === ''){
                        dict['dietry_requirements'] = 'None'
                    }
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
                else if(title === 'accommodation'){
                    dict['has_accommodation'] = true;
                    dict[title] = elements[i].checked;
                    if(elements[i].checked === true){
                        dict['pre_wedding_dinner'] = true
                        dict['post_wedding_breakfast'] = true
                        dict['not_attending_other_events'] = false
                    }
                }
                else if(title === 'no_accommodation'){
                    dict[title] = elements[i].checked;
                }
                else if(title === 'pre_wedding_dinner'){
                    dict[title] = elements[i].checked;
                    if(elements[i].checked === true){
                        dict['no_accommodation'] = true
                    }
                }
                else if(title === 'post_wedding_breakfast'){
                    dict[title] = elements[i].checked;
                    if(elements[i].checked === true){
                        dict['no_accommodation'] = true
                    }
                }
                else if(title === 'not_attending_other_events'){
                    dict[title] = elements[i].checked;
                    if(elements[i].checked === true){
                        dict['no_accommodation'] = true
                    }
                }
                else if(title === 'dietry_requirements_checkbox'){
                    if(elements[i].checked === true){
                        dict['dietry_requirements'] = 'None'
                    }
                }
                else if(title === 'dietry_requirements'){
                    if(elements[i].value === ''){
                        dict['dietry_requirements'] = 'None'
                    }
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
            
        window.location.href = "invitation.html?id="+encodeURIComponent(code);
    }, 0);
};

// update details
var update_rsvp_details = function (data) {
    var app_url = "https://script.google.com/macros/s/AKfycbyAgYTVPiR6Vo7VSPLhtRhHPGUoUsvaygx5ECwSOHDC7_2u4f_doZ00Dp0h-LdIrLI/exec"; 
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

var update_accomodation_details = function (data) {
    var app_url = "https://script.google.com/macros/s/AKfycbwY7v4_PkpA7ZzIwuuglhA-Ovusz_K2NeUmfvlz9E-TOJ37WrjGqpAF_R29VNeJZ3f4/exec"; 
    $.ajax({
        url: app_url,
        method: "POST",
        async: false,
        dataType: "json",
        data: JSON.stringify(data),
        error: function () {
            alert("The form failed to update accomodation. Please let Jonathan know and try again later.");
        }
    });
};

var dietry_toggle = function (index, val){
    is_new = '';
    if(val===true){
        is_new = 'new_';
    }
    const checked = document.getElementById(is_new+'dietry_requirements_checkbox-'+index).checked;
    if(checked===true){
        document.getElementById(is_new+'dietry_requirements_label-'+index).style.display = "none";
        document.getElementById(is_new+'dietry_requirements-'+index).style.display = "none";
        document.getElementById(is_new+'dietry_requirements-'+index).value = "";
    }
    else{
        document.getElementById(is_new+'dietry_requirements_label-'+index).style.display = "";
        document.getElementById(is_new+'dietry_requirements-'+index).style.display = "";
    }
}

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
                            <div class="col-md-10 col-md-offset-1">
                                <label for="new_email-`+index+`">Enter your email adress:</label>
                                <input type="text" name="email" id="new_email-`+index+`"                              
                                    placeholder="Email address" required value="">
                            </div>
                            <div class="col-md-10 col-md-offset-1" style="display: none;">
                                <label for="new_rsvp-`+index+`">Tick this box to mark as attending:</label>
                                <input type="checkbox" name="rsvp_checkbox" id="new_rsvp-`+index+`" title="Tick the box to mark as attending."
                                    required checked>
                            </div>`
                            + accommodationCheckbox({'has_accommodation': document.getElementById('accommodation').value}, index, true) +
                            `<div class="col-md-10 col-md-offset-1">
                                <label for="new_dietry_requirements_checkbox-`+index+`">I confirm i have no dietary requirements:</label>
                                <input type="checkbox" class="rsvp-submission-checkbox" name="new_dietry_requirements_checkbox" id="new_dietry_requirements_checkbox-`+index+`" title="I confirm i have no dietary requirements."
                                    required onclick=dietry_toggle(`+index+`,`+true+`)>
                            </div>
                            <div class="col-md-10 col-md-offset-1">
                                <label id="new_dietry_requirements_label-`+index+`" for="new_dietry_requirements-`+index+`" style="">Dietry Requirements:</label><br>
                                <textarea style="height: 56px;" name="dietry_requirements" id="new_dietry_requirements-`+index+`" 
                                placeholder="Please list any dietry requirements we should be aware of." 
                                required rows="3" cols="50"></textarea>
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