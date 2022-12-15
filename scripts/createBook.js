let add_book_btn = document.querySelector("#login form");

add_book_btn.addEventListener("submit", (event) => {
	const all_inputs = document.querySelectorAll("#login input")
	const all_select_tags = document.querySelectorAll("#login select")
      event.preventDefault();
      let obj = {
            image_url: all_inputs[0].value,
            book_name: all_inputs[1].value,
            author: all_inputs[2].value,
            genre: all_select_tags[0].value,
            edition: all_select_tags[1].value,
            publisher: all_inputs[3].value,
            cost: all_inputs[4].value,
            borrowed: false,
      };

	  PostBookFunc(obj);
});

async function PostBookFunc(book_details) {
	try {
		let book = await fetch("http://localhost:8080/books",{
			method: "POST",
			body  :JSON.stringify(book_details),
			headers : {
				"Content-Type" : "application/json"
			}
		});
		console.log(book);

	} catch (error) {
		
	}
}
