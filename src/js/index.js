//const url = "https://qvento.azurewebsites.net/"

//const form = document.getElementById('login');

//form.addEventListener('submit', callbackFunction);

//function callbackFunction(event) {
//    event.preventDefault();
//    const myFormData = new FormData(event.target);
//    console.log(myFormData);

//    const credentialsDto = {};
//    myFormData.forEach((value, key) => (credentialsDto[key] = value));
//    console.log(credentialsDto);

//    getOk();

//    getResponse(credentialsDto);
//}

//function getResponse(dto) {
//    var request = new XMLHttpRequest();

//    request.open('POST', url + 'api/user/login');
//    request.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')

//    var response = request.response;
//    console.log("- LOGIN RESPONSE\n" + response);

//    request.send(JSON.stringify(dto))
//}

//function getOk() {
//    var okRequest = new XMLHttpRequest();
//    okRequest.addEventListener("load", callbackFunction);
//    okRequest.open('GET', url + 'api/test');
//    okRequest.send()

//    var response = okRequest.response;
//    console.log("- OK RESPONSE\n" + response);
//}

const request = new XMLHttpRequest();
request.open('POST', 'https://qvento.azurewebsites.net/api/user/login');
const form = document.getElementById('login')
form.addEventListener('submit', callbackFunction);

function callbackFunction(event) {
	event.preventDefault();

	request.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')
	request.send(JSON.stringify(formJson(event)));
	console.log(request)

	while (true) {
		if (request.readyState == 1) {
			console.log("Status: " + request.status);
			console.log("Response: " + request.response);
			console.log("ResponseText: " + request.responseText);
			break;
		}
	}

};

function formJson(event) {
	const credentialsDto = {};
	const myFormData = new FormData(event.target);
	console.log(myFormData);
	myFormData.forEach((value, key) => (credentialsDto[key] = value));

	return credentialsDto;
}
