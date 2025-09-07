export default {
    props: {
        name: String,
    },
  computed: {
    color: function()
    {
      switch(this.name)
      {
        case "javascript":
          return "#DAC63C";
        case "jquery":
            return "#0F64A9";
        case "vue":
            return "#42B883";
        case "godot":
            return "#478CBF";
        case "haxe":
            return "#F68712";
        case "game jam":
            return "#EE5533";
        case "java":
            return "#E42D2E";
        case "python":
            return "#ffe263";
        case "sql":
            return "#dd33dd";
        case "c++":
            return "#004283";
        case "mod":
            return "#00FF00";
        case "c#":
            return "#9179E4"
        default:
          return "#000000";
      }
    }
  },
  template:
  `
  <div class="col-6 col-sm-4 col-lg-2 text-center">
    <p class="rounded p-1 text-light" :style="'background-color: ' + color">{{name}}</p>
  </div>
  `
}
