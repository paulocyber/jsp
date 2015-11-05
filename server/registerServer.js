
Meteor.methods({
	'hasUser': function () {
		var temUsuario = Meteor.users.find().count();
		return temUsuario;
	},
	'resgiter':function(email,password){
		id = Accounts.createUser({email: email, password: password});
		Roles.addUsersToRoles(id, 'admin');
		if(id)
			return true;
		else
			return false;


	}
});