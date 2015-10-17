Meteor.methods({
	'encrypMessage':function(code){
		var hash = CryptoJS.HmacMD5(code, secretPass).toString(); 
		console.log(hash);
	}
});