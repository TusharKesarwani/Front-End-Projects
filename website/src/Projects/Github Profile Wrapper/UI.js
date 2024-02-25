class UI {
  constructor() {
    this.prof=document.getElementById('profileInfo');
  }
  
   display({
    // Receive object destructuring data as parameter
    profile_pic,
    profile_url,
    name,
    message,
    bio,
}){
    const template=`<div id="cardImage">
    <img class="round" src=${profile_pic} alt="Profile pic not found">
    </div>
    <div class="cardBody">
    <div id="cardDetail">
        <div class="name">
            <h2>${name}</h2>
        </div>
        <div class="bio">
            <h3>Bio: ${bio}.
            </h3>

        </div>
        <button class="btn">
            <a href=${profile_url} class="link" target=”_blank”>Profile url</a>

        </button>


    </div>
</div>`;
console.log(profile_url);
if(message=='Not Found')
{
    
    this.prof.innerHTML="Profile Not Found";
}
else
{
    var v=document.getElementById('profileInfo');
    v.style.visibility = 'visible';
    this.prof.innerHTML=template;
}

}
  
}
