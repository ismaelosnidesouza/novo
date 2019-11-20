$(document).ready(function () {

    checkCookie();

    $(document).keydown(function () {
        checkCookie();
    });

    $(document).click(function () {
        checkCookie();
    });

    var request;

    $('[data-toggle="tooltip"]').tooltip();
    var actions = $("table td:last-child").html();

    if (typeof actions == "undefined") {
        actions =
            '<a class="add" title="Adicionar" data-toggle="tooltip"><i class="material-icons">&#xE03B;</i></a>' +
            '<a class="edit" title="Editar" data-toggle="tooltip"><i class="material-icons">&#xE254;</i></a>' +
            '<a class="delete" title="Deletar" data-toggle="tooltip"><i class="material-icons">&#xE872;</i></a>' +
            '<a class="addEmp" title="Adic. Funcionário" data-toggle="tooltip"><i class="material-icons">person_add</i></a>';
    }

    request = $.ajax({
        url: "./api/departamentos",
        type: "get",
        headers: { "Authorization": getCookie("token") }
    });

    request.done(function (response, textStatus, jqXHR) {

        console.log("Get All Executed!");

        response.forEach(function (departamento) {

            var row = '<tr>' +
                '<td>' + departamento.cd_departamento + '</td>' +
                '<td>' + departamento.nm_departamento + '</td>' +
                '<td>' + actions + '</td>' +
                '</tr>';

            $("table").append(row);

        });

    });

    request.fail(function (jqXHR, textStatus, errorThrown) {
        console.error(jqXHR.responseJSON.error);
    });

    // Append table with add row form on add new button click
    $(".add-new").click(function () {

        $(this).attr("disabled", "disabled");

        var index = $("table tbody tr:last-child").index();

        var row = '<tr>' +
            '<td></td>' +
            '<td><input type="text" class="form-control" name="nm_departamento" id="nm_departamento"></td>' +
            '<td>' + actions + '</td>' +
            '</tr>';

        $("table").append(row);
        $("table tbody tr").eq(index + 1).find(".add, .edit, .addEmp").toggle();
        $('[data-toggle="tooltip"]').tooltip();

    });

    // Add row on add button click
    $(document).on("click", ".add", function () {

        event.preventDefault();

        var empty = false;
        var parentTr = $(this).parents("tr");
        var input = parentTr.find('input');
        var cd_departamento = parentTr.find('td:first-child').text()

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

            input.prop("disabled", true);

            if (cd_departamento) {
                url = "./api/departamentos/" + cd_departamento;
                type = "put";
            } else {
                url = "./api/departamentos";
                type = "post";
            }

            request = $.ajax({
                url: url,
                type: type,
                data: serializedData,
                headers: { "Authorization": getCookie("token") }
            });

            request.done(function (response, textStatus, jqXHR) {

                console.log("Post Executed!");

                var row = '<td>' + response.cd_departamento + '</td>' +
                    '<td>' + response.nm_departamento + '</td>' +
                    '<td>' + actions + '</td>';

                parentTr.html(row);

            });

            request.fail(function (jqXHR, textStatus, errorThrown) {
                console.error(jqXHR.responseJSON.error);
            });

            request.always(function () {
                $(this).parents("tr").find("input").prop("disabled", false);
            });

            $(this).parents("tr").find(".add, .edit .addEmp").toggle();
            $(".add-new").removeAttr("disabled");
        }
    });

    // Edit row on edit button click
    $(document).on("click", ".edit", function () {

        event.preventDefault();

        var parentTr = $(this).parents("tr")
        var cd_departamento = parentTr.find('td:first-child').text();

        request = $.ajax({
            url: "./api/departamentos/" + cd_departamento,
            type: "get",
            headers: { "Authorization": getCookie("token") }
        });

        request.done(function (response, textStatus, jqXHR) {

            console.log("Get by Id Executed!");

            var row = '<td>' + response.cd_departamento + '</td>' +
                '<td><input type="text" class="form-control" name="nm_departamento" id="nm_departamento" value="' + response.nm_departamento + '"></td>' +
                '<td>' + actions + '</td>';

            parentTr.html(row);

            $("table tbody tr").eq(parentTr.index()).find(".add, .edit, .addEmp").toggle();

        });

        request.fail(function (jqXHR, textStatus, errorThrown) {
            console.error(jqXHR.responseJSON.error);
        });

        $(".add-new").attr("disabled", "disabled");

    });

    // Delete row on delete button click
    $(document).on("click", ".delete", function () {

        var parentTr = $(this).parents("tr")
        var cd_departamento = parentTr.find('td:first-child').text();

        if (cd_departamento) {

            request = $.ajax({
                url: "./api/departamentos/" + cd_departamento,
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

    // Add Employees
    $(document).on("click", ".addEmp", function () {

        var parentTr = $(this).parents("tr")
        var cd_departamento = parentTr.find('td:first-child').text();
        window.location.href = './funcionario?cd_departamento=' + cd_departamento;

    });

});
