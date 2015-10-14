(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// lib/models/models.js                                                //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
Produto = function () {                                                // 1
	this.codProd;                                                         // 2
	this.refProd;                                                         // 3
	this.desProd;                                                         // 4
	this.undProd;                                                         // 5
	this.cusProd;                                                         // 6
	this.preProd;                                                         // 7
	this.marProd;                                                         // 8
	this.idCatProd;                                                       // 9
	this.subProd;                                                         // 10
	this.datProd;                                                         // 11
	this.atiProd;                                                         // 12
};                                                                     //
                                                                       //
Categoria = function () {                                              // 15
	this.nome;                                                            // 16
};                                                                     //
                                                                       //
Observacao = function () {                                             // 19
	this.nome;                                                            // 20
};                                                                     //
                                                                       //
Mesa = function (numero, estado) {                                     // 23
	this.numero = numero;                                                 // 24
	this.estado = estado;                                                 // 25
};                                                                     //
                                                                       //
Funcionario = function () {                                            // 28
	this.codFunc;                                                         // 29
	this.nomFunc;                                                         // 30
	this.funcaoFunc;                                                      // 31
	this.atiFunc;                                                         // 32
};                                                                     //
                                                                       //
Historico = function () {                                              // 35
	this.textHeader;                                                      // 36
	this.codGarcomAtend;                                                  // 37
	this.numeroMesa;                                                      // 38
	this.datVenda;                                                        // 39
	this.listItens = new Array();                                         // 40
	this.qtdPessoas;                                                      // 41
	this.vlrTotalVenda;                                                   // 42
	this.vlrPorPessoa;                                                    // 43
	this.horAberMesa;                                                     // 44
	this.temPermanencia;                                                  // 45
	this.textFooter;                                                      // 46
};                                                                     //
ItemHistorico = function () {                                          // 48
	this.seqItem;                                                         // 49
	this.desProd;                                                         // 50
	this.preProd;                                                         // 51
	this.qtdProdItem;                                                     // 52
	this.vlrTotal;                                                        // 53
};                                                                     //
                                                                       //
Venda = function () {                                                  // 56
	this.numeroMesa = 0;                                                  // 57
	this.codGarcomAtend;                                                  // 58
	this.qtdPessoas = 1;                                                  // 59
	this.horAberMesa;                                                     // 60
	this.temPermanencia;                                                  // 61
	this.horSaiMesa;                                                      // 62
	this.vlrTotal;                                                        // 63
	this.atiVenda;                                                        // 64
};                                                                     //
                                                                       //
Item = function () {                                                   // 67
	this.idVenda;                                                         // 68
	this.idProd;                                                          // 69
	this.idObsItem;                                                       // 70
	this.qtdProdItem;                                                     // 71
	this.vlrTotal;                                                        // 72
	this.isCancelado;                                                     // 73
};                                                                     //
                                                                       //
PlanosIrest = function (maxCat, maxMesas, maxFuncionarios, maxQtdProdutos) {
	this.maxCat = maxCat;                                                 // 77
	this.maxMesas = maxMesas;                                             // 78
	this.maxFuncionarios = maxFuncionarios;                               // 79
	this.maxQtdProdutos = maxQtdProdutos;                                 // 80
};                                                                     //
Mensage = function (tipo, mens) {                                      // 82
	this.tipo = tipo;                                                     // 83
	this.mens = mens;                                                     // 84
};                                                                     //
/////////////////////////////////////////////////////////////////////////

}).call(this);

//# sourceMappingURL=models.js.map
