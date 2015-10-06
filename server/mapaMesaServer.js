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
  'iniciarVenda':function(data){
  	  data.horAberMesa = new Data().getTime();
  	  data.datVenda = new Data();
  	  data.atiVenda = true;
      MapaMesas.inser(data);
      return "Venda iniciada com sucesso!";
    }
});

Meteor.methods({
  'addObservacao':function(data){
      Observacoes.insert(data);
    }
});