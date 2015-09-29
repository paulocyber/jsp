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
	this.estado=estado;
};

Funcionario  = function(){
	this._id;
	this.nome;
	this.funcao;	
};

Venda = function(){
	this.numeroMesa;
	this.codGarcomAtend;
	this.qtdPessoas;
	this.horAberMesa;
	this.temPermaneca;
	this.horSaiMesa;
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
