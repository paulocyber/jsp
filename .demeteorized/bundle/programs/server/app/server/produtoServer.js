(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// server/produtoServer.js                                             //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
Meteor.publish('Produtos', function () {                               // 1
  return Produtos.find({ atiProd: true });                             // 2
});                                                                    //
                                                                       //
// Meteor.publish('ProdutosAtivos', function() {                       //
//   return Produtos.find({atiProd: true})                             //
// });                                                                 //
                                                                       //
Meteor.methods({                                                       // 11
  'adicionarProduto': function (data) {                                // 12
    //var currentUserId = Meteor.userId();                             //
                                                                       //
    if (Produtos.find().count() == configPlanoBasic.maxQtdProdutos) {  // 15
      return new Mensage('atencao', 'Quantidade de Produtos no Plano Basico no limite, faça upgrade do seu Plano!');
    } else {                                                           //
      Produtos.insert(data);                                           // 18
      return new Mensage('sucesso', 'Produto adicionado com Sucesso!');
    }                                                                  //
  },                                                                   //
                                                                       //
  'desativarProduto': function (idProd) {                              // 23
    Produtos.update({ _id: idProd }, { $set: { atiProd: false } });    // 24
    return new Mensage('aviso', 'Produto deletado!!!');                // 25
  }                                                                    //
                                                                       //
  /*                                                                   //
  'modifyPlayerScore': function(selectedPlayer,scorePlayer){           //
    var currentUserId = Meteor.userId();                               //
    PlayersList.update({_id: selectedPlayer,createdBy: currentUserId},{$inc:{score:scorePlayer}})
  }*/                                                                  //
                                                                       //
});                                                                    //
/////////////////////////////////////////////////////////////////////////

}).call(this);

//# sourceMappingURL=produtoServer.js.map
