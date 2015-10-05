Meteor.publish('MapaMesas',function(){
    return MapaMesas.find()
  });

Meteor.methods({
  'editarEstadoMesa':function(mesaId,estado){
      MapaMesas.update({_id: mesaId},{$set:{estado: estado}});
    }
});