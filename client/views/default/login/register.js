Template.register.onRendered(function(){
		/*Meteor.call('hasUser', function (error, result) {
            Session.set('hasUsers', result);
        });
	    var hasUser = Session.get('hasUsers');
	    
	    if(hasUser){
	    	Router.go("login");
	    }*/
    });

Template.register.events({
    'submit form': function(event){
        event.preventDefault();
        var email = $('[name=email]').val();
        var password =''+$('[name=password]').val();
	    Accounts.createUser({email: email, password: password}, 
	    	function(error){
	    		if(error){
	    		    console.log(error.reason); // Output error if registration fails
	    		} else {
	        		Router.go("home"); // Redirect user if registration succeeds
	    		}
		});
    }
});