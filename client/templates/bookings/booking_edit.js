Template.bookingEdit.helpers({

    checkInStr: function () {

        return formateDates(this.checkIn);
    },

    checkOutStr: function () {

        return formateDates(this.checkOut);
    },

    todayStr: function () {

        return formateDates(new Date());
    },

    displayDate: function () {

        return (new Date()).toDateString();
    }

});

Template.bookingEdit.events({
    /**

    'click .confirm': function (e) {

        console.log("change booking...");

        e.preventDefault();

        Meteor.call('bookingUpdate', this._id, parseDate($('#startDate').val()), parseDate($('#endDate').val()) ,function (error, result){
            if (error)
                throwError(error.reason);
        })
    }
     **/
});