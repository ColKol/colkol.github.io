const popup = document.getElementById('popup');
const closeBtn = document.getElementById('close-popup');
const popupTitle = document.getElementById('popup-title');

let pageName = document.getElementById('page-name').innerHTML;
pageName = pageName.toLowerCase().trim();

let allProjects;

let cycleImages;
let num = 0;

getImage("chariz", function(allImages){
  cycleImages = allImages;
})

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
  // setup popup based on page
  switch(pageName){
    case "activities":
      activitiesPopup(categoryID)
      break;
    default:
      console.log("no page found")
  }

  // make popup visible
  popup.style.display = 'block';
}

// close popup by x button
function closePopup() {
  popup.style.display = 'none';
}

// close popup by clicking web page
closeBtn.addEventListener('click', closePopup);
window.addEventListener('click', (event) => {
  if (event.target == popup) {
    closePopup();
  }
});

// close popup by esc key
document.addEventListener('keydown', event => {
  if (event.key == 'Escape'){
    closePopup();
  }
});

function activitiesPopup(categoryID){
  // update name and description
  let projectName = allProjects[categoryID]["name"];
  popupTitle.innerHTML = projectName;

  let popupText = document.getElementById('popup-text');
  popupText.innerHTML = allProjects[categoryID]["description"];

  getImage(projectName.toLowerCase(), function(allImages){
    // update the image to the first new image
    popupImage = document.getElementById('popup-image');
    popupImage.style.backgroundImage = `url("${allImages[0]["href"]}")`;

    // update and reset values
    cycleImages = allImages;
    num = 0
  })
}

function getImage(projectName, callback) {
  // Create and open XMLHttpRequest object to path
  const xhr = new XMLHttpRequest();
  const path = `img-all/img-${pageName}/img-${projectName}`;
  xhr.open("GET", path, true);
  xhr.responseType = "document";

  xhr.onload = function() {
      // Get the HTML document from the response and get images from document
      const doc = xhr.response;
      const images = doc.querySelectorAll(".icon-image");

      if(callback) callback(images);
  };
  xhr.send();
}

// cycles through images
function start() {
  var popupImage = document.getElementById('popup-image');       
  var delay = 2;                           

  var changeImage = function() {
      var len = cycleImages.length;
      
      let path = cycleImages[num++]["href"];
      popupImage.style.backgroundImage = `url("${path}")`;

      if (num == len) {
          num = 0;
      }
  };
  setInterval(changeImage, delay * 1000);
};
window.onload=function(){
start();
}