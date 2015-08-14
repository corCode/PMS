Accounts.config({
    sendVerificationEmail: true
});


Accounts.onCreateUser(function(options, user) {

    if (options.profile)
    {
        if (options.profile.userType)
            user.profile = options.profile;
        else
            user.profile = {
                userType: "generalUser"

            }
    }

/*
    UserAccounts.insert({
        userId: options.userId,
        username: options.username,
        role: options.profile.userType,
        submitted: new Date(),
        modified: new Date()
    });
*/
    return user;
});



