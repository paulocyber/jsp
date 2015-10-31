
Comanda = function(){
	this.textHeader;
	this.codGarcomAtend;
	this.numeroMesa;
	this.datVenda;
	this.listItens = new Array();
	this.qtdPessoas;
	this.vlrTotalItens;
	this.vlrTotalVenda;
	this.vlrPorPessoa;
	this.horAberMesa;
	this.temPermanencia;
	this.taxaServico;
	this.textFooter;
	this.tipo;
};
ItemComanda = function(){
	this._id;
	this.seqItem;
	this.desProd;
	this.preProd;
	this.qtdProdItem;
	this.vlrTotal;
};
