
Meteor.methods({
	'hasUser': function () {
		var temUsuario = Meteor.users.find().count();
		if(temUsuario){

		}
		return temUsuario;
	},
	'desativarCreateUser':function(){
		Accounts.config({forbidClientAccountCreation : true});
		return 'desativou';
	}
});