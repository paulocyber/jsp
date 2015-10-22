Meteor.subscribe('Configuracoes');

Template.configuracao.events({
	'submit #form-salvar-config-senha-cancel': function(event){

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
	},
	'submit #form-salvar-config-comanda': function(event){

		event.preventDefault();
		var title = $('#textHeader').val();
		var footer = $('#textFooter').val();

		
		Meteor.call('salvarCfgComanda', title, footer, function (error, result) {
				mensagem(result);
		});
		

		$('#textHeader').val('');
		$('#textFooter').val('');
	}
});