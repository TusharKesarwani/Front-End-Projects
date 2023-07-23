const ui = new UI();

const user = document.getElementById("search-input");
document.getElementById("search-btn").addEventListener("click", async () => {
  const userName = user.value;
  if (userName !== "") {
    const res = await fetch(`https://api.github.com/users/${userName}`);
    const data = await res.json();
    console.log(data);
    getProfileDetails(data);
  } 
  else {
      alert("Input is empty! Please enter a github username");
    }
  }
);

function getProfileDetails(profileData) {
  var profileDetails = {
    mainData: profileData,
    profile_pic: profileData.avatar_url,
    user_name: profileData.login,
    name: profileData.name,
    profile_url: profileData.html_url,
    message:profileData.message,
    bio:profileData.bio,
  };
  ui.display(profileDetails);
}
