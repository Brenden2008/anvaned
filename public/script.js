document.getElementById('md-editor').onkeyup = function() {
  var md = this.value;
  console.log(md);
  document.getElementById("md-html").innerHTML = marked(md);
}