Template.qtdPessoasModal.events({
  'submit #qtdPesForm':function(event){
      event.preventDefault();
      var venda = Session.get('selectedVenda');
      var qtdPessoas = parseInt($('#qtdPessoas').val());
      venda.qtdPessoas = qtdPessoas;
      var result = Meteor.call('addQtdPessoas',venda);
      Meteor.call('print', obterComanda(), function (error, result) {
          mensagem(result);
      });
      Modal.hide();
  }
})/**
 * Created by SERVIDOR on 30/10/2015.
 */
