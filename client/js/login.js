$('.message a').click(function(){
   $('form').animate({height: "toggle", opacity: "toggle"}, "slow");
});
$('.login a').click(function(){
  location.href = "home.html";
  //do more stuff to talk to the database.
})
