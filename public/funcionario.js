$(document).ready(function () {

    checkCookie();

    $(document).keydown(function () {
        checkCookie();
    });

    $(document).click(function () {
        checkCookie();
    });

    var request;
    var url = new URL(window.location.href);
    var cd_departamento = url.searchParams.get("cd_departamento");

    $('[data-toggle="tooltip"]').tooltip();
    var actions = $("table td:last-child").html();

    if (typeof actions == "undefined") {
        actions = '<a class="add" title="Add" data-toggle="tooltip"><i class="material-icons">&#xE03B;</i></a>' +
            '<a class="edit" title="Edit" data-toggle="tooltip"><i class="material-icons">&#xE254;</i></a>' +
            '<a class="delete" title="Delete" data-toggle="tooltip"><i class="material-icons">&#xE872;</i></a>';
    }

    request = $.ajax({
        url: "./api/departamentos/" + cd_departamento + "/funcionarios",
        type: "get",
        headers: { "Authorization": getCookie("token") }
    });

    request.done(function (response, textStatus, jqXHR) {

        console.log("Get All Executed!");

        $('#title').html('<b>' + response.nm_departamento + '</b>');

        response.funcionarios.forEach(function (funcionario) {

            var row = '<tr>' +
                '<td>' + funcionario.cd_funcionario + '</td>' +
                '<td>' + funcionario.nm_funcionario + '</td>' +
                '<td>' + funcionario.sexo + '</td>' +
                '<td>R$' + funcionario.salario + '</td>' +
                '<td>' + funcionario.dt_nascimento + '</td>' +
                '<td>' + actions + '</td>' +
                '</tr>';

            $("table").append(row);

        });

    });

    request.fail(function (jqXHR, textStatus, errorThrown) {
        console.error(jqXHR.responseJSON.errors.message);
    });

    // Append table with add row form on add new button click
    $(".add-new").click(function () {

        $(this).attr("disabled", "disabled");

        var index = $("table tbody tr:last-child").index();

        var row = '<tr>' +
            '<td></td>' +
            '<td><input type="text" class="form-control" name="nm_funcionario" id="nm_funcionario"></td>' +
            '<td><select  class="form-control" name="sexo">' +
            '<option value="M">Masculino</option>' +
            '<option value="F">Feminino</option>' +
            '</select></td>' +
            '<td><input type="number" class="form-control" name="salario" id="salario"></td>' +
            '<td><input type="date" class="form-control" name="dt_nascimento" id="dt_nascimento"></td>' +
            '<td>' + actions + '</td>' +
            '</tr>';

        $("table").append(row);
        $("table tbody tr").eq(index + 1).find(".add, .edit").toggle();
        $('[data-toggle="tooltip"]').tooltip();

    });



    // Add row on add button click
    $(document).on("click", ".add", function () {

        event.preventDefault();

        var empty = false;
        var parentTr = $(this).parents("tr");
        var input = parentTr.find('input');
        var cd_funcionario = parentTr.find('td:first-child').text()

        input.each(function () {

            if (!$(this).val()) {
                empty = true;
                $(this).addClass("error");
            } else {
                $(this).removeClass("error");
            }

        });

        parentTr.find(".error").first().focus();

        if (!empty) {

            var url;
            var type;
            var serializedData = input.serialize();

            if (cd_funcionario) {
                url = "./api/departamentos/" + cd_departamento + "/funcionarios/" + cd_funcionario;
                type = "put";
            } else {
                url = "./api/departamentos/" + cd_departamento + "/funcionarios";
                type = "post";
            }

            input.prop("disabled", true);

            request = $.ajax({
                url: url,
                type: type,
                data: serializedData,
                headers: { "Authorization": getCookie("token") }
            });

            request.done(function (response, textStatus, jqXHR) {

                console.log("Post Executed!");

                //var row = '<td>' + response.cd_departamento + '</td>' +
                //        '<td>' + response.nm_departamento + '</td>' +
                //        '<td>' + actions + '</td>';

                parentTr.html(response);

            });

            request.fail(function (jqXHR, textStatus, errorThrown) {
                console.error(jqXHR.responseJSON.error);
            });

            request.always(function () {
                $(this).parents("tr").find("input").prop("disabled", false);
            });

            $(this).parents("tr").find(".add, .edit").toggle();
            $(".add-new").removeAttr("disabled");
        }
    });




    // Edit row on edit button click
    $(document).on("click", ".edit", function () {

        event.preventDefault();

        var parentTr = $(this).parents("tr")
        var cd_funcionario = parentTr.find('td:first-child').text();

        request = $.ajax({
            url: "./api/departamentos/" + cd_departamento + "/funcionarios/" + cd_funcionario,
            type: "get",
            headers: { "Authorization": getCookie("token") }
        });

        request.done(function (response, textStatus, jqXHR) {

            console.log("Get by Id Executed!");

            var row = '<td>' + response.funcionarios[0].cd_funcionario + '</td>' +
                '<td><input type="text" class="form-control" name="nm_funcionario" id="nm_funcionario" value="' + response.funcionarios[0].nm_funcionario + '"></td>' +
                '<td><select  class="form-control" name="sexo" value="' + response.funcionarios[0].sexo + '">' +
                '<option value="M">Masculino</option>' +
                '<option value="F">Feminino</option>' +
                '</select></td>' +
                '<td><input type="number" class="form-control" name="salario" id="salario" value="' + response.funcionarios[0].salario + '"></td>' +
                '<td><input type="date" class="form-control" name="dt_nascimento" id="dt_nascimento" value="' + response.funcionarios[0].dt_nascimento + '"></td>' +
                '<td>' + actions + '</td>';

            parentTr.html(row);

            $("table tbody tr").eq(parentTr.index()).find(".add, .edit").toggle();

        });

        request.fail(function (jqXHR, textStatus, errorThrown) {
            console.error(jqXHR.responseJSON.error);
        });

        $(".add-new").attr("disabled", "disabled");

    });

    // Delete row on delete button click
    $(document).on("click", ".delete", function () {

        var parentTr = $(this).parents("tr")
        var cd_funcionario = parentTr.find('td:first-child').text();

        if (cd_funcionario) {

            request = $.ajax({
                url: "./api/departamentos/" + cd_departamento + "/funcionarios/" + cd_funcionario,
                type: "delete",
                headers: { "Authorization": getCookie("token") }
            });

            request.done(function (response, textStatus, jqXHR) {
                console.log("Delete Executed!");
                parentTr.remove();
            });

            request.fail(function (jqXHR, textStatus, errorThrown) {
                console.error(jqXHR.responseJSON.error);
            });

        } else {
            parentTr.remove();
        }

        $(".add-new").removeAttr("disabled");

    });

});
