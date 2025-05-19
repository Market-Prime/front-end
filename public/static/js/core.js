let authPswdToogle = true;
$("#auth-pswd-toogle").on("click", () => {
    if (authPswdToogle) {
        $("#auth-pswd-toogle i").removeClass("fa-eye").addClass("fa-eye-slash");
        $("#login-password").attr("type", "text");
    } else {
        $("#auth-pswd-toogle i").removeClass("fa-eye-slash").addClass("fa-eye");
        $("#login-password").attr("type", "password");
    }
    authPswdToogle = !authPswdToogle;
});

$("#close-auth-modal-btn").on("click", () => {
    $("#auth-modal-cont").css("display", "none");
});

$("#close-add-to-cart-modal-btn").on("click", () => {
    $("#add-to-cart-modal-cont").css("display", "none");
});

$("#open-m-nav").on("click", () => {
    $("#m-nav").removeClass("close").addClass("open");
});
$("#close-m-nav").on("click", () => {
    $("#m-nav").removeClass("open").addClass("close");
});

$(() => {
    $(".atc-trigger").on("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        const pId = $(this).data("product-id");
        $("#add-to-cart-modal-cont").css("display", "flex");

        const event = new CustomEvent("loadModalProductDetails", {
            detail: { pId }
        });
        window.dispatchEvent(event);
    });
});
