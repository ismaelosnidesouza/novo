$(document).ready(function () {

    $('form').submit(function () {

        event.preventDefault();

        login($("#email").val(), $("#password").val());

    });

    function login(email, password) {

        var text = '{' +
                   '   "email": "'+email+'",' +
                   '   "password": "'+password+'"' +
                   '}'

        jsonData = JSON.parse(text);

        request = $.ajax({
            url: "./api/auth/login",
            type: "post",
            data: jsonData
        });

        request.done(function (response, textStatus, jqXHR) {
            console.log("Logado!");

            if ( response.access_token != "" && response.access_token != null ){
                setCookie("token", response.access_token, response.expires_in)
                window.location.href = './';
            }

        });

        request.fail(function (jqXHR, textStatus, errorThrown) {
            console.error(jqXHR.responseJSON.error);
            $('#errorMsg').html(jqXHR.responseJSON.error);
        });
    }

});
