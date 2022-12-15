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
			  <button>Borrow</button>
		 </div>
	  </div>
	  `;
	});

	mainContainer.innerHTML = new_data.join(" ");
}

FetchAllData();