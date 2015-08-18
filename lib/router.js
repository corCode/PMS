
Router.configure({
    layoutTemplate: 'layout',

    loadingTemplate: 'loading',

    notFoundTemplate: 'notFound',

    /**
    waitOn: function() { return
        [
            Meteor.subscribe('properties')
            //Meteor.subscribe('bookings'),
            //Meteor.subscribe('messages'),
            //Meteor.subscribe('conversations')
            ]; }
     **/
    waitOn: function()
    {
        return [
            Meteor.subscribe('properties'),
            Meteor.subscribe('bookings'),
            Meteor.subscribe('conversations', Meteor.userId()),
            Meteor.subscribe('reviews'),
            Meteor.subscribe('notifications')
        ];

    }

});


Router.route('/', {
    name: 'index'
});

Router.route('/services', {

    name: 'services'
});

Router.route('/serviceDetail', {
    name: 'serviceDetail'
});

Router.route('/propertiesList', {name: 'propertiesList',
    waitOn: function()
    {
        return Meteor.subscribe('images')

    },
    data: function(){
        return this.params;
    }
});




Router.route('/myProperties', {
    name: 'myProperties',

    waitOn: function () {
        return Meteor.subscribe('images');
    }
});

Router.route('/reports', {
    name: 'reports',
    data: function () {

        return this.params.query;
    }
});


/*Router.route('/', {
    waitOn: function() {
        return Meteor.subscribe('images');
    },
    action: function () {
        if (this.ready())
            this.render('propertiesList');
        else
            this.render('loading');
    }
});*/

/*Router.route(‘/profile’,{
 waitOn: function () {

 },
 action: function () {
 if (this.ready())
 this.render(‘Profile’);
 else
 this.render(‘Loading’);
 }
 });*/

Router.route('/property/:_id', {
    name: 'propertyPage',
    data: function()
            {
                return Properties.findOne(this.params._id);
            }
});

Router.route('/property/:_id/edit', {
    name: 'propertyEdit',
    data: function()
            {
                return Properties.findOne(this.params._id);
            }
});

Router.route('/submit', {name: 'propertySubmit'});

/*
Router.route('/account', {
    name: 'accountPage',
    data: function()
    {
        return UserAccounts.findOne(this.params._id);
    }

});
*/

Router.route('/bookings', {name: 'bookingsList'});

Router.route('/bookings/:_id', {
   name: 'bookingDetails',
    data: function ()
    {
        return Bookings.findOne(this.params._id);
    }
});

Router.route('/bookings/:_id/edit', {
    name: 'bookingEdit',
    data: function()
    {
        return Bookings.findOne(this.params._id);
    }
});

Router.route('/inbox', {name: 'messagesList',
    waitOn: function()
    {
        return Meteor.subscribe('conversations', Meteor.userId());

    }
});

Router.route('/account', {name: 'accountPage'});

Router.route('/account/create', {name: 'accountCreate'});

Router.route('/test', {name: 'datepicker'});

Router.route('/payment/:_id', {
    name: 'payment',
    data: function ()
    {
        var tmp = Bookings.findOne(this.params._id);
        console.log(this.params._id);
        console.log(tmp);
        return Bookings.findOne(this.params._id);
    }
});







var requireLogin = function() {
    if (!Meteor.user()) {
        if (Meteor.loggingIn()) {
            this.render(this.loadingTemplate);
        }
        else {
            //this.render('accessDenied');

            //Router.go('propertiesList');
            Router.go('index');
        }
    }
    else
    {
        this.next();
    }
}

var adminOnly = function () {

    if (!Meteor.user()) {

        if (Meteor.loggingIn()) {
            this.render(this.loadingTemplate);
        }
        else
        {
            this.render('accessDenied');
        }
    }
    else {
        console.log(Meteor.user());
        console.log(Meteor.user().profile.userType);
        if (Meteor.user().profile.userType.indexOf(CONSTANTS.USER_TYPE.ADMIN) > -1
            ||
            Meteor.user().profile.userType.indexOf(CONSTANTS.USER_TYPE.MANAGER) > -1)
            this.next();

        else
            this.render('accessDenied');
    }

}



Router.onBeforeAction('dataNotFound', {only: ['propertyPage', 'propertyEdit', 'payment']});

Router.onBeforeAction(requireLogin, {except: ['propertyPage', 'propertiesList', 'index', 'services']});

//Router.onBeforeAction(adminOnly, {only: ['accountCreate', 'bookingsList']});

Router.onBeforeAction(adminOnly, {only: ['accountCreate']});

