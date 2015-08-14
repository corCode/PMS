/**
 * Created by corrie on 3/23/15.
 */

/**
if (Properties.find().count() === 0) {
    Properties.insert({
        title: 'Property A',
        description: 'Spacious room....',
        rate: 50.00
    });

    Properties.insert({
        title: 'Meteor',
        description: 'Cosy appartment....',
        rate: 270.00
    });

    Properties.insert({
        title: 'The Meteor Book',
        description: 'Private Bedroom ....',
        rate: 130.00
    });
}

if (UserAccounts.find().count() === 0){

    UserAccounts.insert({
        userId: '000',
        username: 'Admin',
        role: 'Admin'
    });



}
 **/

initializeDB = function ()
{

    var now = new Date().getTime();

    var adminId = Meteor.users.insert({ username: 'admin', profile : { userType: 'A' }});
    var admin = Meteor.users.findOne(adminId);
    Accounts.setPassword(adminId, '1111111');


    var uId = Meteor.users.insert({ username: 'user1', profile : { userType: 'U' }});
    var u = Meteor.users.findOne(uId);
    Accounts.setPassword(uId, '1111111');

    uId = Meteor.users.insert({ username: 'owner1', profile : { userType: 'O' }});
    u = Meteor.users.findOne(uId);
    Accounts.setPassword(uId, '1111111');

    var propertyId = Properties.insert({
        title: 'First property...',
        ownerId: uId,
        owner: u.username,
        submitted: new Date()
    });


    uId = Meteor.users.insert({ username: 'owner2', profile : { userType: 'O' }});
    u = Meteor.users.findOne(uId);
    Accounts.setPassword(uId, '1111111');

    uId = Meteor.users.insert({ username: 'manager1', profile : { userType: 'M' }});
    u = Meteor.users.findOne(uId);
    Accounts.setPassword(uId, '1111111');


}

if (Properties.find().count() === 0) {

    initializeDB();
}

