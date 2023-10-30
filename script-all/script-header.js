document.addEventListener("DOMContentLoaded", function() {
  // Load the header HTML file
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "/header.html", true);
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      // Insert the header HTML into the page
      const header = xhr.responseText;
      const headerElement = document.createElement("div");
      headerElement.innerHTML = header;
      document.body.insertBefore(headerElement, document.body.firstChild);
    }
  };
  xhr.send();
});