

Template.daterangeInput.rendered = function() {

    console.log("daterangeInput rendered...")
    var parentData = Template.parentData()

    //console.log("parentData...");
    //console.log(parentData);


    if (parentData){
        /***
         * Get dates unavailable
         *
         */
        var propId = "";

        if (parentData.hasOwnProperty('ownerId'))
            propId = parentData._id;
        else if (parentData.hasOwnProperty('checkIn'))
            propId = parentData.propertyId;

        console.log("propId: " + propId);

        var bookedDates = Bookings.find({propertyId: propId}, {checkIn: 1, checkOut: 1});

        console.log("Bookings : " + bookedDates.count());

        if (bookedDates.count() > 0)
        {
            console.log(bookedDates);
            var startD = bookedDates.checkIn;
            var endD = bookedDates.checkOut;
            var bookedDays = [];
            bookedDates.forEach(function (item) {
                if (item.checkIn && item.checkOut) {
                    console.log(item.checkIn + " - " + item.checkOut);

                    for (var d = item.checkIn; d <= item.checkOut; d.setDate(d.getDate() + 1)) {
                        console.log(d);
                        bookedDays.push(new Date(d));
                    }
                }
            })

            console.log(bookedDays);
        }

    }
    $('.input-daterange').datepicker({datesDisabled: bookedDays, format: "yyyy-mm-dd", startDate: formateDates(new Date())});
}

Template.daterangeInput.helpers({
    startDateValue: function (parentContext) {

        console.log("startDateValue...");

        if (window.location.href.indexOf('edit') === -1
            && window.location.href.indexOf('submit') === -1
            && window.location.href.indexOf('/property/') === -1)
        {
            console.log("Get dates from session...");
            //loading from Request to book...
            if (Session.get('bookingInfo').checkIn) {
                console.log(Session.get('bookingInfo').checkIn);
                return formateDates(Session.get('bookingInfo').checkIn);
            }
            else
                return "";
        }

        if (window.location.href.indexOf('/edit') > -1
            && window.location.href.indexOf('/bookings/') > -1){
            console.log("Get dates from session...");
            //loading from booking edit...
            if (Session.get('bookingInfo').checkIn) {
                console.log(Session.get('bookingInfo').checkIn);
                return formateDates(Session.get('bookingInfo').checkIn);
            }
            else
                return "";
        }

        if (parentContext) {

            if (parentContext.availableDates[0].startDate)
                //loading from property edit/submit
                return formateDates(parentContext.availableDates[0].startDate);
        }


        return formateDates(new Date());
    },

    endDateValue: function (parentContext) {
        if (window.location.href.indexOf('edit') === -1 && window.location.href.indexOf('submit') === -1)
        {
            if (Session.get('bookingInfo').checkOut)
                return formateDates(Session.get('bookingInfo').checkOut);
            else
                return ""
        }

        if (window.location.href.indexOf('/bookings/') > -1 && window.location.href.indexOf('/edit') > -1)
        {
            if (Session.get('bookingInfo').checkOut)
                return formateDates(Session.get('bookingInfo').checkOut);
            else
                return ""
        }

        if (parentContext) {

            if (parentContext.availableDates[0].endDate)
                return formateDates(parentContext.availableDates[0].endDate);
        }

        return formateDates(new Date());
    },

    errorMessage: function(inputField) {
        if (window.location.href.indexOf('edit') === -1 && window.location.href.indexOf('submit') === -1)
            return Session.get('bookingFormErrors')[inputField];
        else
            return Session.get('propertyFormErrors')[inputField];
    },

    errorClass: function(inputField) {
        if (window.location.href.indexOf('edit') === -1 && window.location.href.indexOf('submit') === -1)
            return !!Session.get('bookingFormErrors')[inputField] ? "has-error" : '';
        else
            return !!Session.get('propertyFormErrors')[inputField] ? "has-error" : '';
    }
})

