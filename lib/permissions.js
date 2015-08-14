/**
 * Created by corrie on 3/30/15.
 */
ownsDocument = function(userId, doc) {

    return doc && doc.userId == userId;
}

ownsProperty = function(userId, property) {

    return property && property.ownerId == userId;
}

checkAdmin = function() {

    return (Meteor.user().profile.userType.indexOf(CONSTANTS.USER_TYPE.ADMIN) > -1
            ||
            Meteor.user().profile.userType.indexOf(CONSTANTS.USER_TYPE.MANAGER) > -1) ;
}

checkOwner = function() {

    return (Meteor.user().profile.userType.indexOf(CONSTANTS.USER_TYPE.PROPERTY_OWNER) > -1);
}

checkGeneralUser = function() {

    return (Meteor.user().profile.userType.indexOf(CONSTANTS.USER_TYPE.GENERAL_USER) > -1);
}