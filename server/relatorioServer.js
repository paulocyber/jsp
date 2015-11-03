
Meteor.methods({
	'graficoVendas': function () {
		if(validacao()){
			var listProduto = Produtos.find({atiProd:true});
			var data = new Array();
			listProduto.forEach(function (prod) {
				var soma=0;
				var nome = prod.desProd;
				var listItens = Itens.find({idProd: prod._id, isCancelado: false});
				listItens.forEach(function (item) {
					soma +=item.qtdProdItem;
				});

				data.push([nome,soma]);
			});
			return  data;
		}
	}
});