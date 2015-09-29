var estadoLivre= "btn-success";
var estadoOcupado = "btn-primary";
var estadoBoqueado = "btn-danger";


Meteor.subscribe('MapaMesas');

//Helpers e Events do template mapaMesas
Template.mapaMesas.helpers({
	'geraMapaMesas': function (){
		return MapaMesas.find();
	},
	'selectedEstado':function(){
		var mesaId = this._id;
		var selectedMesa = Session.get('selectedMesa');
		if(mesaId==selectedMesa){
			if(this.estado==estadoLivre){
				Meteor.call('editarEstadoMesa', mesaId,estadoOcupado);
			}
		}
	}	
});

Template.mapaMesas.events({
	'click .mesa':function(){
		var mesaId = this._id;
		Session.set('selectedMesa',mesaId);		
		if(this.estado==estadoLivre){
			console.log("Insera seus dados");
		}
		if(this.estado==estadoOcupado){
			console.log("Insera seus dados vendas");
		}
	}
});