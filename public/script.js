Vue.use(VTooltip);

Vue.component("markdown_el", {
  template:
    '<button :id="element" v-html="element" @click="insert(insertel)" v-tooltip="tooltip"></button>',
  props: ["element", "insertel", "tooltip"],
  methods: {
    insert(md) {
      var charBehind;
      var charAfter;

      switch (md) {
        case "h1":
          charBehind = "#";
          charAfter = " ";
          break;
        case "h2":
          charBehind = "##";
          charAfter = " ";
          break;
        case "h3":
          charBehind = "###";
          charAfter = " ";
          break;
        case "h4":
          charBehind = "####";
          charAfter = " ";
          break;
        case "h5":
          charBehind = "#####";
          charAfter = " ";
          break;
        case "h6":
          charBehind = "######";
          charAfter = " ";
          break;
        case "bold":
          charBehind = "**";
          charAfter = "**";
          break;
        case "italic":
          charBehind = "*";
          charAfter = "*";
          break;
        case "strike":
          charBehind = "~";
          charAfter = "~";
          break;
        case "ul":
          charBehind = "*";
          charAfter = " ";
          break;
        case "ol":
          charBehind = "1.";
          charAfter = " ";
        case "quote":
          charBehind = "> ";
          charAfter = " ";
          break;
        case "inline":
          charBehind = "`";
          charAfter = "`";
          break;
        case "block":
          charBehind = "```\n";
          charAfter = "\n```";
          break;
        case "hr":
          charBehind = "---\n";
          charAfter = "";
          break;
        case "a":
          charBehind = "[";
          charAfter = "]()";
          break;
        default:
          console.error("Unknown markdown character!");
      }

      let editor = document.getElementById("md-editor");

      let start = editor.selectionStart; // editor start
      let end = editor.selectionEnd; // editor end
      editor.value =
        editor.value.substring(0, start) +
        charBehind +
        editor.value.substring(start, end) +
        charAfter +
        editor.value.substring(end, editor.value.length);
      editor.selectionStart = start + charBehind.length;
      editor.selectionEnd = end + charBehind.length;
      editor.focus(); // focus so as to not let the user lose concentration and return the input focus to editor
    }
  }
});

Vue.component("theme", {
  template: `<button id="toggle" @click="darktheme === true ? light() : dark()" v-tooltip="'Toggle dark/light mode'">🌙</button>`,
  data() {
    return {
      darktheme: "false"
    };
  },
  methods: {
    light() {
      document.getElementById("toggle").innerText = "🌙";
      document.body.style.backgroundColor = "var(--background)";
      document.body.style.color = "var(--forground)";
      var x = document.getElementsByTagName("button");
      for (let i = 0; i < x.length; i++) {
        x[i].style.backgroundColor = "var(--background)";
      }
      document.getElementById("md-editor").style.backgroundColor =
        "var(--background)";
      document.getElementById("down-pop").style.backgroundColor =
        "var(--background)";
      document.getElementById("md-editor").style.color = "var(--foreground)";
      document.getElementById("md-html").style.backgroundColor =
        "var(--background)";
      document.getElementById("md-html").style.color = "var(--foreground)";
      document.querySelector("footer").style.backgroundColor =
        "var(--background)";
      document.querySelector("footer").style.color = "var(--foreground)";
      var x = document.getElementsByTagName("a");
      for (let i = 0; i < x.length; i++) {
        x[i].style.color = "var(--foreground)";
      }
      var p = document.querySelectorAll("p");
      for (let i = 0; i < p.length; i++) {
        p[i].style.color = "var(--foreground)";
      }
      this.darktheme = false;
    },
    dark() {
      document.getElementById("toggle").innerText = "🌞";
      document.body.style.backgroundColor = "var(--background-dark)";
      document.body.style.color = "var(--forground-dark)";
      var x = document.getElementsByTagName("button");
      for (let i = 0; i < x.length; i++) {
        x[i].style.backgroundColor = "var(--background-dark)";
      }
      document.getElementById("md-editor").style.backgroundColor =
        "var(--background-dark)";
      document.getElementById("down-pop").style.backgroundColor =
        "var(--background-dark)";
      document.getElementById("md-editor").style.color =
        "var(--foreground-dark)";
      document.getElementById("md-html").style.backgroundColor =
        "var(--background-dark)";
      document.getElementById("md-html").style.color = "var(--foreground-dark)";
      document.querySelector("footer").style.backgroundColor =
        "var(--background-dark)";
      document.querySelector("footer").style.color = "var(--foreground-dark)";
      var x = document.getElementsByTagName("a");
      for (let i = 0; i < x.length; i++) {
        x[i].style.color = "var(--foreground-dark)";
      }
      var p = document.querySelectorAll("p");
      for (let i = 0; i < p.length; i++) {
        p[i].style.color = "white";
      }
      this.darktheme = true;
    }
  }
});

Vue.component("download", {
  template: `<button id="download" @click="visible === false ? show() : hide()" v-tooltip="'Download HTML or Markdown'">💾</button>`,
  data() {
    return {
      visible: false
    };
  },
  methods: {
    show() {
      document.getElementById("down-pop").style.display = "block";
      this.visible = true;
    },
    hide() {
      document.getElementById("down-pop").style.display = "none";
      this.visible = false;
    }
  }
});

let localstorage = '';
if (!localStorage.getItem("markdown")) {
  localstorage = '';
} else {
  localstorage = localStorage.getItem("markdown");
}

Vue.component("mdhtml", {
  template: `<div><textarea id="md-editor" v-model="md" v-on:keyup="convert"></textarea><div id="md-html" v-html="html"></div></div>`,
  data() {
    return {
      md: localstorage || "",
      html: marked(localstorage) || ""
    };
  },
  methods: {
    convert() {
      this.html = marked(this.md);
      localStorage.setItem("markdown", this.md);
    },
  }
})

var app = new Vue({
  el: "#app",
  data() {
    return {
      
    };
  },
  methods: {
    download(filename, text) {
      var element = document.createElement("a");
      element.setAttribute(
        "href",
        "data:text/plain;charset=utf-8," + encodeURIComponent(text)
      );
      element.setAttribute("download", filename);

      element.style.display = "none";
      document.body.appendChild(element);

      element.click();

      document.body.removeChild(element);
    }
  }
});
