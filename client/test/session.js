
Template.testPage.created = function () {
    var testObj = {
        a: 0,
        b: 0,
        c: 0
    };

    Session.set('testObj', testObj);

}

Template.testPage.helpers({

    x: function () {

        return Session.get('testObj').a *3;

    }
});

Template.testPage.events({

    'click #delete': function(e) {

        delete Session.keys['testObj'];
    }
});