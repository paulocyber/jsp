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
			Meteor.call('editMesa', mesaId);
		}
	}	
});

Template.mapaMesas.events({
	'click .mesa':function(){
		var mesaId = this._id;
		Session.set('selectedMesa',mesaId);		
	}
});