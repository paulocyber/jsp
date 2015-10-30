Template.qtdPessoasModal.events({
  'submit #qtdPesForm':function(event){
      event.preventDefault();
      var qtdPessoas = parseInt($('#qtdPessoas').val());
      Meteor.call('print', obterComanda(), function (error, result) {
          mensagem(result);
      });
  }
})/**
 * Created by SERVIDOR on 30/10/2015.
 */
