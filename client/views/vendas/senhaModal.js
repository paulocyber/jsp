/**
 * Created by paulocyber on 01/11/15.
 */

Template.senhaModal.events({
    'submit #form-senha': function (event){
        event.preventDefault();

        var password = $('#senha').val();

        Meteor.call('equalsSenha', password,function (error, result) {
            if(result){

                Modal.hide();
                mensagem(new Mensage('sucesso','Senha correta!!!'));
            }else{
                mensagem(new Mensage('atencao','Senha invalida!!!'));
            }
        });
    },
    'shown.bs.modal  .modal': function(){
        $('#senha').focus();
    }
});

