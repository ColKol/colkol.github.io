// open JSON file
fetch('data-all/data-activities.json')
  .then(response => response.json())
  .then(data => {createProjects(data)})
  .catch(error => {console.log('Error:', error);});

// setup each project's buttons
function createProjects(allProjects){
  let projects = document.getElementById("project-box-holder");
  projects.innerHTML = "";

  // loop through activities and and add their popup buttons 
  for (let i = Object.keys(allProjects).length - 1; i >= 0; i--){
  let projectName = allProjects[i]["name"];
  let projectThumbnail = allProjects[i]["thumbnail"]
  projects.innerHTML += `<button onclick="openPopup('${i}')" class="project-button"> <div class="project-box" style="background-image: linear-gradient(var(--icon-gradient), var(--icon-gradient)), url('img-all/img-activities/img-${projectName.toLowerCase()}/${projectThumbnail}')"><h1> ${projectName} </h1></div></button>`;
  }
}