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

Categoria = function() {
	this.nome;
};

Observacao = function() {
	this.nome;
};

Mesa = function(numero, estado) {
	this.numero = numero;
	this.estado = estado;
};

Funcionario = function() {
	this.codFunc;
	this.nomFunc;
	this.funcaoFunc;
	this.atiFunc;
};


Item = function(){
	this.idVenda;
	this.idProd;
	this.idObsItem;
	this.qtdProdItem;
	this.vlrTotal;
	this.isCancelado;
	this.criado;
	this.pronto;
};

PlanosIrest = function(maxCat, maxMesas, maxFuncionarios, maxQtdProdutos) {
	this.maxCat = maxCat;
	this.maxMesas = maxMesas;
	this.maxFuncionarios = maxFuncionarios;
	this.maxQtdProdutos = maxQtdProdutos;
};
Mensage = function(tipo,mens){
	this.tipo=tipo;
	this.mens=mens;
};

