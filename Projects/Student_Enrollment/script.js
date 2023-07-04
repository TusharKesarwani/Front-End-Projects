window.addEventListener('DOMContentLoaded', () => {
    const submitBtn = document.getElementById('btn-1');
    const form = document.getElementById('registrationForm');
    const output = document.getElementById('displayData');
  
    submitBtn.addEventListener('click', (event) => {
      event.preventDefault();
  
      
      const name = document.getElementById('fname').value;
      const email = document.getElementById('email').value;
      const website = document.getElementById('website').value;
      const imageLink = document.getElementById('image').value;
  
     
      const directLink = extractDirectLink(imageLink);
  
      
      const image = new Image();
      image.src = directLink;
  
      const genderOptions = document.getElementsByName('gender');
      let gender = '';
      for (let i = 0; i < genderOptions.length; i++) {
        if (genderOptions[i].checked) {
          gender = genderOptions[i].value;
          break;
        }
      }
  
      const skills = [];
      const skillCheckboxes = document.querySelectorAll('input[type="checkbox"]:checked');
      skillCheckboxes.forEach((checkbox) => {
        skills.push(checkbox.name);
      });
  
      // Display submitted data
      const newCard = document.createElement('div');
      newCard.classList.add('addData');
      newCard.innerHTML = `
        <img src="${image.src}" alt="Student Image" width="150" height="150">
        <div class="NameContainer">${name}</div>
        <a href="mailto:${email}">${email}</a><br>
        <a href="${website}">${website}</a>
        <div class="SkillContainer">${skills.join(', ')}</div>
      `;
      output.appendChild(newCard);
  
      
      form.reset();
    });
  });
  
  // Function to extract direct link from Google Drive URL
  function extractDirectLink(url) {
    const regex = /https:\/\/drive\.google\.com\/file\/d\/([^/]+)\//;
    const fileId = url.match(regex)[1];
    return `https://drive.google.com/uc?export=view&id=${fileId}`;
  }
  