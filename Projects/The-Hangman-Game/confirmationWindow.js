// confirm dialog function
function confirm_dialog(
    $confirmation_title = "",
    $confirmation_html = "",
    $callback = "",
    $callback_param = []
) {
    // console.log('hi hwllo')
    // Confirmation Modal
    var confirmation_modal = $("#confimartionModal");

    // Checking if modal exist on the current page
    if (confirmation_modal.length <= 0) {
        alert("Confimation Modal/Dialog does not exist in this page");
        return false;
    }

    // Display Confrimation title
    confirmation_modal
        .find("#confimartionModalLabel")
        .html($confirmation_title);
    // Display Confrimation Content
    confirmation_modal.find(".modal-body").html($confirmation_html);

    // Show Confirmation Modal
    confirmation_modal.modal("show");

    // Execute Modal Callback when Continue Button is clicked
    confirmation_modal.find(".confirm-btn").click(function () {
        if ($callback != "") {
            // Checking if callback function exists
            if (typeof window[$callback] != "function") {
                alert("Confimartion Dialog's Callback Function is undefined.");
            } else {
                // Executing callback

                window[$callback]($callback_param);
            }
        } else {
            alert("Confirmation Confirmed but no callback function stated");
        }

        // Close Modal
        confirmation_modal.modal("hide");
    });
    confirmation_modal.find(".closed-btn").click(function () {
        // Close Modal
        confirmation_modal.modal("hide");
    });
    return true;
};

