let login_btn = document.querySelector("#login form");

// adding eventListner to my login button.
login_btn.addEventListener("submit",LoginFunc);

async function LoginFunc(event){
	try {
		event.preventDefault();
		let detail_obj = {
			email : document.getElementById("username").value,
			password : document.getElementById("password").value
		};

		let login_request = await fetch("https://reqres.in/api/login",{
			method : "POST",
			headers : {
				"Content-Type" : "application/json"
			},
			body : JSON.stringify(detail_obj)
		})
		
		if(login_request.ok){
			let data = await login_request.json();
			alert(data.token);
			window.location.href = "admindashboard.html";

		}
		
	} catch (error) {
		console.log(error.message);
		alert("Wrong Credentials.");
	}
}