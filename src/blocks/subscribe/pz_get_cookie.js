function pz_get_cookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function pz_vanishing_act() {
  if (pz_get_cookie("pz_num") > 0) {
    let node = document.getElementById("pzs");
    node.innerHTML = '<div style="display: none"></div>';
  }
}
