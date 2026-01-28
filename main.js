// ideas: store filesystem information in a downloadable file, like a virtual drive. make files creatable and editable, maybe even uploadable. 
var filenumber = 0;
function opendir(){
  document.body.appendChild(document.createElement("br"));
  var file = document.createElement("button");
  file.innerText = "file"+String(filenumber);
  filenumber+=1;
  file.setAttribute("onclick","opendir()");
  document.body.appendChild(file);
}

const rootdir = document.createElement("button");
rootdir.innerText = ":::filesystem:::"
rootdir.setAttribute("onclick","opendir()");
document.body.appendChild(rootdir);
