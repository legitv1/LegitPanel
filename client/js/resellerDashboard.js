const currentUser = JSON.parse(localStorage.getItem("currentUser"));

if(!currentUser || currentUser.role !== "reseller"){

    window.location.href = "../index.html";

}

const resellers = JSON.parse(localStorage.getItem("resellers")) || [];

const reseller = resellers.find(user =>

    user.username === currentUser.username

);

document.getElementById("welcome").innerText =
"Welcome " + reseller.username;

document.getElementById("coins").innerText =
reseller.coins;

function logout(){

    localStorage.removeItem("currentUser");
localStorage.removeItem("rememberMe");

window.location.href = "../index.html";

}