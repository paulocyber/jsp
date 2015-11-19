

Meteor.subscribe('MapaMesas');
Meteor.subscribe('Observacoes');
Meteor.subscribe('Vendas');
Meteor.subscribe('Funcionarios');
Meteor.subscribe('Produtos');
Meteor.subscribe('Itens');

//Helpers e Events do template mapaMesas
Template.mapaMesas.helpers({
	'geraMapaMesas': function() {
		return MapaMesas.find();
	},
	'icon':function(){
		if (this.estado == estadoLivre) {
			return "glyphicon-cutlery";
		}else if (this.estado == estadoOcupado) {
            return "glyphicon-cutlery";
		}else{
            return "glyphicon-ban-circle";
		}
	}
});

Template.mapaMesas.events({
	'click .mesa': function() {	
		var mesa = new Mesa();	
		mesa._id = 	this._id;
		mesa.estado = this.estado;
		mesa.numero = this.numero;
		Session.set('selectedMesa', mesa);
		
		if (mesa.estado == estadoLivre) {
			$('#codGarcomAtend').val('');
			$('#qtdPessoas').val('');
			$('#nomeGarcom').text('');


			/*Devido ao problema do botão voltar do navegador e 
			botão voltar dos celulares samsung tiver que add um
			pacote, peppelg:bootstrap-3-modal,para trabalhar com os modais do bootstrap assim 
			não fazer meu proprio modal*/
	        Modal.show('aberturaMesa');
			Session.set('selectedVenda', '');

		} else if (mesa.estado == estadoOcupado) {
			
			Session.set('selectedVenda', Vendas.findOne({numeroMesa:mesa.numero,atiVenda:true}));

			if(Session.get('selectedVenda').taxaServico)
				Session.set('taxaServico',true)
			else
				Session.set('taxaServico',false)

			Meteor.call('horaServe', function (error, result) {
				Session.set('horaServe', result);
			});
			Modal.show('incluirProduto');
		}
		else{
			Session.set('selectedVenda', Vendas.findOne({numeroMesa:mesa.numero,atiVenda:true}));
			Modal.show('encerraMesaModal');
		}
	},
	'click #btn-transferir-mesa':function(){
		Modal.show('adminRequestModal');
		adminCallback = function() {
			Modal.show('transfereMesaModal');
		}
	}
});

Template.encerraMesaModal.events({
	'click #reabrir':function(){
		var mesa = Session.get('selectedMesa');
		Modal.hide('bloqueioMesa');
		Meteor.call('editarEstadoMesa', mesa._id, estadoOcupado,function (error, result) {

		});

	},
	'click #encerrar':function(){
		var mesa = Session.get('selectedMesa');
		var venda = Session.get('selectedVenda');
		var historico = obterComanda();

		venda.temPermanencia = historico.temPermanencia;
		venda.horSaiMesa = new Date(Session.get('horaServe'));
		venda.vlrTotal = currency.parseStr(historico.vlrTotalVenda);
		venda.atiVenda = false;
		Modal.hide();

		Modal.show('adminRequestModal');
		adminCallback = function(){
			Meteor.call('editarEstadoMesa', mesa._id, estadoLivre,function (error, result) {

			});
			Modal.hide();
			var confirm = window.confirm('Desejar imprimir cupom?');
			if (confirm) {
				Meteor.call('print', obterComanda(venda));
			}
			Meteor.call('encerrarVenda', venda, function (error, result) {
				mensagem(result);
			});
		};

		Session.set('selectedVenda','');
	}
});



