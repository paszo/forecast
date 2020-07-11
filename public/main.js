$(function() {
    var $h1 = $("h1");
    var $zip = $("input[name='zip']");

    $("form").on("submit", function(event) {
        event.preventDefault();

        var zipCode = $.trim($zip.val());
        $h1.text("Laoding...");

        var request = $.ajax({
            url: "/" + zipCode,
            dataType: "json"
        });

        request.done(function(data) {
            var temperature = data.temperature;
            $h1.thml("It is " + temperature + "&#176; in " + zipCode + ".");
        });

        request.fail(function() {
            $h1.text("Error!");
        });

    });
});