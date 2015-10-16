Template.register.events({
    'submit form': function(event){
        event.preventDefault();
        var email = $('#email').val();
        var password =$('#senha').val();
	    Accounts.createUser({email: email, password: password}, 
	    	function(error){
	    		if(error){
	    		    mensagem(new Mensage('atencao',error.reason)); // Output error if registration fails
	    		} else {
	    			Meteor.call('desativarCreateUser', function (error, result) {
	    				console.log(result);
	    			});
	        		Router.go("home"); // Redirect user if registration succeeds
	    		}
		});
    }
});