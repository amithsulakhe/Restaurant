dishes = document.querySelector("#dish");
foods = document.querySelector(".foods");
// if(console.log(window.screen.width)){
//     dishes.classList.add("dishess")

// }


const bars = document.querySelector("#bars");
const list = document.querySelector(".nav_col2");
bars.addEventListener("click", () => {
  list.classList.toggle("show_list");
});
const nav = document.querySelector(".nav");
const sticky = nav.scrollTop;
window.onscroll = function () {
  myfunction();
};
function myfunction() {
  if (window.pageYOffset > sticky) {
    nav.classList.add("sticky");
  } else {
    nav.classList.remove("sticky");
  }
}
let data=fetch("https://secret-shore-09422.herokuapp.com/https://restrajesh.herokuapp.com",{
  method: 'GET',
  headers: {
    "Content-type":"application/json; charset=UTF-8",
    "Access-Control-Allow-Origin":"*",},
})
data
  .then((res) => res.json())
  .then((data) => {
    let card = "";
    data.map((ele) => {
      if (ele.Best == true) {
        const { ItemImg, firstname, Category, Rating, Itemprice, id } = ele;
        card += ` <div class="food">
                 <img onclick="order(this)" class="${id}" src=${ItemImg} alt="" />
                 <div class="firstrat" style="display:flex; width: 100%; justify-content: space-between;">
                 <h1>${firstname}</h1>
                 <div class="rates">
                 <h1>${Rating}</h1><i class="fa-solid fa-star"></i>
                 </div>
                 </div>
                 <div class="catprice">
                 <h1>${Category}</h1>
                 <h1>₹${Itemprice} for one</h1>
                 </div>
        
               </div>`;
      }
      foods.innerHTML = card;
    });
  });
