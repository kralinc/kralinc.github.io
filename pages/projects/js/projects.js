import { createApp, ref, computed } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';
import ProjectCard from './ProjectCard.js';

window.addEventListener("DOMContentLoaded", addEventListeners);


function addEventListeners() {
  document.querySelector(".navbar-toggler").addEventListener("click", toggleNavButton);
}

function toggleNavButton() {
  const content = document.querySelector(".navbar-collapse");
  if (content.classList.contains("show")) {
      content.classList.remove("show");
  }else {
      content.classList.add("show");
  }
}

createApp({
  components: {
    ProjectCard,
  },
  setup() {
    const orderByItems = ref(["Name", "Year"]);

    const selectedOrdering = ref("");

    const searchedText = ref("");

    const sortByName = function(a, b) {
      return (a.name > b.name) - (a.name < b.name);
    }

    const sortByYear = function(a, b) {
      return b.year - a.year;
    }

    const sortMethod = computed(() => {
      return (selectedOrdering.value == "Name") ? sortByName : sortByYear;
    });

    const displayedProjects = computed(() => {
      return projects.value.filter(x => x.name.toLowerCase().includes(searchedText.value.toLowerCase()) || x.desc.toLowerCase().includes(searchedText.value.toLowerCase())).sort(sortMethod.value);
    });

    const projects = ref([
        {
          name: "MyKitchen 'Ceres'",
          link: "https://github.com/kralinc/ceres",
          year: 2023,
          desc: "Software development final project for Missouri State University. I worked on the frontend, which we named 'ceres'. The backend was named 'demeter' and is linked in the readme. This project took about 4 months to complete and featured a much higher degree of polish and collaboration than I have ever done before.",
          tags: ["javascript", "vue"]
        },
        {
          name: "This website!",
          link: "https://github.com/kralinc/kralinc.github.io",
          year: 2023,
          desc: "A work in progress since late 2021. Has gone through many revisions in its content and style.",
          tags: ["javascript", "vue"],
        },
        {
          name: "Markov Chain Generator",
          link: "../../markov/",
          year: 2022,
          desc: "A basic markov chain generator. You put training data in the 'train model' page, and receive output on the 'generate text' page. It can accept any arbitrary file as input, and supports appending new data to your current model.",
          tags: ["javascript", "vue"],
          },
        {
          name: "Soulful Harvest",
          link: "https://cactusdan.itch.io/soulful-harvest",
          year: 2023,
          desc: "Game for Ludum Dare 52. I remember this game well due to significant changes being made to the implementation of game mechanics after I started, which hardly happened with previous projects. A full writeup is available on my blog.",
          tags: ["game jam", "godot"]
        },
        {
          name: "Mudkip Impossible Game",
          link: "https://cactusdan.itch.io/mudkip-impossible-game",
          year: 2022,
          desc: "Game made in about 5 hours for a very small game jam on itch.io. It received first place out of 8 entries.",
          tags: ["godot"],
        },
        {
          name: "Processing 3 Tetris",
          link: "https://github.com/kralinc/processing3-tetris",
          year: 2019,
          desc: "Clone of Tetris made in Java Processing 3. This was far and away the best program I'd made at the time. I still think it holds up pretty well.",
          tags: ["java"]
        },
        {
        name: "Calcium Carnage",
        link: "https://cactusdan.itch.io/calcium-carnage",
        year: 2022,
        desc: "Made for Ludum Dare 50. Also my first game for a game jam.",
        tags: ["haxe", "game jam"],
        },
        {
          name: "HARDCORE!!",
          link: "https://github.com/kralinc/HARDCORE-2/blob/main/README.md",
          year: 2022,
          desc: "A platformer game, sequel to a bad game that I love that I made in 2016 in clickteam fusion.",
          tags: ["godot"],
        },
        {
        name: "Hunger Games Sim",
        link: "../../hungergames-js/",
        year: 2021,
        desc: "A sequel to my hunger games simulator in python. Provides a much better simulation than the previous project. Work stopped due to misgivings about the project structure.",
        tags: ["javascript"],
        },
        {
        name: "Bullet Hell Game",
        link: "../../pages/labs/proj2/index.html",
        year: 2020,
        desc: "Final project for my javascript class in community college. The assignment was 'make a game' and I went pretty hard on it.",
        tags: ["javascript", "jquery"]
        },
        {
          name: "JFX ToDoList 2",
          link: "https://github.com/kralinc/jfx-todolist-2",
          year: 2021,
          desc: "Successor to my previous to-do list application written in Java FX. Contained many improvements over the original. I used this as my main to-do list application for many months after making it.",
          tags: ["java", "sql"]
        },
        {
          name: "CPP Calculator 2",
          link: "https://github.com/kralinc/cpp-calculator-2",
          year: 2019,
          desc: "A calculator in C++ that can evaluate all arithmetic user input, and follows the order of operations.",
          tags: ["c++"]
        },
        {
        name: "PokeSmash",
        link: "../../pokesmash/",
        year: 2022,
        desc: "First project in Vue. Worked harder on polish and usability with this than my previous projects, which led to features such as link sharing and local storage saving.",
        tags: ["javascript", "vue"]
        },
        {
        name: "Garfielf Blackjack (itch.io)",
        link: "https://cactusdan.itch.io/garfielf-blackjack",
        year: 2020,
        desc: "First game published on itch.io. It was my largest development project at the time, with a lot of it going into the moddability and the fact that I had to write the UI myself.",
        tags: ["java"]
        },
        {
        name: "Base to Base Converter",
        link: "../../pages/anybase/anybase.html",
        year: 2021,
        desc: "This project is a simple tool to convert numbers from one base to any other base from 2-36. It supports decimals as well.",
        tags: ["javascript"]
        },
        {
        name: "CMWEB 200 Personal Site",
        link: "../../cmweb200.html",
        year: 2020,
        desc: "The personal site I created for my javascript class in community college. It contains all of the projects I did in that class, most notably Proximity and Bullet Hell Game.",
        tags: ["javascript"]
        },
        {
        name: "Mental Math Trainer",
        link: "../../pages/mentalmath/index.html",
        year: 2020,
        desc: "A tool to generate randomized arithmetic problems. Meant to train mental math speed.",
        tags: ["javascript"]
        },
        {
        name: "Toki Pona Sentence Generator",
        link: "../../pages/tokiponagame/index.html",
        year: 2021,
        desc: "Generates random sentences in Toki Pona using a structure I've long since forgotten. If I ever host this site I'll convert this page into an API to be more useful.",
        tags: ["javascript"]
        }
      ]);

    return {
      orderByItems,
      searchedText,
      displayedProjects,
      selectedOrdering,
    };
  }
}).mount('#content');