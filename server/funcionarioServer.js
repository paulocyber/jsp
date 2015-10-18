Meteor.publish('Funcionarios',function(){
    return Funcionarios.find()
  });

Meteor.methods({
    'adicionarFuncionario': function(data){
      if(validacao()){
        if(Funcionarios.find().count()==configPlanoBasic.maxFuncionarios){
          return new Mensage('atencao','Quantidade de funcionários no Plano Basico no limite, faça upgrade do seu Plano!');
        }else{
          Funcionarios.insert(data);  
          return new Mensage('sucesso','Funcionário adicionado com Sucesso!');
        }      
      }
    },
    
    'desativarFuncionario': function(idFunc){
      if(validacao()){
        Funcionarios.update({_id: idFunc},{$set:{atiFunc: false}});
      }
    }
  });
