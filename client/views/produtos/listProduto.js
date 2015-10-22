
//Helpers e Events do template listProduto
Template.tableListProd_desktop.helpers({
	listProduto: function() {
		return Produtos.find({
			atiProd: true
		}, {
			sort: {
				codProd: 1
			}
		});
	},
	formatDate:function(date){
		return moment(date).tz(localidade).format(formatoData);
	},
	nomeCat:function(){
		var catId = this.idCatProd;
		var categoria =Categorias.findOne(catId);
		var nome =  categoria && categoria.nome;

		return nome;	
			
	},
	formatCurrency:function(valor){
		return currency.toStr(valor);
	},
	formatMargem:function(valor){
		return (valor+" %")
	}
});

Template.tableListProd_phone.helpers({
	listProduto: function() {
		return Produtos.find({
			atiProd: true
		}, {
			sort: {
				codProd: 1
			}
		});
	},
	formatCurrency:function(valor){
		return currency.toStr(valor);
	}
});


Template.listProduto.events({
	'click #btnDesativar': function(event) {
		event.preventDefault();
		var idProd = this._id;
		var confirm = window.confirm('Tem certeza que deseja DELETAR?');
		if (confirm) {
			Meteor.call('desativarProduto', idProd, function(error, result){
				mensagem(result);
			});
		}
	}
});

