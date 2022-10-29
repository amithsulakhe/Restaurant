const foods = document.querySelector(".foods");
var input = document.querySelector(".form-control");
var search = document.querySelector(".btn");
let heading = document.querySelector("#headline");
var row3 = document.querySelector(".row3");
let scroll = document.querySelector(".scroll_ba");
let searchmargin = document.querySelector(".search_bar");
let price = document.querySelector(".price");
let category = document.querySelector(".category");
let categories = document.querySelector(".categories");
let pri = document.querySelector(".pri");
let add_element = document.querySelector(".add_Element");
document.querySelector(".ctc").innerHTML = `1`;
const bars = document.querySelector("#bars");
const list = document.querySelector(".nav_col2");
bars.addEventListener("click", () => {
  list.classList.toggle("show_list");
});
search.disabled = true;
input.addEventListener("input", (e) => {
  console.log(e.target.value);
  if (e.target.value === "") {
    search.disabled = true;
  } else {
    search.disabled = false;
  }
});
search.addEventListener("click", (e) => {
  let search_name = input.value.charAt(0).toUpperCase() + input.value.slice(1);
  e.preventDefault();
  input.value = "";
  search.disabled = true;
  fetch_url(search_name);
});
async function  scrollcontent() {
  await fetch("https://restrajesh.herokuapp.com/?format=json")
    .then((res) => {
      return res.json();
    })
    .then((contents) => {
      const key = "Category";
      const unique = [...new Map(contents.map((item) => [item[key], item]))];
      render_list(unique);
    });

}
scrollcontent();
function render_list(name) {
  name.map((ele) => {
    scroll.innerHTML += `<div class="s" onclick="myFunction(this)"><h2>${ele[0]}</h2></div>`;
    categories.innerHTML += `<li onclick="myFunction(this)">${ele[0]}</li>`;
  });
}
function myFunction(ele) {
  fetch_url(ele.innerText);
}
function fetch_url(search_name) {
  let datafetch = fetch(`https://restrajesh.herokuapp.com/?format=json`);
  datafetch
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      var data1 = data;
      if (data1 == null) {
        heading.innerHTML = `Sorry No data found`;
        foods.innerHTML = "";
      } else {
        row3.style.backgroundColor = "rgb(241 245 249)";
        heading.innerHTML = `<h2 id="headline">Most <span class="text-red-500">Popular</span> ${search_name}</h2>`;
        // datas(data1);
        let arr = [];
        data1.map((ele) => {
          if (
            ele.firstname.startsWith(`${search_name}`) ||
            ele.Category.startsWith(`${search_name}`)
          ) {
            arr.push(ele);
          }
        });
        datas(arr);
      }
    });
}
function datas(data1) {
  let card = "";
  data1.map((element) => {
    const { ItemImg, firstname, Category, Rating, Itemprice, id } = element;
    card += ` <div class="food" onclick="order_food(this)">
         <img onclick="order(this)" class="${id}" src=${ItemImg} alt="" />
         <div class="firstrat" style="display:flex; width: 100%; justify-content: space-between;">
         <h1 id="${firstname}">${firstname}</h1>
         <div class="rates">
         <h1>${Rating}</h1><i class="fa-solid fa-star"></i>
         </div>
         </div>
         <div class="catprice">
         <h1>${Category}</h1>
         <h1>₹${Itemprice} for one</h1>
         </div>

       </div>`;
  });
  foods.innerHTML = card;
}
let initialprice, exactprice, count;
function order_food(element) {
  let num = (element.children[2].children[1].innerText).slice(1,4);
  add_element.classList.add("add_Element1");
  document.querySelector(".ele h1").innerHTML = `
  ${element.children[1].children[0].innerText}
  `;
  document.querySelector(".ctc").innerHTML = count;
  document.querySelector(".addbtn").innerHTML = "Add Item ₹" + num;
  runner(num);
}
function runner(price) {
  initialprice = Number(price);
  exactprice = initialprice;
  count = 1;
  document.querySelector(".ctc").innerHTML = count;
}
function cancel() {
  add_element.classList.remove("add_Element1");
}

function increment() {
  count = count + 1;
  console.log(count);
  document.querySelector(".ctc").innerHTML = count;
  exactprice += initialprice;
  document.querySelector(".addbtn").innerHTML =
    "Add Item ₹" + Number(exactprice);
}

function decrement() {
  if (count > 1) {
    count--;
    document.querySelector(".ctc").innerHTML = count;
    exactprice -= initialprice;
    document.querySelector(".addbtn").innerHTML =
      "Add Item ₹" + Number(exactprice);
  }
}
const nav = document.querySelector(".nav_");
window.onscroll = function () {
  myfunction();
};
function myfunction() {
  if (window.pageYOffset > 0) {
    nav.classList.add("sticky");
  } else {
    nav.classList.remove("sticky");
  }
}
price.addEventListener("click", () => {
  document.querySelector(".pri").classList.toggle("pric");
});
category.addEventListener("click", () => {
  document.querySelector(".categories").classList.toggle("catg");
});
categories.addEventListener("click", () => {
  document.querySelector(".categories").classList.remove("catg");
});
pri.addEventListener("click", () => {
  pri.classList.remove("pric");
});
function Between(thisele) {
  fetch(`https://restrajesh.herokuapp.com/?format=json`)
    .then((res) => res.json())
    .then((data) => {
      let arr3 = [];
      data.map((element) => {
        if (
          element.Itemprice > thisele.id &&
          element.Itemprice <= thisele.id + 100
        ) {
          arr3.push(element);
        }
      });
      datas(arr3);
    });
}
function rates(){
  document.querySelector(".rating").classList.toggle("ratted");
}
function Betweens(thisele) {
  fetch(`https://restrajesh.herokuapp.com/?format=json`)
    .then((res) => res.json())
    .then((datass) => {
      let ar = [];
      datass.map((elements) => {
        id=parseFloat(thisele.id)
        if(parseFloat(elements.Rating)>id && parseFloat(elements.Rating)<=id+1){
          ar.push(elements)
        }
      });
      console.log(ar)
      datas(ar);
    }).catch((err)=>{
      document.write("Plz coonect to internet")
    });
}
let rating=document.querySelector(".rating")
rating.addEventListener("click", () => {
  rating.classList.remove("ratted");
});

  

function main_rates(){
  document.querySelector(".rating").classList.toggle("ratted");
}
let main_price=document.querySelector(".main_price")
main_price.addEventListener("click", () => {
  document.querySelector(".pri").classList.toggle("pric");
});