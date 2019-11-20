$(document).ready(function () {

    checkCookie();

    $(document).keydown(function() {
        checkCookie();
    });

    $(document).click(function() {
        checkCookie();
    });

    function setCookie(cname, cvalue, expiresin) {

        var d = new Date();

        d.setTime(d.getTime() + (expiresin * 1000));

        var expires = "expires=" + d.toUTCString();

        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }

    function getCookie(cname) {

        var name = cname + "=";

        var decodedCookie = decodeURIComponent(document.cookie);

        var ca = decodedCookie.split(';');

        for (var i = 0; i < ca.length; i++) {

            var c = ca[i];

            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }

            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }

        }

        return "";
    }

    function checkCookie() {

        var token = getCookie("token");

        if (token != "") {
            console.log('Usuário já logado!')
        } else {

            window.location.href = './login';

            /*var email = prompt("Digite seu e-mail:", "");
            var password = prompt("Digite sua senha:", "");

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
                }

            });

            request.fail(function (jqXHR, textStatus, errorThrown) {
                console.error(jqXHR.responseJSON.error);
            });*/
        }
    }
});
