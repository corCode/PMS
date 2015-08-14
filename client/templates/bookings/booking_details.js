Template.bookingDetails.helpers({

    checkInDisplay: function () {

        return this.checkIn.toDateString();
    },

    checkOutDisplay: function () {

        return this.checkOut.toDateString();
    }



});