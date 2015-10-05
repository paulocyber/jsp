Meteor.publish('Funcionarios',function(){
    return Funcionarios.find()
  });

Meteor.methods({
    'adicionarFuncionario': function(data){
      //var currentUserId = Meteor.userId();

      if(Funcionarios.find().count()==configPlanoBasic.maxFuncionarios){
        return 'Quantidade de Funcionarios no Plano Basico no limite, faça upgrade do seu Plano';
      }else{
        Funcionarios.insert(data);  
        return 'Produto adicionado com Sucesso!';
      }      
    },
    
    'desativarFuncionario': function(idFunc){
      Funcionarios.update({_id: idFunc},{$set:{atiFunc: false}});
    }
  });
