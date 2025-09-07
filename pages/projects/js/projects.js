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
          name: "Untitled Strategy Game",
          link: "https://github.com/kralinc/cw2100game",
          year: 2025,
          desc: "Unfinished but mostly playable hex-based strategy game in godot. It includes my first attempt at AI opponents that produce surprisingly competent gameplay. My intent is to finish it with a much higher degree of polish than I usually do. Still finishing up the gameplay though so never got to the polish part. Currently shelved since I started making a different game with a friend.",
          tags: ["godot"]
        },
        {
          name: "WebSocketChat",
          link: "https://github.com/kralinc/WebSocketChat",
          year: 2024,
          desc: "Unfinished websocket proof of concept for a chatroom. Uses the spring framework. It was meant to be a stepping stone to a jackbox-style game where people join with their phones. Project isn't totally shelved but I lost interest and might return someday.",
          tags: ["java"]
        },
        {
          name: "Friendly Villagers",
          link: "https://github.com/kralinc/FriendlyVillagers",
          year: 2024,
          desc: "This is a mod for the video game 'Worldbox'. It allows civilizations to have any species in their empire. In its original development no such feature existed, so all empires could only have a single species, and simply killed all of the others. I thought this was boring and made the mod to make it more fun for me. Ever since a game update in 2025 multi-species empires are now possible under some circumstances, and I updated the mod just to expand on what's already there.",
          tags: ["c#", "mod"]
        },
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
          name: "Proximity",
          link: "../../pages/honors_project/index.html",
          year: 2020,
          desc: "My submission for the project requirement of my community college's honors program. This is an implementation of the game Proximity on a square grid. You can have an arbitrary number of AI and human players, including zero human players. Playable on mobile as well as desktop.",
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
        },
        {
          name: "Snake",
          link: "https://github.com/kralinc/processing-snake",
          year: 2019,
          desc: "Implementation of snake in processing3. The snake speeds up as you gain score.",
          tags: ["java"]
        },
        {
          name: "Minesweeper",
          link: "https://github.com/kralinc/minesweeper-processing",
          year: 2019,
          desc: "Implementation of minesweeper in processing3. The primary goal was to test my new scene interface, which would let me make more complex games. The interface works by implementing its own versions of processing specific methods, such as draw(), start(), onMouseClicked(), and a few others. These classes are all put into an array in the main file, and the index of the current scene can be switched from within each scene. The methods of the class that the index points to are run in the main file.",
          tags: ["java"]
        },
        {
          name: "Tetris (Processing3)",
          link: "https://github.com/kralinc/processing3-tetris",
          year: 2019,
          desc: "The second of a few games I made using processing3. It's a fully playable implementation of tetris, including increasing levels and showing a preview of the next piece.",
          tags: ["java"]
        },
        {
          name: "Avoid Spikes Game",
          link: "https://github.com/kralinc/avoid-spikes-game",
          year: 2019,
          desc: "A game where 'spikes' (squares) emerge from all sides and you use WASD to avoid them, earning one point per second. This was the start of a series of a few game where I used Processing3 to recreate famous games. I consider this my first 'good' program I made. It's long enough ago that I didn't really understand how github worked and published the built applications instead of the source code, though the build does include the source in the folder structure.",
          tags: ["java"]
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
