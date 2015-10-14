(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// server/funcionarioServer.js                                         //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
Meteor.publish('Funcionarios', function () {                           // 1
  return Funcionarios.find();                                          // 2
});                                                                    //
                                                                       //
Meteor.methods({                                                       // 5
  'adicionarFuncionario': function (data) {                            // 6
    //var currentUserId = Meteor.userId();                             //
                                                                       //
    if (Funcionarios.find().count() == configPlanoBasic.maxFuncionarios) {
      return new Mensage('sucesso', 'Quantidade de funcionários no Plano Basico no limite, faça upgrade do seu Plano!');
    } else {                                                           //
      Funcionarios.insert(data);                                       // 12
      return new Mensage('sucesso', 'Funcionário adicionado com Sucesso!');
    }                                                                  //
  },                                                                   //
                                                                       //
  'desativarFuncionario': function (idFunc) {                          // 17
    Funcionarios.update({ _id: idFunc }, { $set: { atiFunc: false } });
  }                                                                    //
});                                                                    //
/////////////////////////////////////////////////////////////////////////

}).call(this);

//# sourceMappingURL=funcionarioServer.js.map
