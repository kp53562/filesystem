// ideas: store filesystem information in a downloadable file, like a virtual drive. make files creatable and editable, maybe even uploadable. 
var filenumber = 0
function open(){
  var file = document.createElement("button");
  file.innerText = "file"+String(filenumber);
  filenumber+=1;
  file.setAttribute("onclick","open()");
  document.body.appendChild(file);
}

const rootdir = document.createElement("button");
rootdir.innerText = ":::filesystem:::"
rootdir.setAttribute("onclick","open()");
document.body.appendChild(rootdir);
