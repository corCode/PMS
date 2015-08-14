
/**
 * Created by corrie on 4/1/15.
 */

Template.accountCreate.events({

    'submit form': function(e) {

        e.preventDefault();

        var account = {

            username: $(e.target).find('[name=username]').val(),
            email: $(e.target).find('[name=email]').val(),
            password: $(e.target).find('[name=password]').val(),
            role: $(e.target).find('[name=role]').val(),
            created: new Date()
        };

        //userType: $(e.target).find('[name=role]').val(),
        //createdBy: Meteor.user().username

        var profileVar = {userType: $(e.target).find('[name=role]').val()};

        //alert(profileVar.userType);
        /**
        Meteor.users.insert({
            username: account.username,
            profile : {
                userType : $(e.target).find('[name=role]').val(),
                createdBy: Meteor.user().username
            }
        });
         **/
        var newUser = {
            username: account.username,
            email: $(e.target).find('[name=email]').val(),
            userType: $(e.target).find('[name=role]').val(),
            password: $(e.target).find('[name=password]').val()

            };

        console.log(newUser);
    Meteor.call('usersInsert', newUser , function (error, result) {

            if (error)
            //return alert(error.reason);
                throwError(error.reason);

            //Router.go('payment', {_id: result._id});

        });



        /**
        Accounts.createUser({
            username: account.username,
            email: account.email,
            password: account.password,
            profile: {
                userType : $(e.target).find('[name=role]').val(),
                createdBy: Meteor.user().username
            }
        });
         ***/

        var newUserId =  Meteor.users.findOne({username : newUser.username});

        if (newUserId !== -1)
            alert("New account created successfully!");
        else
            alert(newUser.username + " already exists!");


        $("form")[0].reset();

        //Router.go('accountPage', {_id: newUserId});

        /****
        Meteor.call('accountInsert', account, function(error, result){
            if (error)
                return alert(error.reason);

            if (result.accountExists)
                alert('This email already exists.');

            Router.go('accountPage', {_id: result._id});

        });

         ***/
        //property._id = Properties.insert(property);
        //Router.go('propertyPage', property);

    }

});