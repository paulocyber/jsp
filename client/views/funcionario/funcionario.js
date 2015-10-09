//teste git alteraçoes
Meteor.subscribe('Funcionarios');

//Função comuns 
function atribuirFuncionario(){
		var func = new Funcionario();

		func.codFunc = $('[id="codFunc"]').val().toUpperCase();
		func.nomFunc = $('[id="nomFunc"]').val().toUpperCase();
		func.funcaoFunc = $('[id="funcaoFunc"]').val().toUpperCase();
		func.atiFunc = true;

		return func;
}
function zeraCamposFunc(){
		$('[id="codFunc"]').val('');
		$('[id="nomFunc"]').val('');
		$('[id="funcaoFunc"]').val('');
}

//Helpers e Events do template addFuncionario
Template.addFuncionario.helpers({
	
});

Template.addFuncionario.events({
	'submit form': function (event) {
		event.preventDefault();
	
		Meteor.call('adicionarFuncionario', atribuirFuncionario(), function(error, result){
			mensagem(result);
		});

		zeraCamposFunc();
    }
});

//Helpers e Events do template listfuncuto
Template.listFuncionarios.helpers({
	'listFuncionarios': function () {
		return Funcionarios.find({atiFunc: true},{sort: {codFunc: 1}});
	}
});
Template.listFuncionarios.events({
	'click [name=btnDesativar]': function (event) {
		event.preventDefault();
		var idFunc = this._id;
		var confirm = window.confirm('Tem certeza que deseja DELETAR?');
		if(confirm){
			Meteor.call('desativarFuncionario', idFunc);
		}
	}
});

