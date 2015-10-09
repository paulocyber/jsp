focusInput = function(){
	$('input:text:visible:first').focus();	
}
var estadoLivre = "btn-success";
var estadoOcupado = "btn-primary";
var estadoBoqueado = "btn-danger";

var mesa = new Mesa();

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
		mesa._id = 	this._id;
		mesa.estado = this.estado;
		mesa.numero = this.numero;
		Session.set('selectedMesa', mesa);

		if (mesa.estado == estadoLivre) {
			$('#codGarcomAtend').val('');
			$('#qtdPessoas').val('');
			$('#nomeGarcom').text('');

			$('#aberturaMesa').modal('show');

		} else if (mesa.estado == estadoOcupado) {
			$('#incluirProduto').modal('show');
		}
		else{
			$('#bloqueioMesa').modal('show');
		}
	},
	//submit dos formularios 
	'submit #abrir': function(event) {
		event.preventDefault();
		var mesa = Session.get('selectedMesa');
		var codGarcomAtend = $('#codGarcomAtend').val();
		var qtdPessoas = $('#qtdPessoas').val();

		var venda = new Venda();

		venda.numeroMesa = mesa.numero;
		venda.codGarcomAtend = codGarcomAtend;
		venda.qtdPessoas = qtdPessoas;

		$('#aberturaMesa').modal('hide');
		Meteor.call('editarEstadoMesa', mesa._id, estadoOcupado);
		Meteor.call('iniciarVenda',venda);
	},
	'submit #incluir': function(event) {
		event.preventDefault();
		var mesa = Session.get('selectedMesa');



	},
	//botões dos modais
	'click #bloqueio':function(){
		var mesa = Session.get('selectedMesa');
		$('#incluirProduto').modal('hide');
		Meteor.call('editarEstadoMesa', mesa._id, estadoBoqueado);
	},
	'click #reabrir':function(){
		var mesa = Session.get('selectedMesa');
		$('#bloqueioMesa').modal('hide');
		Meteor.call('editarEstadoMesa', mesa._id, estadoOcupado);
	},
	'click #encerrar':function(){
		var mesa = Session.get('selectedMesa');
		$('#bloqueioMesa').modal('hide');
		Meteor.call('editarEstadoMesa', mesa._id, estadoLivre);
	},	
	'click #addObservacao': function(event) {
		event.preventDefault();
		$('#addObservacaoModal').modal('show');
	},
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
	},
	'shown.bs.modal .modal': function(){
     	focusInput();	
  	}
});
Template.modalIncluirProduto.events({
	'shown.bs.modal #addObservacaoModal': function(){
    	focusInput();
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
	},
	'shown.bs.modal .modal': function(){
    	focusInput();
  }
});