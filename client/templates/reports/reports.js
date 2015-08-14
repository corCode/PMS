Template.reports.rendered = function() {

    console.log("report rendered...");
    $('.input-daterange').datepicker({format: "yyyy-mm-dd"});


    console.log(this.data)

}

Template.reports.helpers({

    start: function () {

        return formateDateForDisplay(parseDate(this.startDate));
    },

    end: function () {

        return formateDateForDisplay(parseDate(this.endDate));
    },

    showGenerate: function () {

        return !(this.type);
    },

    showBookingReport: function () {

        console.log("showReport???");
        console.log(this);
        return (this.type === "booking");
    },



    bookingsCount: function () {

        return Bookings.find({checkIn : {$gte: parseDate(this.startDate)}, checkOut: {$lte: parseDate(this.endDate)}}).count();
    },

    availablePropertiesCount: function () {

        var bookingsCnt = Bookings.find({checkIn : {$gte: parseDate(this.startDate)}, checkOut: {$lte: parseDate(this.endDate)}}).count();



        var propsCnt =  Properties.find({"availableDates.0.startDate" : {$lte: parseDate(this.startDate)},
            "availableDates.0.endDate" : {$gte: parseDate(this.endDate)}}).count();

        console.log ("properties available..");
        console.log(propsCnt);



        if (propsCnt > bookingsCnt)
            return propsCnt - bookingsCnt;
        else
            return 0;
    },

    showServicesReport: function () {

        console.log(this);
        return (this.type === "services");
    },



    servicesRequested: function () {

        var tmp = Bookings.find({
            checkIn : {$gte: parseDate(this.startDate)},
            checkOut: {$lte: parseDate(this.endDate)},
            services: {$not: {$size: 0}}

        });

        console.log(tmp.count());

        return tmp;

    },

    checkInDisp: function () {

        return formateDateForDisplay(this.checkIn);
    },

    checkOutDisp: function () {

        return formateDateForDisplay(this.checkOut);
    }



});

Template.reports.events({

    'submit form#bookingReport': function (e) {

        console.log(e);

        //window.open(e.target.baseURI , "_blank", "toolbar=yes, scrollbars=yes, resizable=yes, top=500, left=500, width=400, height=400");

    }


});