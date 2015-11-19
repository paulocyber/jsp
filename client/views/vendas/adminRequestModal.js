/**
 * Created by SERVIDOR on 06/11/2015.
 */

Template.adminRequestModal.events({
    'submit #formAdminRequest': function (event){
        event.preventDefault();

        var password = $('#senha').val();

        Meteor.call('equalsSenha', password,function (error, result) {
            if(result){
                Modal.hide();
                adminCallback();
            }else{
                exibirMessage('atencao','Senha invalida!!!');
            }
        });

        $('#senha').val('');
    },
    'shown.bs.modal  #adminRequestModal': function(){
        $('#senha').focus();
    }
});
