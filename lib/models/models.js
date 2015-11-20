Categoria = function() {
	this.nome;
};

Observacao = function() {
	this.codObs;
	this.nome;
};
Funcionario = function() {
	this.codFunc;
	this.nomFunc;
	this.funcaoFunc;
	this.atiFunc;
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

CamposFormReimp = function(data,mesa,codGarcom){
	this.data=data;
	this.mesa=mesa;
	this.codGarcom=codGarcom;
}