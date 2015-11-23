/**
 * Created by SERVIDOR on 20/11/2015.
 */
//teste git altera�oes
Meteor.subscribe('Funcionarios');

//Helpers e Events do template addFuncionario
Template.addObservacoes.onRendered(function(){
    $('#codObs').focus();
});
Template.addObservacoes.helpers({

});

Template.addObservacoes.events({
    'submit form': function (event) {
        event.preventDefault();
        var observacao = new Observacao();

        observacao.codObs = $('#codObs').val();
        observacao.nomObs = $('#nomObs').val();

        Meteor.call('addObservacao', observacao, function(error, result){
            if(result){
                mensagem(result);
            }
        });
        $('#codObs').focus();
    }
});

