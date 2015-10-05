Meteor.publish('Produtos', function() {
  return Produtos.find()
});

Meteor.methods({
  'adicionarProduto': function(data) {
    //var currentUserId = Meteor.userId();

    if (Produtos.find().count() == configPlanoBasic.maxQtdProdutos) {
      return 'Quantidade de Produtos no Plano Basico no limite, faça upgrade do seu Plano';
    } else {
      Produtos.insert(data);
      return 'Produto adicionado com Sucesso!';
    }
  },

  'desativarProduto': function(idProd) {
    Produtos.update({
      _id: idProd
    }, {
      $set: {
        atiProd: false
      }
    });
  }


  /*
  'modifyPlayerScore': function(selectedPlayer,scorePlayer){
    var currentUserId = Meteor.userId();
    PlayersList.update({_id: selectedPlayer,createdBy: currentUserId},{$inc:{score:scorePlayer}})
  }*/

});