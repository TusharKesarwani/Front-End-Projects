const darkMode = document.querySelector(".dark-mode")
const lightMode = document.querySelector(".light-mode")
const root = document.querySelector(":root");
const searchInput = document.querySelector(".search-input")
const searchBtn = document.querySelector(".search-btn")


const months = ["Jan","Feb","Mar","Apr","May","Jun",
                "Jul","Aug","Sep","Oct","Nov","Dec",];

function showdark(){
  console.log("darkmode")
  root.style.setProperty("--bg-color","#24292f")
  root.style.setProperty("--box-shadow","9px 9px 17px #16191c,-9px -9px 17px #323942")
  root.style.setProperty("--box-bg","#24292f")
  root.style.setProperty("--box-radius","16px")
  root.style.setProperty("--text-color","white")

  root.style.setProperty("--dark-mode","none")
  root.style.setProperty("--light-mode","revert")
}

function showlight(){
  console.log("lightmode")
  root.style.setProperty("--bg-color","#d0d8dc")
  root.style.setProperty("--text-color","black")
  root.style.setProperty("--box-bg","#d0d8dc")
  root.style.setProperty("--box-radius","16px")
  root.style.setProperty("--dark-mode","revert")
  root.style.setProperty("--light-mode","none")
  root.style.setProperty("--box-shadow","9px 9px 17px #7d8284,-9px -9px 17px #ffffff")
}

async function fetchUser(username) {
  try {
    const response = await fetch(`https://api.github.com/users/${username}`);
    const parsedResponse = await response.json();
    console.log(parsedResponse)
    return updateDOM(parsedResponse);
  } catch (err) {
    return console.log(err);
  }
}

function formatDate (data){
  const dataarr = data.split('T')[0].split('-');
  const day = dataarr[2]
  const month = dataarr[1]
  const year = dataarr[0]
  const datemonth = Date(year,month,day).split(" ");
  return `Joined ${day} ${datemonth[1]} ${year}`
}

function updateDOM({message,login,blog,name,avatar_url,bio,company,created_at,followers,following,public_repos,twitter_username,location}){
  if(message !== "Not Found"){
    document.getElementById("user-img").setAttribute("src",`${avatar_url}`);
    document.getElementById("bio").textContent = bio?? "No Bio";
    document.getElementById("joined").textContent = formatDate(created_at);
    document.getElementById("repo").textContent = public_repos?? "0";
    document.getElementById("follower").textContent = followers?? "0";
    document.getElementById("following").textContent = following?? "0";
    document.getElementById("location").textContent = location?? "NO location";
    document.getElementById("website").textContent = blog?? "No blogs";
    document.getElementById("twitter").textContent = twitter_username?? "No twitter";
    document.getElementById("company").textContent = company?? "No company";
    document.getElementById("name").textContent = name?? "0";
    document.getElementById("username").textContent = login;
  }
  else{
    alert("User not found")
  }
}

document.addEventListener("DOMContentLoaded",function(){

  darkMode.addEventListener("click",showdark);
  lightMode.addEventListener("click",showlight);
  searchBtn.addEventListener("click",function(){
    console.log("clickkedksj")
    if(searchInput.value !==""){
      fetchUser(searchInput.value)
    }
  });

})