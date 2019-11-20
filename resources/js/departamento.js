$(document).ready(function () {

    var request;

    $('[data-toggle="tooltip"]').tooltip();
    var actions = $("table td:last-child").html();

    if (typeof actions == "undefined") {
        actions =
            '<a class="add" title="Add" data-toggle="tooltip"><i class="material-icons">&#xE03B;</i></a>' +
            '<a class="edit" title="Edit" data-toggle="tooltip"><i class="material-icons">&#xE254;</i></a>' +
            '<a class="delete" title="Delete" data-toggle="tooltip"><i class="material-icons">&#xE872;</i></a>';
    }

    request = $.ajax({
        url: "./departamento_controller.php",
        type: "get",
        data: "selectAll=true"
    });

    request.done(function (response, textStatus, jqXHR) {
        $("table").append(response);
        console.log("Get All Executed!");
    });

    request.fail(function (jqXHR, textStatus, errorThrown) {
        console.error("The following error occurred: " + textStatus, errorThrown);
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
        $("table tbody tr").eq(index + 1).find(".add, .edit").toggle();
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
                $(this).addClass("error");
                empty = true;
            } else {
                $(this).removeClass("error");
            }
        });

        parentTr.find(".error").first().focus();

        if (!empty) {

            var serializedData = input.serialize();

            if (cd_departamento) {
                serializedData = serializedData + '&cd_departamento=' + cd_departamento;
            }

            input.prop("disabled", true);

            request = $.ajax({
                url: "./departamento_controller.php",
                type: "post",
                data: serializedData
            });

            request.done(function (response, textStatus, jqXHR) {

                console.log("Post Executed!");

                request = $.ajax({
                    url: "./departamento_controller.php",
                    type: "get",
                    data: "cd_departamento=" + response
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
        var cd_departamento = parentTr.find('td:first-child').text();

        request = $.ajax({
            url: "./departamento_controller.php",
            type: "get",
            data: "edit=true&cd_departamento=" + cd_departamento
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

        var cd_departamento = $(this).parents('tr').find('td:first-child').text();

        request = $.ajax({
            url: "./departamento_controller.php",
            type: "delete",
            data: "cd_departamento=" + cd_departamento
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

});
