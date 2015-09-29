//teste git alteraçoes
Meteor.subscribe('Produtos');
var testegit = "a";
//Temos que criar um form para o cadastro de categorias
var Categorias = [new Categoria("BAR"),new Categoria("COZINHA"),new Categoria("CHURRASQUEIRA")];

//Função comuns 
function atribuirProduto(){
		var prod = new Produto();

		prod._id = $('[id="codProd"]').val().toUpperCase();
		prod.refProd = $('[id="refProd"]').val().toUpperCase();
		prod.desProd = $('[id="desProd"]').val().toUpperCase();
		prod.undProd = $('[id="undProd"]').val().toUpperCase();
		prod.cusProd = $('[id="cusProd"]').val();
		prod.preProd = $('[id="preProd"]').val();
		prod.marProd = $('[id="marProd"]').val();
		prod.catProd = $('[id="catProd"]').val().toUpperCase();
		prod.subProd = $('[id="subProd"]').val().toUpperCase();
		prod.datProd = new Date().toDateString();
		prod.atiProd = true;

		return prod;
}
function zeraCamposProduto(){
		$('[id="codProd"]').val('');
		$('[id="refProd"]').val('');
		$('[id="desProd"]').val('');
		$('[id="undProd"]').val('');
		$('[id="cusProd"]').val('');
		$('[id="preProd"]').val('');
		$('[id="marProd"]').val('');
		$('[id="catProd"]').val('');
		$('[id="subProd"]').val('');
}

//Helpers e Events do template addProduto
Template.addProduto.helpers({
	'listCategoria': function () {
		return Categorias;
	}
});

Template.addProduto.events({
	'submit form': function (event) {
		event.preventDefault();
	
		Meteor.call('adicionarProduto', atribuirProduto());

		zeraCamposProduto();
    },

    'keyup [id=preProd]': function(event){
    	event.preventDefault();
    	var cusProd = $('[id=cusProd]').val();
    	var preProd = $('[id=preProd]').val();
    	var marProd = (preProd / cusProd * 100)-100;
    	$('[id=marProd]').val(parseInt(marProd));
    },

    'keyup [id=marProd]': function(event){
    	event.preventDefault();
    	var cusProd = new Number($('[id=cusProd]').val());
    	var marProd = new Number($('[id=marProd]').val());
    	var preProd = marProd * cusProd / 100 +cusProd;
    	$('[id=preProd]').val(preProd.toFixed(2));
    }
});

//Helpers e Events do template listProduto
Template.listProduto.helpers({
	'listProduto': function () {
		return Produtos.find({atiProd: true},{sort: {codProd: 1}});
	}
});
Template.listProduto.events({
	'click [name=btnDesativar]': function (event) {
		event.preventDefault();
		var produtoId = this._id;
		var confirm = window.confirm('Tem certeza que deseja DELETAR?');
		if(confirm){
			Meteor.call('desativarProduto', produtoId);
		}
	},
	'click [name=btnEditar]': function (event) {
		event.preventDefault();
		var produtoId = this._id;
		var confirm = window.confirm('Tem certeza que deseja EDITAR?');
		if(confirm){
			Meteor.call('editarProduto', produtoId);
		}
	}
});

