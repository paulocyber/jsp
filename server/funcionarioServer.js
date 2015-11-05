Meteor.publish('Funcionarios',function(){
    return Funcionarios.find({atiFunc:true})
  });

Meteor.methods({
    'adicionarFuncionario': function(func){
      if(validacao()){
        if(Funcionarios.find({atiFunc: true}).count()==configPlanoBasic.maxFuncionarios){
          return new Mensage('atencao','Quantidade de funcionários no Plano Basico no limite, faça upgrade do seu Plano!');
        }
        else if(Funcionarios.findOne({codFunc:func.codFunc,atiFunc:true}, {fields: {_id: 1}})) {
            return false;
        }else{
          Funcionarios.insert(func);
          return new Mensage('sucesso','Funcionário adicionado com Sucesso!');
        }
      }
    },

    'desativarFuncionario': function(idFunc){
      if(validacao()){
          if(Vendas.findOne({atiVenda: true})){
              return new Mensage('atencao','Há mesas abertas!!');
          }else{
              Funcionarios.update({_id: idFunc},{$set:{atiFunc: false}});
              return new Mensage('aviso','Funcionário deletado!!!');
          }
      }
    }
  });
