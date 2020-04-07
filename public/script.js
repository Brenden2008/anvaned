var editor = document.getElementById('md-editor');

function convert() {}
editor.onkeyup = function() {
  var md = this.value;
  console.log(md);
  document.getElementById("md-html").innerHTML = marked(md);
}

// function insertAtCursor(value) {
//  editor.focus();
//  document.execCommand('insertText', false /*no UI*/, value);
// }

function insert(md) {
  
  let charBehind;
  let charAfter;
  
  switch (md) {
    case "h1":
      charBehind = '#'
      charAfter = '';
      break;
    case "h2":
      charBehind = '##'
      charAfter = '';
      break;
    case "h3":
      charBehind = '###'
      charAfter = '';
      break;
    case "h4":
      charBehind = '####'
      charAfter = '';
      break;
    case "h5":
      charBehind = '#####'
      charAfter = '';
      break;
    case "h6":
      charBehind = '######'
      charAfter = ''
      break;
  }
}