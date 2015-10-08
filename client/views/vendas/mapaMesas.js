var estadoLivre = "btn-success";
var estadoOcupado = "btn-primary";
var estadoBoqueado = "btn-danger";

Meteor.subscribe('MapaMesas');
Meteor.subscribe('Observacoes');
Meteor.subscribe('Vendas');
Meteor.subscribe('Funcionarios');
Meteor.subscribe('Produtos');

//Helpers e Events do template mapaMesas
Template.mapaMesas.helpers({
	'geraMapaMesas': function() {
		return MapaMesas.find();
	},

});

Template.mapaMesas.events({
	'click .mesa': function() {
		var mesaId = this._id;
		var mesaEstado = this.estado;
		Session.set('selectedMesa', mesaId);

		if (this.estado == estadoLivre) {
			Session.set('estadoMesa', mesaEstado);

			$('#codGarcomAtend').val('');
			$('#qtdPessoas').val('');
			$('#nomeGarcom').text('');

			$('#aberturaMesa').modal('show');
		} else if (this.estado == estadoOcupado) {
			Session.set('estadoMesa', mesaEstado);
			$('#incluirProduto').modal('show');
		}
		else{
			Session.set('estadoMesa', mesaEstado);
			$('#bloqueioMesa').modal('show');
		}
	},
	'submit #abrir': function(event) {
		event.preventDefault();
		var mesaId = Session.get('selectedMesa');
		var mesaEstado = Session.get('estadoMesa');
		var codGarcomAtend = $('#codGarcomAtend').val();
		var qtdPessoas = $('#qtdPessoas').val();

		$('#aberturaMesa').modal('hide');
		Meteor.call('editarEstadoMesa', mesaId, estadoOcupado);

	},
	'click #bloqueio':function(){
		var mesaId = Session.get('selectedMesa');
		$('#incluirProduto').modal('hide');
		Meteor.call('editarEstadoMesa', mesaId, estadoBoqueado);
	},
	'click #reabrir':function(){
		var mesaId = Session.get('selectedMesa');
		$('#bloqueioMesa').modal('hide');
		Meteor.call('editarEstadoMesa', mesaId, estadoOcupado);
	},
	'click #encerrar':function(){
		var mesaId = Session.get('selectedMesa');
		$('#bloqueioMesa').modal('hide');
		Meteor.call('editarEstadoMesa', mesaId, estadoLivre);
	},	
	'click #addObservacao': function(event) {
		event.preventDefault();
		$('#addObservacaoModal').modal('show');
	}
});


Template.modalIncluirProduto.events({
	'keyup #codProd':function(){
		var codProd = $('#codProd').val();
		var produto = Produtos.findOne({codProd: codProd, atiProd: true});
		var desProd = produto && produto.desProd;

		if(desProd)
			$('#desProd').val(desProd);
		else
			$('#desProd').val('');
	}
});

Template.modalIncluirProduto.helpers({
	'listObservacao':function(){
		return Observacoes.find();
	}
});

Template.historico.helpers({

	'histMesa': function() {

		var id = Session.get('selectedMesa');

		return id;
	}

});

Template.modalObservacoes.events({
	'click #saveObs': function(event) {
		event.preventDefault();
		var data = new Observacao();
		data.nome = $('[id="nomeObs"]').val().toUpperCase();

		if (Observacoes.findOne({
				nome: data.nome
			})) {
			$('.message-erro').fadeIn('slow');
			$('.message-erro').fadeOut(5000);
		} else {
			Meteor.call('addObservacao', data);
			$('#addObservacaoModal').modal('hide');
			$('[id="nomeObs"]').val('');
		}


	}
});
Template.modalAbrirMesa.events({
	'keyup #codGarcomAtend':function(){
		var codFunc = $('#codGarcomAtend').val();
		var funcionario = Funcionarios.findOne({codFunc: codFunc});
		var nomFunc = funcionario && funcionario.nomFunc;

		if(nomFunc)
			$('#nomeGarcom').text(nomFunc);
		else
			$('#nomeGarcom').text('');
	}
});