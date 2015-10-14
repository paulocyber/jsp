(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// server/mapaMesaServer.js                                            //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
Meteor.publish('MapaMesas', function () {                              // 1
  return MapaMesas.find();                                             // 2
});                                                                    //
Meteor.publish('Observacoes', function () {                            // 4
  return Observacoes.find();                                           // 5
});                                                                    //
Meteor.publish('Vendas', function () {                                 // 7
  return Vendas.find({ atiVenda: true });                              // 8
});                                                                    //
                                                                       //
Meteor.publish('Itens', function () {                                  // 11
  return Itens.find();                                                 // 12
});                                                                    //
                                                                       //
Meteor.methods({                                                       // 15
  'editarEstadoMesa': function (mesaId, estado) {                      // 16
    MapaMesas.update({ _id: mesaId }, { $set: { estado: estado } });   // 17
  }                                                                    //
});                                                                    //
                                                                       //
Meteor.methods({                                                       // 21
  'iniciarVenda': function (data) {                                    // 22
    data.horAberMesa = new Date();                                     // 23
    data.atiVenda = true;                                              // 24
    Vendas.insert(data);                                               // 25
    return "Venda iniciada com sucesso!";                              // 26
  },                                                                   //
  'incluirProduto': function (data) {                                  // 28
    data.isCancelado = false;                                          // 29
    Itens.insert(data);                                                // 30
  },                                                                   //
  'encerrarVenda': function (venda) {                                  // 32
    Vendas.update({ _id: venda._id }, { $set: {                        // 33
        // numeroMesa: venda.numeroMesa,                               //
        // codGarcomAtend: venda.codGarcomAtend,                       //
        // qtdPessoas: venda.qtdPessoas,                               //
        // horAberMesa: venda.horAberMesa,                             //
        temPermanencia: venda.temPermanencia,                          // 39
        horSaiMesa: venda.horSaiMesa,                                  // 40
        vlrTotal: venda.vlrTotal,                                      // 41
        atiVenda: venda.atiVenda                                       // 42
      }                                                                //
    });                                                                //
  },                                                                   //
  'horaServe': function () {                                           // 47
    return new Date();                                                 // 48
  }                                                                    //
});                                                                    //
                                                                       //
Meteor.methods({                                                       // 52
  'addObservacao': function (data) {                                   // 53
    Observacoes.insert(data);                                          // 54
  }                                                                    //
});                                                                    //
/////////////////////////////////////////////////////////////////////////

}).call(this);

//# sourceMappingURL=mapaMesaServer.js.map
