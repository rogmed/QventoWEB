var request = new XMLHttpRequest();

var url = 'https://localhost:44371/qvento/'
var qventoId = '1';

request.open('GET', url + qventoId);

request.onload = function() {
	var response = request.response;
	var qvento = JSON.parse(response);

	var qventoId = qvento.qventoId;
	var title = qvento.title;
	var description = qvento.description;

	console.log("Id: " + qventoId)
	console.log("Title: " + title)
	console.log("Description: " + description)

	//Show qvento on page
	const newDiv = document.createElement('div');
	const newContent = document.createTextNode(title);
	newDiv.appendChild(newContent);

	const currentDiv = document.getElementById("div1");
	document.body.insertBefore(newDiv, currentDiv);
};

request.send();
