//teste git alteraçoes
Meteor.subscribe('Produtos');
Meteor.subscribe('Categorias');

message = '';


//Função comuns 
function atribuirProduto() {
	var prod = new Produto();

	prod.codProd = $('[id="codProd"]').val().toUpperCase();
	prod.refProd = $('[id="refProd"]').val().toUpperCase();
	prod.desProd = $('[id="desProd"]').val().toUpperCase();
	prod.undProd = $('[id="undProd"]').val().toUpperCase();
	prod.cusProd = $('[id="cusProd"]').val();
	prod.preProd = $('[id="preProd"]').val();
	prod.marProd = $('[id="marProd"]').val();

	var nomeCat = $('[id="catProd"]').val().toUpperCase();
	var categoria = Categorias.findOne({
		nome: nomeCat
	});

	prod.idCatProd = categoria._id;
	prod.subProd = $('[id="subProd"]').val().toUpperCase();
	prod.datProd = new Date().toDateString();
	prod.atiProd = true;

	return prod;
}

function zeraCamposProduto() {
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
	'listCategoria': function() {
		return Categorias.find();
	},
	'titleModal': function() {
		return titulo;
	},
	'corpoModal': function() {
		return message;
	}
});

Template.addProduto.events({
	'submit form': function(event) {
		event.preventDefault();
		atribuirProduto();

		Meteor.call('adicionarProduto', atribuirProduto(), function(error, result) {
			Session.set('messageCall', result);
		});

		message = Session.get('messageCall');

		zeraCamposProduto();
	},

	'keyup [id=preProd]': function(event) {
		event.preventDefault();
		var cusProd = $('[id=cusProd]').val();
		var preProd = $('[id=preProd]').val();
		var marProd = (preProd / cusProd * 100) - 100;
		$('[id=marProd]').val(parseInt(marProd));
	},

	'keyup [id=marProd]': function(event) {
		event.preventDefault();
		var cusProd = new Number($('[id=cusProd]').val());
		var marProd = new Number($('[id=marProd]').val());
		var preProd = marProd * cusProd / 100 + cusProd;
		$('[id=preProd]').val(preProd.toFixed(2));
	},
	'click [id=addCategoria]': function(event) {
		event.preventDefault();
		$('#addCategoriaModal').modal('show');
	}
});

//Helpers e Events do template listProduto
Template.listProduto.helpers({
	'listProduto': function() {
		return Produtos.find({
			atiProd: true
		}, {
			sort: {
				codProd: 1
			}
		});
	},
	'nomeCat':function(){
		var catId = this.idCatProd;
		var categoria =Categorias.findOne(catId);
		var nome =  categoria && categoria.nome;

		return nome;	
			
	}
});
Template.listProduto.events({
	'click [name=btnDesativar]': function(event) {
		event.preventDefault();
		var idProd = this._id;
		var confirm = window.confirm('Tem certeza que deseja DELETAR?');
		if (confirm) {
			Meteor.call('desativarProduto', idProd);
		}
	}
});

//Helpers e Events do template modal para produto

Template.modalCategoria.events({
	'click [id=saveCat]': function(event) {
		event.preventDefault();
		var data = new Categoria();
		data.nome = $('[id="nomeCat"]').val().toUpperCase();

		if (Categorias.findOne({
				nome: data.nome
			})) {
			$('.message-erro').fadeIn('slow');
			$('.message-erro').fadeOut(5000);
		} else {
			Meteor.call('addCategorias', data);
			$('#addCategoriaModal').modal('hide');
			$('[id="nomeCat"]').val('');
		}

	}
});