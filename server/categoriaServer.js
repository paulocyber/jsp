Meteor.publish('Categorias',function(){
    return Categorias.find()
  });

Meteor.methods({
  'addCategorias':function(data){
      Categorias.insert(data);
    }
});