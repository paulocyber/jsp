Produto = function() {
	this.codProd;
	this.refProd;
	this.desProd;
	this.undProd;
	this.cusProd;
	this.preProd;
	this.marProd;
	this.idCatProd;
	this.subProd;
	this.datProd;
	this.atiProd;
};

Categoria = function(){
	this.nome;
};

Mesa = function(numero,estado){
	this.numero=numero;
	this.estado=estado;
};

Funcionario  = function(){
	this.codFunc;
	this.nomFunc;
	this.funcaoFunc;	
	this.atiFunc;
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
	this.idVenda;
	this.idProd;
	this.obsItem;
	this.qtdProdItem;
	this.vlrUnitProd;
	this.vlrTotal;
};

PlanosIrest = function(maxCat,maxMesas,maxFuncionarios,maxQtdProdutos){
	this.maxCat=maxCat;
	this.maxMesas=maxMesas;
	this.maxFuncionarios=maxFuncionarios;
	this.maxQtdProdutos=maxQtdProdutos;
};
