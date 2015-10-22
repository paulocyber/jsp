obterListProd = function(){
	return Produtos.find({atiProd: true}, {sort: {desProd: 1}});
}
//Helpers e Events do template listProduto
Template.tableListProd_desktop.helpers({
	listProduto: function() {
		return obterListProd();
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
		return obterListProd();
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

