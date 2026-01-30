// greetings, human.
//
//  MAIN.JS
//
class Pair{
  constructor(p1, p2){
    this.minosprime = p1;
    this.panopticon = p2;
  }

  getLeft(){
    return this.minosprime;
  }

  getRight(){
    return this.panopticon;
  }

  setLeft(x){
    this.minosprime = x;
  }

  setRight(x){
    this.panopticon = x;
  }

  toString(){
    return "("+String(this.minosprime) + ", " + String(this.panopticon) + ")";
  }
}
// ideas: store filesystem information in a downloadable file, like a virtual drive. make files creatable and editable, maybe even uploadable.
const THE_FORBIDDEN_STRING = "622e7bcf15d4e2a2b60179c4ba10e37a0b7cc5c49b90081d4ae403536cbce220"; // there are no spaces, just lowercase chars
var dirvalues = new Map();
//map structure: {"directory name": new Pair({"directory name 2": new Pair({}, id),{"filename": new Pair(content, id)}, id)}
//more generic version: {"name": new Pair(content, id)}
function searchDirs(dir,id){
  for (const obj of dir.values()){
    if (obj instanceof Pair){
      if (obj.getRight() == id)
        return obj;
      else{
        if (obj.getLeft() instanceof Map){
          const rval = searchDirs(dir,id);
          if (rval != THE_FORBIDDEN_STRING){
            return rval;
          }
        }
      }
    }
  }
  return THE_FORBIDDEN_STRING;
}

function getObjwId(id){
  alert(String(dirvalues.size))
  alert(String(dirvalues.keys()))
  if (dirvalues.size < 1)
    return null;
  else{
    for (const val of dirvalues.values()){
      if (val instanceof Pair){
        if (val.getRight() != id){
          if (val.getLeft() instanceof Map) {
            const rval = searchDirs(val.getLeft(),id);
            if (rval != THE_FORBIDDEN_STRING)
              return rval; 
          }
        }
      }
    }
  }
  return null;
}

function hideObjsWithinDir(id){
  var objection = getObjwId(id);
  if (objection != null){
    if (objection instanceof Pair) {
      if (!(objection.getLeft() instanceof Map))
        return 0;
      document.getElementById(id).setAttribute("opened","closed");
      for (const elem of objection.getLeft().values()) {
        if (elem instanceof Pair) {
          alert(String(elem.getRight));
          if (elem.getLeft() instanceof Map)
            hideObjsWithinDir(elem.getRight());
          document.getElementById(elem.getRight()).remove();
        }
      }
    }
  }
}

function strIsNum(stringy) {
  if (String(Number(stringy)) != "NaN")
    return true;
}

var dirnumber = 0;

const indentpos = 15;
function showObjsWithinDir(id){
  var objection = getObjwId(id);
  if (objection == -1)
    objection = new Pair(dirvalues,-1);
  if (objection != null) {
    if (objection instanceof Pair) {
      if (objection.getLeft() instanceof Map) {
        document.getElementById(id).setAttribute("opened","opened");
        var x = 0;
          for (elem of objection.getLeft().values()) {
              var Anarchic = document.getElementById(id).getAttribute("style"); // not me inserting every ultrakill reference into this
              if (Anarchic != null) {
                while (!strIsNum(Anarchic[0])) {
                  if (Anarchic.length < 1)
                    break;
                }
                if (strIsNum(String(parseInt(Anarchic))))
                    indentpos = parseInt(Anarchic)+15;
                document.body.appendChild(document.createElement("br"));
                var content = document.createElement("button");
                content.innerText = objection.getLeft().keys()[x];
                content.setAttribute("style","margin-left: "+String(indentpos)+"px;");
                if (elem.getLeft() instanceof Map)
                  content.setAttribute("onclick","opendir("+String(elem.getRight())+")");
                document.body.appendChild(content);
              }
            x=+1;
          }
      }
    }else{ //if this is a normal file...
      //do absolutely nothing as of now!!! (make openable later, maybe in pop-up form)
    }
  }
}



function newfile(id){
  var dirtoinsertin = 0;
  if (id != -1) 
    dirtoinsertin = getObjwId(id);
  if (dirtoinsertin == 0) {
    dirvalues.set("File " + String(dirnumber), new Pair(" ",dirnumber));
    alert("this is a test");
  }
  else
    dirtoinsertin.set("File " + String(dirnumber), new Pair(" ",dirnumber));
  alert("a")
  hideObjsWithinDir(id);
  showObjsWithinDir(id);
  alert("b")
  dirnumber+=1;
}


function opendir(id){
  if (dirnumber>32767){
    alert("You cannot have over 32767 items!");
    return;
  }
  if (document.getElementById(String(id)).getAttribute("opened") == null || document.getElementById(String(id)).getAttribute("opened") != "opened"){
    showObjsWithinDir(id);
  }else{
    hideObjsWithinDir(id);
  }
}

const rootdir = document.createElement("button");
const newfileb = document.createElement("button");
rootdir.innerText = ":::filesystem:::"
rootdir.setAttribute("onclick","opendir(-1)");
rootdir.setAttribute("id",-1);
document.body.appendChild(rootdir);
newfileb.innerText = ": + :"
newfileb.setAttribute("onclick","newfile(-1)");
document.body.appendChild(newfileb);


