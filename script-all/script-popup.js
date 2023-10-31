const popup = document.getElementById('popup');
const closeBtn = document.getElementById('close-popup');
const popupTitle = document.getElementById('popup-title');

let pageName = document.getElementById('page-name').innerHTML;
pageName = pageName.toLowerCase().trim();

let allProjects;

// open JSON file
fetch(`data-all/data-${pageName}.json`)
  .then(response => response.json())
  .then(data => {
    allProjects = data;
  })
  .catch(error => {console.log('Error:', error);});

// add popup.css stylesheet to page
let head = document.head;
let link = document.createElement("link");

link.type = "text/css";
link.rel = "stylesheet";
link.href = "style-all/style-popup.css";

head.appendChild(link);

function openPopup(categoryID) {
  popupTitle.innerHTML = allProjects[categoryID]["name"];

  popup.style.display = 'block';

  console.log(allProjects);
}
  
function closePopup() {
  popup.style.display = 'none';
}

// close popup using x button, clicking, and esc key
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
  
function activitiesPopup(category){
  console.log(category);

}



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
  
  