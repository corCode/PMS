

var numberOfNights = 0;

var roomPrice = 0;

Template.bookingForm.created = function () {

    Session.set('bookingFormErrors', {});

    if (Object.getOwnPropertyNames(this.data).indexOf("ownerId") > -1) {

        /****
        *****    loading from propertyDetails
        ****/

        var bookingInfo = {
            propertyId: this.data._id,
            propertyName: this.data.title,
            checkIn: "",
            checkOut: "",
            services: [],
            numberOfNights: 0,
            rate: 0.00,
            roomPrice: 0.00,
            totalPrice: 0.00
        };

        Session.set('propertyDates', this.data.availableDates);
        if (Session.get('checkInDate'))
            bookingInfo.checkIn = Session.get('checkInDate');


        if (Session.get('checkOutDate'))
            bookingInfo.checkOut = Session.get('checkOutDate');


        Session.set('bookingInfo', bookingInfo);
        Session.set('bookingServices', null);

        console.log("Template.bookingForm.created");
        //console.log("this.data");
        //console.log(this.data);
        //console.log("Meteor.user()._id");
        //console.log(Meteor.user()._id);
        //console.log(Session.get('bookingInfo'));
    }
    else
    {
        //loading from bookingList

        var bookingInfo = this.data;
        Session.set('bookingInfo', bookingInfo);
        console.log("bookingInfo Session..")
        //console.log(Session.get("bookingInfo"));
    }

}

Template.bookingForm.rendered = function () {

    console.log("booking form rendered...")
}

Template.bookingForm.helpers({

    bookingId: function() {
        var tmp = this;

        if (tmp) {
            console.log("Object.getOwnPropertyNames....");
            console.log(Object.getOwnPropertyNames(tmp));
            if (Object.getOwnPropertyNames(tmp).indexOf("ownerId") > -1) {
                console.log("NO BookingID!!!!!")
                return "";
            }
            else {

                return this._id;
            }
        }
        else
        {
            console.log("no this...???")
            console.log(this);

        }

    },



    numOfNights: function() {

        /***
        if (Session.get('checkInDate') && Session.get('checkOutDate'))
        {
            var date1 = Date.parse(Session.get('checkInDate'));
            var date2 = Date.parse(Session.get('checkOutDate'));

            var dayDiff = (date2 - date1)/(1000*60*60*24);

            numberOfNights = dayDiff;
            return dayDiff;
        }
        return null;
         ***/

        if (Session.get('bookingInfo').checkIn && Session.get('bookingInfo').checkOut)
        {
            var date1 = Date.parse(Session.get('bookingInfo').checkIn);
            var date2 = Date.parse(Session.get('bookingInfo').checkOut);

            var dayDiff = (date2 - date1)/(1000*60*60*24);

            numberOfNights = dayDiff;


            updateSessionObj('bookingInfo', 'numberOfNights', dayDiff);


            return dayDiff;
        }
        return null;

    },


    roomPrice: function() {

        //console.log(this);
        roomPrice = this.rate * numberOfNights;

        updateSessionObj('bookingInfo', 'roomPrice', roomPrice);
        updateSessionObj('bookingInfo', 'rate', this.rate);
        return roomPrice;

    },

    services: function(parentContext) {
        console.log('this');
        console.log(this);
        console.log('parentContext');
        console.log(parentContext);
        //console.log(parentContext.services);


        //first time around...
        if (!Session.get('bookingServices')) {
            if (!parentContext)
                return Session.get('bookingServices');
            else

            if (parentContext.services) {
                var tempArray = parentContext.services;

                for (var i = 0; i < parentContext.services.length; i++) {
                    tempArray[i].index = i;
                    tempArray[i].selected = false;
                    tempArray[i].propertyID = this._id;
                }

                console.log(tempArray);
                Session.set('bookingServices', tempArray);

                updateSessionObj('bookingInfo', 'services', Session.get('bookingServices'));

                return tempArray;
            }
        }
        else
        {
            // after the first time Session.bookingServices is set

            Session.set('bookingServices', Session.get('bookingInfo')['services']);
            return Session.get('bookingServices');
        }

        return null;
    },

    totalPrice: function () {

        var total = 0.00;
        if (Session.get('bookingServices')) {
            for (var i = 0; i < Session.get('bookingServices').length; i++) {
                if (Session.get('bookingServices')[i].selected) {
                    total = total + Session.get('bookingServices')[i].price;


                }
            }
        }
    console.log("***" + total);
        updateSessionObj('bookingInfo', 'totalPrice', total + roomPrice);
        return total + roomPrice;

    },

    todayDate: function() {
      return formateDates(new Date());
    },

    formAction: function() {
        console.log(window.location.href);
        if (window.location.href.indexOf('bookings') > -1) {
            console.log("confirm");
            return "confirm";
        }
        else if (window.location.href.indexOf('property') > -1)
            return "book";
    },

    isBook: function() {
        console.log(window.location.href);
        console.log(window.location.href.indexOf('/property/') > -1);
        console.log(this);
        //return (window.location.href.indexOf('/property/') > -1);
        return (this.ownerId);
    },

    isModify: function() {
        return (window.location.href.indexOf('bookings') > -1);
    },

    errorMessage: function(inputField) {
        return Session.get('bookingFormErrors')[inputField];
    },

    errorClass: function(inputField) {
        return !!Session.get('bookingFormErrors')[inputField] ? "has-error" : '';
    }



});

