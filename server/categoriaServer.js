Meteor.publish('Categorias',function(){
    return Categorias.find()
});

Meteor.methods({
  'addCategorias':function(data){
  	  if(validacao()){
  	  	if (Categorias.find().count() == configPlanoBasic.maxCat) {      
            return  new Mensage('atencao','Quantidade de Categorias no Plano Basico no limite, faça upgrade do seu Plano!');
        } else {
            Categorias.insert(data);
            return new Mensage('sucesso','Categoria adicionado com Sucesso!');
        }
         
      }
    }
});