Meteor.methods({
	'print':function(data){
		var result = HTTP.call("POST", "http://localhost:8000", 
			{ 
				data:data,
				headers:{"content-type":"application/json"}
		});
	}

});
