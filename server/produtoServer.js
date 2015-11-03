Meteor.publish('Produtos', function() {
  return Produtos.find({atiProd: true})
});

// Meteor.publish('ProdutosAtivos', function() {
//   return Produtos.find({atiProd: true})
// });



Meteor.methods({
  'adicionarProduto': function(prod) {
    if(validacao()){
        if (Produtos.find({atiProd:true}).count() == configPlanoBasic.maxQtdProdutos) {      
            return  new Mensage('atencao','Quantidade de Produtos no Plano Basico no limite, faça upgrade do seu Plano!');
        } else if(Produtos.findOne({codProd:prod.codProd,atiProd:true})) {
            return false;
        }else{
            Produtos.insert(prod);
            return new Mensage('sucesso','Produto adicionado com Sucesso!');
        }
    }
  },

  'desativarProduto': function(idProd) {
    if(validacao()){
        if(Vendas.findOne({atiVenda: true})){
            return new Mensage('atencao','Há mesas abertas!!');
        }else{
            Produtos.update({_id: idProd}, {$set: {atiProd: false}});
            return new Mensage('aviso','Produto deletado!!!');
        }
    }
  }

});
