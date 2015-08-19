/**
 * Created by corrie on 3/29/15.
 */

var doSearch = false;

Template.propertiesList.created = function () {

    /***
    if (!Session.get('checkInDate'))
        Session.set('checkInDate', new Date());

    if (!Session.get('checkOutDate')) {
        var d = new Date();
        d = d.setDate(d.getDate() + 3);
        d = new Date(d);
        Session.set('checkOutDate', d);
    }

    if (!Session.get('searchLocation'))
        Session.set('searchLocation', "")
***/





    console.log("propertiesList created");
    console.log(this.data);
    Session.set('doSearch', false);

}

Template.propertiesList.rendered = function () {

    console.log("rendered...");
    console.log(this.data.query);
    var today = new Date();

    if (this.data.query.submit === "Search")
    {

        if (isValidFutureDate(this.data.query.checkIn)) {

            var checkIn = parseDate(this.data.query.checkIn);
            console.log("query checkIn: " + checkIn);
            console.log(checkIn < today);

            if (checkIn < today)
                checkIn = today;
            Session.set('checkInDate', checkIn);
            console.log("Session: " + Session.get("checkInDate"));
        }

        if (isValidFutureDate(this.data.query.checkOut)) {

            var checkOut = parseDate(this.data.query.checkOut);
            if (checkOut < today)
                checkOut = addDaystoDate(today, 3);
            Session.set('checkOutDate', checkOut);
        }

        if (this.data.query.occupancy && this.data.query.occupancy > 0)
        {
            Session.set('occupancy', this.data.query.occupancy);
        }
        else
            Session.set('occupancy', 2);


        //Session.set('searchCity', this.data.query.destination.split());
        //Session.set('searchCountry', this.data.query.destination.split());
        doSearch = true;
        console.log("doSearch : " + doSearch);

    }

    if (this.data.query.destination) {

        console.log("query destination: " + this.data.query.destination);

        var destinationParts = this.data.query.destination.split(",");

        console.log(destinationParts);

        if (destinationParts.length === 2) {
            Session.set('searchCity', destinationParts[0].trim());
            Session.set('searchCountry', destinationParts[1].trim());
        }
        else
            Session.set('searchCountry', this.data.query.destination.trim());

    }
    //document.getElementById('sortOption').value = "byName";
    //console.log(document.getElementById('sortOption'));
};


Template.propertiesList.helpers({

    properties: function() {

        //if (Session.get('searchLocation') === "")
            //return Properties.find({"availableDates.startDate":{$lt : Session.get('checkInDate')}});

        //return Properties.find({}, {sort: {submitted: -1}});

        console.log(Session.get('sortOrder'));

        console.log(Properties.find({}, {sort: {submitted: -1}}).count());

        switch (Session.get('sortOrder')) {
            case "byLowestPrice":

                return Properties.find({}, {sort: {rate: 1}});
                break;
            case "byHighestPrice":
                return Properties.find({}, {sort: {rate: -1}});
                break;
            case "byName":
                return Properties.find({}, {sort: {title: 1}});
                break;
            case "byLocation":
                return Properties.find({}, {sort: {"address.city": 1, "address.country": 1}});
                break;
            default :

                return Properties.find({}, {sort: {submitted: -1}});

        }

        if (document)
            document.getElementsById('sortOption').value = Session.get('sortOrder');

        //return Properties.find({}, {sort: {sortOrder: -1}});

       //db.properties.find({"availableDates.startDate":{$lt : new ISODate("2015-04-01")}})

    },

    searchResults: function() {
        console.log("enter Search...");


        //if (Session.get('doSearch')) {

            if (!Session.get('checkInDate') && !Session.get('checkOutDate') && !Session.get('searchCity') && !Session.get('searchCountry'))
                return null;
            else if (!Session.get('checkInDate') && !Session.get('checkOutDate')) {
                //Search base on location only
                var cityRegex = new RegExp(Session.get('searchCity'), 'i');
                var countryRegex = new RegExp(Session.get('searchCountry'), 'i');
                console.log(cityRegex);
                console.log(countryRegex);

                var results = Properties.find({
                    "address.city": cityRegex,
                    "address.country": countryRegex
                }, {sort: {submitted: -1}});

                Session.set('resultsCount', results.count());
                console.log("searchResults " + results.count());
                console.log(results);
                return results;
            }
            else {
                console.log("doSearch - full search");

                var checkInModified = parseDate(formateDates(Session.get('checkInDate')));
                var checkOutModified = parseDate(formateDates(Session.get('checkOutDate')));
                console.log(checkInModified);
                console.log(checkOutModified);

                var cityRegex = new RegExp(Session.get('searchCity'), 'i');
                var countryRegex = new RegExp(Session.get('searchCountry'), 'i');
                console.log(cityRegex);
                console.log(countryRegex);

                var occupancy = Number(Session.get('occupancy'));
                console.log(occupancy);

                var results = Properties.find({
                    "availableDates.startDate": {$lte: checkInModified},
                    "availableDates.endDate": {$gte: checkOutModified},
                    "address.city": cityRegex,
                    "address.country": countryRegex,
                    "occupancy": {$gte: occupancy}

                }, {sort: {submitted: -1}});
                /**
                var results = Properties.find({

                    "address.city": cityRegex,
                    "address.country": countryRegex
                }, {sort: {submitted: -1}});
                **/
                    /**
                var results = Properties.find({
                    "availableDates.startDate": {$lte: checkInModified},
                    "availableDates.endDate": {$gte: checkOutModified}
                }, {sort: {submitted: -1}});
                     **/

                //find({"availableDates.startDate":{$lte : new ISODate("2015-04-01")}, title: "001"})



                    Session.set('resultsCount', results.count());
                    //Session.set('doSearch', false);
                    console.log("searchResults " + results.count());
                    console.log(results);
                    return results;



            }
        //}
            //Session.set('doSearch', false);

    },

    searchResultsCount: function() {

        if (Session.get('resultsCount') !== undefined)
        return Session.get('resultsCount');
    },
    
    isSearched: function() {

        return (Session.get('resultsCount') !== undefined)
    },

    checkInDate: function() {

//return "2015-03-08";
        if (!Session.get('checkInDate'))
            return "";
        return formateDates(Session.get('checkInDate'));

    },

    checkOutDate: function () {

        if (!Session.get('checkOutDate'))
            return "";

        /***
        var d = new Date();
        d = d.setDate(d.getDate() + 3);
        d = new Date(d);
        //return formateDates(d);
         ***/
        return formateDates(Session.get('checkOutDate'));
    },

    searchCity: function () {

        return Session.get('searchCity');
    },

    searchCountry: function() {

        return Session.get('searchCountry');
    },

    todayDate: function () {

        return formateDates(new Date);
    },

    occupancySelections: function () {

        return [1,2,3,4,5];
    },

    selectedOccupancy: function () {

        if (Session.get('occupancy') == this)
            return "selected";

    }

});


