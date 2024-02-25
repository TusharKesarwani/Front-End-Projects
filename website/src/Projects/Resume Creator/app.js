const form = document.querySelector("form");
form.addEventListener("submit", handleSubmit);
const name = document.getElementById("name");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const github = document.getElementById("github");
const linkedin = document.getElementById("linkedin");
const degree = document.getElementById("degree");
const college = document.getElementById("college");
const Syear = document.getElementById("Syear");
const Pyear = document.getElementById("Pyear");
const cgpa = document.getElementById("cgpa");
const skill = document.getElementById("skill");
const project = document.getElementById("project");
const project_description = document.getElementById("project_description");
const link = document.getElementById("link");
const company = document.getElementById("company");
const designation = document.getElementById("designation");
const duration = document.getElementById("duration");
const company_description = document.getElementById("company_description");

function handleSubmit(e) {
  e.preventDefault();
  const name_resume = document.getElementById("name_resume");
  const email_resume = document.getElementById("email_resume");
  const phone_resume = document.getElementById("phone_resume");
  const github_resume = document.getElementById("github_resume");
  const linkedin_resume = document.getElementById("linkedin_resume");
  const degree_resume = document.getElementById("degree_resume");
  const college_resume = document.getElementById("college_resume");
  const Syear_resume = document.getElementById("Syear_resume");
  const Pyear_resume = document.getElementById("Pyear_resume");
  const cgpa_resume = document.getElementById("cgpa_resume");
  const skill_resume = document.getElementById("skill_resume");
  const project_resume = document.getElementById("project_resume");
  const project_description_resume = document.getElementById(
    "project_description_resume"
  );
  const link_resume = document.getElementById("link_resume");
  const company_resume = document.getElementById("company_resume");
  const designation_resume = document.getElementById("designation_resume");
  const duration_resume = document.getElementById("duration_resume");
  const company_description_resume = document.getElementById(
    "company_description_resume"
  );

  name_resume.innerHTML = name.value;
  email_resume.innerHTML = email.value;
  phone_resume.innerHTML = phone.value;
  github_resume.innerHTML = github.value;
  linkedin_resume.innerHTML = linkedin.value;
  degree_resume.innerHTML = degree.value;
  college_resume.innerHTML = college.value;
  Syear_resume.innerHTML = Syear.value;
  Pyear_resume.innerHTML = Pyear.value;
  cgpa_resume.innerHTML = cgpa.value;
  skill_resume.innerHTML = skill.value;
  project_resume.innerHTML = project.value;
  project_description_resume.innerHTML = project_description.value;
  link_resume.innerHTML = "Link - " + link.value;
  company_resume.innerHTML = company.value;
  designation_resume.innerHTML = designation.value;
  duration_resume.innerHTML = duration.value;
  company_description_resume.innerHTML = company_description.value;
}

const clearResume = () => {
  const name_resume = document.getElementById("name_resume");
  const email_resume = document.getElementById("email_resume");
  const phone_resume = document.getElementById("phone_resume");
  const github_resume = document.getElementById("github_resume");
  const linkedin_resume = document.getElementById("linkedin_resume");
  const degree_resume = document.getElementById("degree_resume");
  const college_resume = document.getElementById("college_resume");
  const Syear_resume = document.getElementById("Syear_resume");
  const Pyear_resume = document.getElementById("Pyear_resume");
  const cgpa_resume = document.getElementById("cgpa_resume");
  const skill_resume = document.getElementById("skill_resume");
  const project_resume = document.getElementById("project_resume");
  const project_description_resume = document.getElementById(
    "project_description_resume"
  );
  const link_resume = document.getElementById("link_resume");
  const company_resume = document.getElementById("company_resume");
  const designation_resume = document.getElementById("designation_resume");
  const duration_resume = document.getElementById("duration_resume");
  const company_description_resume = document.getElementById(
    "company_description_resume"
  );

  name_resume.innerHTML = "";
  email_resume.innerHTML = "";
  phone_resume.innerHTML = "";
  github_resume.innerHTML = "";
  linkedin_resume.innerHTML = "";
  degree_resume.innerHTML = "";
  college_resume.innerHTML = "";
  Syear_resume.innerHTML = "";
  Pyear_resume.innerHTML = "";
  cgpa_resume.innerHTML = "";
  skill_resume.innerHTML = "";
  project_resume.innerHTML = "";
  project_description_resume.innerHTML = "";
  link_resume.innerHTML = "";
  company_resume.innerHTML = "";
  designation_resume.innerHTML = "";
  duration_resume.innerHTML = "";
  company_description_resume.innerHTML = "";
};
function handleLeft() {
  const left = document.querySelector(".left");
  left.style.display = "none";
  const right = document.querySelector(".right");
  right.style.overflowY = "visible";
  right.style.width = "100%";
  const print = document.querySelector(".print");
  print.style.display = "block";
}
function handlePrint() {
  const right = document.querySelector(".right");
  window.print();
  const left = document.querySelector(".left");
  left.style.display = "flex";
  right.style.width = "70%";
  right.style.overflowY = "auto";
  const print = document.querySelector(".print");
  print.style.display = "none";
}
