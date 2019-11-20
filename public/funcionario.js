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
        actions =
            '<a class="add" title="Add" data-toggle="tooltip"><i class="material-icons">&#xE03B;</i></a>' +
            '<a class="edit" title="Edit" data-toggle="tooltip"><i class="material-icons">&#xE254;</i></a>' +
            '<a class="delete" title="Delete" data-toggle="tooltip"><i class="material-icons">&#xE872;</i></a>';
    }

    request = $.ajax({
        url: "./api/departamentos/"+cd_departamento+"/funcionarios",
        type: "get",
        headers: {"Authorization": getCookie("token")}
    });

    request.done(function (response, textStatus, jqXHR) {

        console.log("Get All Executed!");

        response.forEach(function(funcionario){

            var row = '<tr>' +
                            '<td>' + funcionario.cd_funcionario + '</td>' +
                            '<td>' + funcionario.nm_funcionario + '</td>' +
                            '<td>' + funcionario.sexo + '</td>' +
                            '<td>R$' + funcionario.salario + '</td>' +
                            '<td>' + funcionario.dt_nascimento + '</td>' +
                            '<td>' + 'funcionario.nm_departamento' + '</td>' +
                            '<td>' + actions + '</td>' +
                      '</tr>';

            $("table").append(row);

        });

    });

    request.fail(function (jqXHR, textStatus, errorThrown) {
        console.error(jqXHR.responseJSON.errors.message);
    });

    /*
    // Append table with add row form on add new button click
    $(".add-new").click(function () {

        $(this).attr("disabled", "disabled");

        var index = $("table tbody tr:last-child").index();

        request = $.ajax({
            url: "./funcionario_controller.php",
            type: "get",
            data: "selectDep=true"
        });

        request.done(function (response, textStatus, jqXHR) {

            console.log("Get Depart. Executed!");

            var row = '<tr>' +
                '<td></td>' +
                '<td><input type="text" class="form-control" name="nm_funcionario" id="nm_funcionario"></td>' +
                '<td><select  class="form-control" name="sexo">' +
                    '<option value="M">Masculino</option>' +
                    '<option value="F">Feminino</option>' +
                '</select></td>' +
                '<td><input type="number" class="form-control" name="salario" id="salario"></td>' +
                '<td><input type="date" class="form-control" name="dt_nascimento" id="dt_nascimento"></td>' +
                '<td>' + response + '</td>' +
                '<td>' + actions + '</td>' +
                '</tr>';

            $("table").append(row);
            $("table tbody tr").eq(index + 1).find(".add, .edit").toggle();
            $('[data-toggle="tooltip"]').tooltip();

        });

        request.fail(function (jqXHR, textStatus, errorThrown) {
            console.error("The following error occurred: " + textStatus, errorThrown);
        });

    });

    // Add row on add button click
    $(document).on("click", ".add", function () {

        event.preventDefault();

        var empty = false;
        var serializedData = '';
        var parentTr = $(this).parents("tr");
        var input = parentTr.find('input');
        var select = parentTr.find('select');
        var cd_funcionario = parentTr.find('td:first-child').text()

        input.each(function () {
            if (!$(this).val()) {
                $(this).addClass("error");
                empty = true;
            } else {
                $(this).removeClass("error");
            }
        });

        parentTr.find(".error").first().focus();

        if (!empty) {

            var serializedDataInput = input.serialize();
            var serializedDataSelect = select.serialize();

            if (cd_funcionario) {
                serializedData = serializedDataInput + '&' + serializedDataSelect + '&cd_funcionario=' + cd_funcionario;
            } else {
                serializedData = serializedDataInput + '&' + serializedDataSelect;
            }

            input.prop("disabled", true);
            select.prop("disabled", true);

            request = $.ajax({
                url: "./funcionario_controller.php",
                type: "post",
                data: serializedData
            });

            request.done(function (response, textStatus, jqXHR) {

                console.log("Post Executed!");

                request = $.ajax({
                    url: "./funcionario_controller.php",
                    type: "get",
                    data: "cd_funcionario=" + response
                });

                request.done(function (response, textStatus, jqXHR) {
                    console.log("Get by Id Executed!");
                    parentTr.html(response);
                });

                request.fail(function (jqXHR, textStatus, errorThrown) {
                    console.error("The following error occurred: " + textStatus, errorThrown);
                });

            });

            request.fail(function (jqXHR, textStatus, errorThrown) {
                console.error("The following error occurred: " + textStatus,
                    errorThrown);
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
            url: "./funcionario_controller.php",
            type: "get",
            data: "edit=true&cd_funcionario=" + cd_funcionario
        });

        request.done(function (response, textStatus, jqXHR) {
            console.log("Get by Id Executed!");
            parentTr.html(response);
            $("table tbody tr").eq(parentTr.index()).find(".add, .edit").toggle();
        });

        request.fail(function (jqXHR, textStatus, errorThrown) {
            console.error("The following error occurred: " + textStatus, errorThrown);
        });

        $(".add-new").attr("disabled", "disabled");

    });

    // Delete row on delete button click
    $(document).on("click", ".delete", function () {

        var cd_funcionario = $(this).parents('tr').find('td:first-child').text();

        request = $.ajax({
            url: "./funcionario_controller.php",
            type: "delete",
            data: "cd_funcionario=" + cd_funcionario
        });

        request.done(function (response, textStatus, jqXHR) {
            console.log(response);
            console.log("Delete Executed!");
        });

        request.fail(function (jqXHR, textStatus, errorThrown) {
            console.error("The following error occurred: " + textStatus, errorThrown);
        });

        $(this).parents("tr").remove();
        $(".add-new").removeAttr("disabled");
    });
    */

});
