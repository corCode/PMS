
Template.payment.created = function () {

    //$("#bookingFormModal").modal("hide");
}


Template.error.rendered = function() {
    //$("#bookingFormModal").modal("hide");
    //$('.modal-backdrop').remove();

}

Template.payment.helpers({

    total: function () {

        console.log("payment.js");
        console.log(this);
        return this.totalPrice;
    }
});