Template.bookingForm.events({

    'change #startDate': function(e) {
        console.log("change #startDate...");
        console.log(e.target.value);

        var checkIn = parseDate(e.target.value); //new Date(event.target.value);

        //console.log('validate checkin');
        //var d = new Date (bookingForm.checkIn);


        //Session.set('checkInDate', checkIn);
        updateSessionObj('bookingInfo', 'checkIn', checkIn);


        // Set checkout to 3 days after check-in
        if (Session.get('bookingInfo').checkOut <= Session.get('bookingInfo').checkIn) {

            //var d = Session.get('checkInDate');
            var d = Session.get('bookingInfo').checkIn;
            d = d.setDate(d.getDate() + 3);
            d = new Date(d);
            //Session.set('checkOutDate', d);
            updateSessionObj('bookingInfo', 'checkOut', d);
        }

        console.log("change #checkIn");
        console.log(Session.get('bookingInfo'));
    },

    'change #endDate': function(e) {
        //Session.set('checkOutDate', new Date(event.target.value))
        //updateSessionObj('bookingInfo', 'checkOut', new Date(event.target.value));
        updateSessionObj('bookingInfo', 'checkOut', parseDate(e.target.value));

        console.log("change #checkOut");
        console.log(Session.get('bookingInfo'));

    },

    'change .services': function(e) {
        /***
         * update session variable bookingServices
         */

      console.log(event.target.value);
      console.log(this);

        //if(event.target.checked)
        //{
            console.log('add ' + this.price);
            var i = Number(event.target.id.substring(event.target.id.indexOf('_') + 1));
            console.log(i);
            console.log( Session.get('bookingServices')[i]);
            //(Session.set('bookingServices').checked = event.target.checked;
            var x = Session.get('bookingServices');
            x[i].selected = event.target.checked;
            Session.set('bookingServices', x);
        updateSessionObj('bookingInfo', 'services', Session.get('bookingServices'));

        console.log('bookingServices');
        console.log(Session.get('bookingServices'));

        //updateSessionObj('bookingInfo', 'services', Session.get('bookingServices'));
        console.log("change .services");
        console.log(Session.get('bookingInfo'));


        //}
        //else
        //{
        //    console.log('sub ' + this.price);
        //}
    },

    'click .book': function (e) {

        /***
         var booking = {
            checkIn: document.getElementById('checkIn').value,
            checkOut: document.getElementById('checkOut').value,
            //services: Session.get('bookingServices'),
            roomPrice: roomPrice
        };
         ***/


        if (!Meteor.user()) {
            throwError("Please log in to book.");
        }
        else {

            var booking = Session.get('bookingInfo');
            booking.userId = Meteor.user()._id;
            //booking.checkIn = document.getElementById('checkIn').value;

            var selectedServices = [];

            if (Session.get('bookingServices')) {

                for (var i = 0; i < Session.get('bookingServices').length; i++) {

                    if (Session.get('bookingServices')[i].selected) {

                        selectedServices[selectedServices.length] = Session.get('bookingServices')[i];
                        selectedServices[selectedServices.length - 1].instruction =
                            document.getElementById('service' + i.toString() + 'Instruction').value.trim();
                    }
                }
            }


            booking.services = selectedServices;



            Session.set('bookingInfo', booking);
            var errors = validateBookingForm(Session.get('bookingInfo'));

            //var errors = validatePropertyForm(propertyObj);

            if (Object.getOwnPropertyNames(errors).length > 0) {
                Session.set('bookingFormErrors', errors);
                $("#bookingFormModal").modal("show");
            }

            console.log("click .book");

            console.log(Session.get('bookingInfo'));


            Meteor.call('bookingInsert', Session.get('bookingInfo'), function (error, result) {

                if (error)
                //return alert(error.reason);
                    throwError(error.reason);


                $("#bookingFormModal").modal("hide");
                $('body').removeClass('modal-open');
                $('.modal-backdrop').remove();
                Router.go('payment', {_id: result._id});

            });


        }
    },

    'click .confirm': function (e) {
        console.log("change booking...");

        e.preventDefault();

        Meteor.call('bookingUpdate', Session.get('bookingInfo') ,function (error, result){
            if (error)
                throwError(error.reason);

            $("#bookingFormModal" + Session.get('bookingInfo')._id).modal("hide");
            $('body').removeClass('modal-open');
            $('.modal-backdrop').remove();
            Router.go('payment', {_id: result._id});
        })

    }

});

