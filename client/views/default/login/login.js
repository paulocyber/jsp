Template.login.onRendered(function(){
       /* Meteor.call('hasUser', function (error, result) {
            Session.set('hasUsers', result);
        });
	    var hasUser = Session.get('hasUsers');

	    if(!hasUser){
	    	Router.go("register");
	    }*/
    });

Template.login.events({
    'submit form': function(event){
        event.preventDefault();
        var email = $('[name=email]').val();
        var password = $('[name=password]').val();
        Meteor.loginWithPassword(email, password, function(error){
    		console.log(error.reason);
		});
    }
});