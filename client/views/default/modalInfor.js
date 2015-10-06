typeMessages = {'sucesso':'#message-success', 'info':'#message-info', 'aviso':'#message-warning', 'atencao':'#message-danger'};
message='';
function mensagem(typeMessage, mens){	
	message = mens;
	$(typeMessages[typeMessage]).fadeIn('slow');
	$(typeMessages[typeMessage]).fadeOut(5000);
}
Template.modalInfor.helpers({
	'message': function () {	
		return message;
	}
});