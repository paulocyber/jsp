Template.register.events({
    'submit form': function(event){
        event.preventDefault();
        var email = $('#email').val();
        var password =$('#senha').val();
		Meteor.call('resgiter',email,password, function(error,result){
			if(!result)
				mensagem(new Mensage('atencao',error.reason)); // Output error if registration fails
			else{
				Meteor.loginWithPassword(email, password);
				Router.go("painelAdministrativo"); // Redirect user if registration succeeds
			}


		});
    }
});