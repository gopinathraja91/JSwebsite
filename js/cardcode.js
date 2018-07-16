
/* Popular list */
var card="";
for(i=0;i<5;i++){
 card +="<div class='card col-12 col-md-2 ml-2'><div class='imgcls text-center'><img class='card-img-top' src='./assets/movieone.jpg' alt='Card image cap'></div><div class=card-body>  <p class='card-text'>Lorem ipsum dolor sit amet, consectetur</p></div></div>";
}


document.getElementsByClassName("cardcust")[0].innerHTML += card;


/* Collection list */
var collection="";
for(i=0;i<4;i++){
    collection +="<div class='card col-12 col-md-2 ml-2'><div class='imgcls text-center'><img class='card-img-top' src='./assets/movieone.jpg' alt='Card image cap'></div><div class='card-body'>  <p class='card-text'>Lorem ipsum dolor sit amet, consectetur</p></div></div>";
}
collection +="<div class='col-md-12'><button class='float-right'>Show More</button></div>"

document.getElementsByClassName("collection")[0].innerHTML += collection;






