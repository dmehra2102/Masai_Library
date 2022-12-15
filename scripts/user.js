const genre = document.querySelector(".genre_filter");
genre.addEventListener("change", async (event)=>{
	let val = event.target.value;
	if(val===""){
		FetchAllData();
	}else{
		let data = await fetch(`http://localhost:8080/books?genre=${val}`);
		let new_data = await data.json();
		ShowData(new_data);
	}
})


const cost = document.querySelector(".cost_filter");
cost.addEventListener("change", async (event)=>{
	let val = event.target.value;
	if(val!==""){
		let data = await fetch(`http://localhost:8080/books?_sort=cost&_order=${val}`);
		let new_data = await data.json();
		ShowData(new_data);
	}else{
		FetchAllData();
	}
})

async function FetchAllData() {
	try {
		  let data = await fetch("http://localhost:8080/books");
		  let all_data = await data.json();
		  ShowData(all_data);
	} catch (error) {
		  console.error(error);
	}
}

function ShowData(datas) {
	let mainContainer = document.querySelector(".container");
	mainContainer.innerHTML = "";

	let new_data = datas.map((items) => {
		  return `
	  <div class="cards">
		 <div class="image_div"><img src='${items.image_url}' /></div>
		 <div class="book_info">
		      <h3>${items.book_name}</h3>
		      <p>Author : ${items.author}</p>
		      <p>Genre : ${items.genre}</p>
		      <p>Edition : ${items.edition}</p>
		      <p>Publisher :${items.publisher}</p>
		      <p>Cost :${items.cost}</p>
		      <p>Borrowed :${items.borrowed}</p>
			  <button onClick="HandleBorrow(['${items.book_name}','${items.image_url}',
			  '${items.author}','${items.genre}','${items.edition}','${items.borrowed}',
			   '${items.cost}',${items.id}])">Borrow</button>
		 </div>
	  </div>
	  `;
	});

	mainContainer.innerHTML = new_data.join(" ");
}
var modal = document.getElementById("myModal");

function HandleBorrow(details){
	modal.style.display = "block";
	document.querySelector(".modal-content").innerHTML = "";
	document.querySelector(".modal-content").innerHTML = `
	<div class="cards">
		 <div class="image_div"><img src='${details[1]}' /></div>
		 <div class="book_info">
		      <h3>${details[0]}</h3>
		      <p>Author : ${details[2]}</p>
		      <p>Genre : ${details[3]}</p>
		      <p>Edition : ${details[4]}</p>
		      <p>Cost :${details[6]}</p>
		      <p>Borrowed :${details[5]}</p>
			  <button onClick="Close()">Cancel</button>
			  <button onClick="ConfirmBook(${details[7]})">Confirm</button>
		 </div>
	  </div>
	`;
}

function Close(){
	modal.style.display = "none";
}


async function ConfirmBook(id){
	try {
		let updated_data = await fetch(
			`http://localhost:8080/books/${id}`,
			{
				  method: "PATCH",
				  headers: {
						"Content-Type": "application/json",
				  },
				  body: JSON.stringify({borrowed : true}),
			}
	  );

	  if (updated_data.ok) {
			modal.style.display = "none";
			FetchAllData();
	  }
	} catch (error) {
		console.log(error);
	}
}

FetchAllData();


const borrowed_books = document.querySelector(".borrowed_books");
borrowed_books.addEventListener("click",()=>{
	window.location.href = "borrow.html";
})


function Logout(){
	window.location.href = "index.html";
}