let add_book_btn = document.querySelector("#login form");

add_book_btn.addEventListener("submit", (event) => {
      const all_inputs = document.querySelectorAll("#login input");
      const all_select_tags = document.querySelectorAll("#login select");
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

      PostBookFunc(event, obj);
});

async function PostBookFunc(event, book_details) {
      try {
            let book = await fetch("http://localhost:8080/books", {
                  method: "POST",
                  body: JSON.stringify(book_details),
                  headers: {
                        "Content-Type": "application/json",
                  },
            });
            console.log(book);
            event.stopPropagation();
      } catch (error) {}
}

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
      let mainContainer = document.querySelector("tbody");
      mainContainer.innerHTML = "";

      let new_data = datas.map((items) => {
            return `
		<tr>
		   <td class="image-div"><img src='${items.image_url}' /></td>
		   <td>${items.book_name}</td>
		   <td>${items.author}</td>
		   <td>${items.genre}</td>
		   <td>${items.edition}</td>
		   <td>${items.publisher}</td>
		   <td>${items.cost}</td>
		   <td>${items.borrowed}</td>
		   <td style="cursor:pointer" onClick="EditFunc(['${items.book_name}','${items.image_url}',
		   '${items.author}','${items.genre}','${items.edition}',
		    '${items.cost}',${items.id}])">EDIT</td>
		   <td style="cursor:pointer" onClick="DeleteRequest(${items.id})">DELETE</td>
		</tr>
		`;
      });

      mainContainer.innerHTML = new_data.join(" ");
}

FetchAllData();

var span = document.getElementsByClassName("close")[0];
span.addEventListener("click", function () {
      modal.style.display = "none";
});

var modal = document.getElementById("myModal");
function EditFunc(items) {
      modal.style.display = "block";
      let all_input = document.querySelectorAll(".modal-content input");
      for (let i = 0; i < all_input.length; i++) {
            all_input[i].value = items[i];
      }

      let save_btn = document.querySelector(".modal-content button");
      console.log(save_btn);
      save_btn.addEventListener("click", () => {
            const all_inputs = document.querySelectorAll(
                  ".modal-content input"
            );
            let deatail = {
                  book_name: all_inputs[0].value,
                  image_url: all_inputs[1].value,
                  author: all_inputs[2].value,
                  genre: all_inputs[3].value,
                  edition: all_inputs[4].value,
                  borrowed: false,
                  cost: all_inputs[5].value,
            };
            //   console.log(deatail);
            // console.log(items[6]);
            PatchRequest(deatail, items[6]);
      });
}

async function PatchRequest(details, id) {
      try {
            let updated_data = await fetch(
                  `http://localhost:8080/books/${id}`,
                  {
                        method: "PATCH",
                        headers: {
                              "Content-Type": "application/json",
                        },
                        body: JSON.stringify(details),
                  }
            );

            if (updated_data.ok) {
                  modal.style.display = "none";
            }
      } catch (error) {
            console.log(error);
      }
}

async function DeleteRequest(id) {
      try {
            let updated_data = await fetch(
                  `http://localhost:8080/books/${id}`,
                  {
                        method: "DELETE",
                  }
            );
      } catch (error) {
            console.log(error);
      }
}
