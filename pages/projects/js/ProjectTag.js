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
        case "ludum dare":
            return "#EE5533";
        case "java":
            return "#E42D2E";
      }
    }
  },
  template:
  `
  <div class="col-2 text-center">
    <p class="rounded p-1 text-light" :style="'background-color: ' + color">{{name}}</p>
  </div>
  `
}