const currentUser = JSON.parse(localStorage.getItem("currentUser"));

if(!currentUser){

    window.location.href = "../index.html";

}

if(currentUser.role !== "admin"){

    window.location.href = "resellerDashboard.html";

}

const panelName = document.getElementById("panelName");
const keyBrand = document.getElementById("keyBrand");

const saveBtn = document.getElementById("saveBtn");
const logoutBtn = document.getElementById("logoutBtn");
const successMsg = document.getElementById("successMsg");

// Load settings
let settings = JSON.parse(localStorage.getItem("settings")) || {

    panelName: "Legit Premium Panel",

    keyBrand: "LEGITPANEL"

};

// Show saved values
panelName.value = settings.panelName;
keyBrand.value = settings.keyBrand;

// Save Settings
saveBtn.onclick = function(){

    settings = {

        panelName: panelName.value.trim(),

        keyBrand: keyBrand.value.trim().toUpperCase()

    };

    localStorage.setItem("settings", JSON.stringify(settings));

    successMsg.style.display = "block";

    setTimeout(function(){

        successMsg.style.display = "none";

    },2000);

};

// Logout
logoutBtn.onclick = function(){
  localStorage.removeItem("currentUser");
localStorage.removeItem("rememberMe");

window.location.href="../index.html";

};