Template.propertiesList.events({

    'click #search': function(e) {


        //var checkIn = new Date(document.getElementById('checkIn').value);
        //Session.set('checkInDate', checkIn);

        //var checkOut = new Date(document.getElementById('checkOut').value);
        //Session.set('checkOutDate', checkOut);
        //Session.set('searchCity',$(e.target).find('[name=searchCity]').val());
        //Session.set('searchCountry',$(e.target).find('[name=searchCountry]').val());

        Session.set('searchCity',document.getElementById('searchCity').value.trim());
        Session.set('searchCountry',document.getElementById('searchCountry').value.trim());



        console.log("getEle..." + document.getElementById('occupancy').value);
        Session.set('occupancy',document.getElementById('occupancy').value);

        Session.set('doSearch', true);
        console.log("doSearch : " + Session.get('doSearch'));


    },

    'submit form': function(e) {
        var checkIn = new Date($(e.target).find('[name=checkIn]').val());
        Session.set('checkInDate', checkIn);

        var checkOut = new Date($(e.target).find('[name=checkOut]').val());
        Session.set('checkOutDate', checkOut);
        Session.set('searchCity',$(e.target).find('[name=searchCity]').val());
        Session.set('searchCountry',$(e.target).find('[name=searchCountry]').val());
        Session.set('occupancy',$(e.target).find('[name=occupancy]').val());
        doSearch = true;
        console.log("doSearch : " + doSearch);
    },


    'change #checkIn': function(e) {

        //Set the Check out date when user select a checkIn
        var checkIn = parseDate(event.target.value);
        Session.set('checkInDate', checkIn);
        console.log("date changed...");
        console.log(Session.get('checkInDate'));



            //var d = Session.get('checkInDate');
        var d = checkIn;
            d = d.setDate(d.getDate() + 3);
            d = new Date(d);
            Session.set('checkOutDate', d);
        console.log(Session.get('checkOutDate'));
            document.getElementById('checkOut').value = formateDates(d);


    },

    'change #sortOption': function(e) {


        Session.set('sortOrder', event.target.value);
    },

    'reset form': function(e) {


        Session.set('checkInDate', "");


        Session.set('checkOutDate', "");
        Session.set('searchCity',"");
        Session.set('searchCountry',"");
        Session.set('occupancy', 2);
        Session.set('resultsCount', undefined);
        doSearch = true;
        console.log("doSearch : " + doSearch);
    }

     /***,

    'change #checkOut': function(e) {

        var checkOut = new Date(event.target.value);
        Session.set('checkOutDate', checkOut);

    }
***/

});

