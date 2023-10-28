const popup = document.getElementById('popup');
const closeBtn = document.getElementById('close-popup');
const title = document.getElementById('popup-title');

var image_number = 0;
var global_category;

// open JSON file
fetch('folder-json/data-activities.json')
    .then(response => response.json())
    .then(data => {
    createProjects(data);
})
  .catch(error => {
    console.log('Error:', error);
});

function createProjects(all_projects){
  let projects = document.getElementById("project-box-holder");
  projects.innerHTML = "";

  for (let i = 0; i < Object.keys(all_projects).length; i++){
    // loop through activities and and add their popup buttons 
    let projectName = all_projects[i]["name"];
    let projectThumbnail = all_projects[i]["thumbnail"]
    projects.innerHTML += `<button onclick="openPopup(${projectName})" class="project-button"> <div class="project-box" style="background-image: linear-gradient(var(--icon-gradient), var(--icon-gradient)), url('img-all/img-activities/img-${projectName.toLowerCase()}/${projectThumbnail}')"> <h1> ${projectName} </h1> </div> </button>`;
  }
}

function openPopup(category) {
  title.innerHTML = category;

  category = category.toLowerCase();
  global_category = category;
  displayArt(category);

  popup.style.display = 'block';
}

function closePopup() {
  image_number = 0;
  popup.style.display = 'none';
}

closeBtn.addEventListener('click', closePopup);
window.addEventListener('click', (event) => {
  if (event.target == popup) {
    closePopup();
  }
});

document.addEventListener('keydown', event => {
  if (event.key == 'Escape'){
    closePopup();
  }
});

function displayArt(category) {
  // Get the image container element
  const container = document.getElementById("img-container");

  // Create a new XMLHttpRequest object
  const xhr = new XMLHttpRequest();

  // Set the path to the images folder
  const path = "img-all/img-art/img-" + category;

  // Open the request
  xhr.open("GET", path, true);

  // Set the responseType to document so we can parse the response as HTML
  xhr.responseType = "document";

  // Set the onload function
  xhr.onload = function() {
    // Get the HTML document from the response
    const doc = xhr.response;

    // Get all the image elements from the document
    const images = doc.querySelectorAll(".icon-image");
    
    /*
    console.log(images);
    console.log(image_number)
    console.log(images['length'])
    console.log(images[0]['href']);
    */

    if (image_number < 0){
      image_number = images['length'] - 1;
    }

    else if (image_number >= images['length']){
      image_number = 0;
    }

    container.src = images[image_number]['href'];

    // Loop through the images and append them to the container element
    /*
    images.forEach(function(image) {
      container.appendChild(image);
      //container.src = images;
      console.log('changing')
    });*/
  };

  // Send the request
  xhr.send();
}

function cycleImage(addend){
  image_number += addend;
  console.log(global_category)
  displayArt(global_category);
}

/*
var folder = "images/";

$.ajax({
    url : folder,
    success: function (data) {
        $(data).find("a").attr("href", function (i, val) {
            if( val.match(/\.(jpe?g|png|gif)$/) ) { 
                $("body").append( "<img src='"+ folder + val +"'>" );
            } 
        });
    }
});*/

