Meteor.methods({
	'r-vendas': function () {
		var listProduto = Produtos.find();
		var data = new Array();
		listProduto.forEach(function (prod) {
			var soma=0;
			var nome = prod.desProd;
			var listItens = Itens.find({idProd: prod._id});
			listItens.forEach(function (item) {
				soma +=item.qtdProdItem;
			});

			data.push([nome,soma]);
		});
		return  data;
	}
});