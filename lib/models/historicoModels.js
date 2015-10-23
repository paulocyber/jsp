
Comanda = function(){
	this.textHeader;
	this.codGarcomAtend;
	this.numeroMesa;
	this.datVenda;
	this.listItens = new Array();
	this.qtdPessoas;
	this.vlrTotalVenda;
	this.vlrPorPessoa;
	this.horAberMesa;
	this.temPermanencia;
	this.taxaServico;
	this.textFooter;
};
ItemComanda = function(){
	this._id;
	this.seqItem;
	this.desProd;
	this.preProd;
	this.qtdProdItem;
	this.vlrTotal;
};
