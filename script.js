const foods=document.querySelector(".foods");
var input=document.querySelector(".form-control");
var search=document.querySelector(".btn");
search.addEventListener("click",()=>{
    let search_name=input.value.charAt(0).toUpperCase() + input.value.slice(1);
    fetch_url(search_name)
})

function fetch_url(search_name){
    let datafetch=fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search_name}`);
    datafetch.then((response)=>{
       return response.json()
    }).then((data)=>{
        var data1=data.meals;
        datas(data1);
    
    
    })
}
function datas(data1){
    data1.map((element)=>{
        const {strMealThumb,strMeal,idMeal}=element
        foods.innerHTML+=` <div class="food">
         <img class="${idMeal}" src=${strMealThumb} alt="" />
         <h1>${strMeal}</h1>
         <img 
           style="width: 30%"
           src="https://cdn.searchenginejournal.com/wp-content/uploads/2021/08/a-guide-to-star-ratings-on-google-and-how-they-work-6123be39b9f2d-sej.jpg"
           alt=""
         />
         <button class="orderbtn text-red-500">Order Now</button>
       </div>`
    })
}