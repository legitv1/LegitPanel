const currentUser = JSON.parse(localStorage.getItem("currentUser"));

const homeBtn = document.getElementById("homeBtn");
const resellerBtn = document.getElementById("resellerBtn");
const settingsBtn = document.getElementById("settingsBtn");

if(homeBtn){

    homeBtn.onclick = function(){

        if(currentUser && currentUser.role === "reseller"){

            window.location.href = "resellerDashboard.html";

        }else{

            window.location.href = "dashboard.html";

        }

    };

}

if(resellerBtn){

    resellerBtn.onclick = function(){

        if(currentUser && currentUser.role === "admin"){

            window.location.href = "resellers.html";

        }else{

            window.location.href = "history.html";

        }

    };

}

if(settingsBtn){

    settingsBtn.onclick = function(){

        if(currentUser && currentUser.role === "admin"){

            window.location.href = "settings.html";

        }else{

            localStorage.removeItem("currentUser");
localStorage.removeItem("rememberMe");

window.location.href = "../index.html";

        }

    };

}