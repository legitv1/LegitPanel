const currentUser = JSON.parse(localStorage.getItem("currentUser"));
const rememberMe = localStorage.getItem("rememberMe");

if(currentUser && rememberMe === "true"){

    if(currentUser.role === "admin"){

        window.location.href = "pages/dashboard.html";

    }else{

        window.location.href = "pages/resellerDashboard.html";

    }

}

const button = document.querySelector("button");
const loginMsg = document.getElementById("loginMsg");

button.onclick = async function(){

    const username = document.querySelectorAll("input")[0].value.trim();
    const password = document.querySelectorAll("input")[1].value.trim();

    loginMsg.style.display = "none";

    if(username === "" || password === ""){

        showMessage("⚠️ Please enter username and password.", "#D97706");
        return;

    }

    try{

        const response = await fetch("http://127.0.0.1:3000/api/login",{

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify({

                username,
                password

            })

        });

        const data = await response.json();

        if(data.success){

            localStorage.setItem("currentUser",JSON.stringify({

                role:data.role,
                username:username

            }));

            localStorage.setItem("rememberMe","true");

            if(data.role === "admin"){

                window.location.href = "pages/dashboard.html";

            }else{

                window.location.href = "pages/resellerDashboard.html";

            }

            return;

        }

    }catch(e){

        console.log(e);

    }

    // Temporary local reseller login
    let resellers = JSON.parse(localStorage.getItem("resellers")) || [];

    const reseller = resellers.find(user=>

        user.username === username &&
        user.password === password

    );

    if(reseller){

        localStorage.setItem("currentUser",JSON.stringify({

            role:"reseller",
            username:reseller.username,
            id:reseller.id

        }));

        localStorage.setItem("rememberMe","true");

        window.location.href="pages/resellerDashboard.html";

    }else{

        showMessage("❌ Invalid Username or Password!", "#991B1B");

    }

};

function showMessage(text,color){

    loginMsg.innerHTML = text;

    loginMsg.style.background = color;

    loginMsg.style.display = "block";

    setTimeout(function(){

        loginMsg.style.display = "none";

    },2000);

}