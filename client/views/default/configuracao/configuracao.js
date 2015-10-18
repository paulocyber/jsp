Template.configuracao.events({
	'submit #btn-salvar-config': function(event){

		event.preventDefault();
		var password = $('#senha-cancelamento').val();

		if(password.length<3){
			mensagem(new Mensage('aviso','Sua tem que ser de 3 a 6 caracteres'));
		}else{
			Meteor.call('encrypMessage', password, function (error, result) {
				mensagem(result);
			});
		}

		$('#senha-cancelamento').val('');
	}
});