updateSessionObj = function (sessionVar, fieldName, fieldValue) {

    var x;
    var tempObj = Session.get(sessionVar);

    //console.log('updateSessionObj ' + sessionVar);

    if (Session.get(sessionVar)[fieldName] !== fieldValue) {
        //only update if the value is different

        console.log("updating Session variable...");
        console.log(fieldName + "=" + fieldValue);
        console.log(Session.get(sessionVar)[fieldName] + " -> " + fieldValue);
        for (x in tempObj) {
            if (x === fieldName) {
                //console.log(x);
                //console.log(fieldName);
                tempObj[x] = fieldValue;
                //console.log(tempObj[x]);
            }

        }


        Session.set(sessionVar, tempObj);
    }
    return tempObj;



};

validateBookingForm = function (bookingForm){

    console.log('this.data');
    console.log(this);
    var errors = {};
    Session.set('bookingFormErrors', {});

    if(!bookingForm.checkIn)
        errors.checkIn = "Please select a check-in date";
    else
    {
        var d = new Date (bookingForm.checkIn);
        console.log(d);
        if (d < Session.get('propertyDates')[0].startDate)
            errors.checkIn = "Please select a date after " + formateDates(Session.get('propertyDates')[0].startDate);
        else if (d > Session.get('propertyDates')[0].endDate)
            errors.checkIn = "Please select a date before " + formateDates(Session.get('propertyDates')[0].endDate);

    }



    if(!bookingForm.checkOut)
        errors.checkOut = "Please select a check-out date";
    else
    {
        var dd = new Date (bookingForm.checkOut);

        console.log(dd);
        if (dd < Session.get('propertyDates')[0].startDate)
            errors.checkOut = "Please select a date after " + formateDates(Session.get('propertyDates')[0].startDate);
        else if (dd > Session.get('propertyDates')[0].endDate)
            errors.checkOut = "Please select a date before " + formateDates(Session.get('propertyDates')[0].endDate);



    }

    console.log('validateBooking');
    console.log(errors);


    return errors;

};