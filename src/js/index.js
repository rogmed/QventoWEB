const request = new XMLHttpRequest();
const form = document.getElementById('login')
form.addEventListener('submit', callbackFunction);

function callbackFunction(e) {
	event.preventDefault();

	request.open('POST', 'https://qvento.azurewebsites.net/api/user/login');
	request.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')
	request.send(JSON.stringify(formJson(e)));
	console.log(request)

	request.onreadystatechange = function() {
		if (request.readyState == 4) {
			window.location.href = request.response;
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
