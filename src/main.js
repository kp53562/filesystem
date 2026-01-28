// ideas: store filesystem information in a downloadable file, like a virtual drive. make files creatable and editable, maybe even uploadable. 
var filenumber = 0
function open(){
  var file = document.createElement("button");
  file.innerText = "file"+String(filenumber);
  filenumber++;
  file.setAttribute("onclick","open()");
}

const rootdir = document.createElement("button");
rootdir.innerText = ":::filesystem:::"
rootdir.setAttribute("onclick","open()");
