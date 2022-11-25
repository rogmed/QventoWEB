var request = new XMLHttpRequest();

var url = 'https://qvento.azurewebsites.net/api/qventos/'
var qventoId = '100';

request.open('GET', url + qventoId);

request.onload = function() {
	var response = request.response;
	var qvento = JSON.parse(response);

	var attributes = [];
	attributes.push(qvento.qventoId);
	attributes.push(qvento.title);
	attributes.push(qvento.description);

	const newDiv = document.createElement('div');

	//Show qvento on page
	attributes.forEach(function (attribtue, index, array) {
		const newContent = document.createTextNode(attribtue + " - ");
		newDiv.appendChild(newContent);

		const currentDiv = document.getElementById("div1");
		document.body.insertBefore(newDiv, currentDiv.nextSibling);
    })
	
};

request.send();
