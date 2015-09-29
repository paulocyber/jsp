Produto = function() {
	this._id;
	this.refProd;
	this.desProd;
	this.undProd;
	this.cusProd;
	this.preProd;
	this.marProd;
	this.catProd;
	this.subProd;
	this.datProd;
	this.atiProd;
};

Categoria = function(nome){
	this.nome = nome;
};

Mesa = function(numero,estado){
	this.numero=numero;
	this.codGarcomAtend;
	this.qtdPessoas;
	this.horAberMesa;
	this.temPermaneca;
	this.horSaiMesa;
	this.estado=estado;
};

Venda = function(){
	this.codMesa;
	this.listItens = new Array();
	this.datVenda;
	this.vlrTotal;
};

Item = function(){
	this.codVenda;
	this.codProd;
	this.obsItem;
	this.qtdProdItem;
	this.vlrUnitProd;
	this.vlrTotal;
};

PlanosIrest = function(maxCat,maxMesas,maxGarcons,maxQtdProdutos){
	this.maxCat=maxCat;
	this.maxMesas=maxMesas;
	this.maxGarcons=maxGarcons;
	this.maxQtdProdutos=maxQtdProdutos;
};
