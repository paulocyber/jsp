Template.qtdPessoasModal.events({
  'submit #qtdPesForm':function(event){
      event.preventDefault();
      var venda = Session.get('selectedVenda');
      var qtdPessoas = parseInt($('#qtdPessoas').val());
      venda.qtdPessoas = qtdPessoas;
      var result = Meteor.call('addQtdPessoas',venda);
      Session.set('selectedVenda',venda);
      Meteor.call('print', obterComanda(venda), function (error, result) {
          mensagem(result);
      });
      Modal.hide();
  },
  'shown.bs.modal .modal': function(){
        $('#qtdPessoas').focus();
    }
})/**
 * Created by SERVIDOR on 30/10/2015.
 */
