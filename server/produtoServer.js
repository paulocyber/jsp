Meteor.publish('Produtos', function() {
  return Produtos.find({atiProd: true})
});

// Meteor.publish('ProdutosAtivos', function() {
//   return Produtos.find({atiProd: true})
// });



Meteor.methods({
  'adicionarProduto': function(data) {
    //var currentUserId = Meteor.userId();

    if (Produtos.find().count() == configPlanoBasic.maxQtdProdutos) {      
        return  new Mensage('atencao','Quantidade de Produtos no Plano Basico no limite, faça upgrade do seu Plano!');
    } else {
      Produtos.insert(data);
        return new Mensage('sucesso','Produto adicionado com Sucesso!');
    }
  },

  'desativarProduto': function(idProd) {
      Produtos.update({_id: idProd}, {$set: {atiProd: false}});
      return new Mensage('aviso','Produto deletado!!!');
  }


  /*
  'modifyPlayerScore': function(selectedPlayer,scorePlayer){
    var currentUserId = Meteor.userId();
    PlayersList.update({_id: selectedPlayer,createdBy: currentUserId},{$inc:{score:scorePlayer}})
  }*/

});