Meteor.publish('MapaMesas',function(){
    return MapaMesas.find()
  });
Meteor.publish('Observacoes',function(){
    return Observacoes.find()
  });
Meteor.publish('Vendas',function(){
    return Vendas.find({atiVenda: true})
  });


Meteor.methods({
  'editarEstadoMesa':function(mesaId,estado){
      MapaMesas.update({_id: mesaId},{$set:{estado: estado}});
    }
});

Meteor.methods({
  'iniciarVenda':function(venda){
  	  venda.horAberMesa = new Date().getTime();
  	  venda.datVenda = new Date();
  	  venda.atiVenda = true;
      Vendas.insert(venda);
      return "Venda iniciada com sucesso!";
    }
});

Meteor.methods({
  'addObservacao':function(observacao){
      Observacoes.insert(observacao);
    }
});