import { createApp, ref } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';
import ProjectCard from './ProjectCard.js';

  createApp({
    components: {
      ProjectCard,
    },
    setup() {
      const projects = ref([
          {
            name: "MyKitchen 'Ceres'",
            link: "https://github.com/kralinc/ceres",
            year: 2023,
            desc: "Software development final project for Missouri State University. I worked on the frontend, which we named 'ceres'. The backend was named 'demeter' and is linked in the readme. This project took about 4 months to complete and featured a much higher degree of polish and collaboration than I have ever done before.",
            tags: ["javascript", "vue"]
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
          name: "HARDCORE!!",
          link: "https://github.com/kralinc/HARDCORE-2/blob/main/README.md",
          year: 2022,
          desc: "A platformer game, sequel to a bad game that I love that I made in 2016 in clickteam fusion.",
          tags: ["godot"],
          },
          {
          name: "Calcium Carnage",
          link: "https://cactusdan.itch.io/calcium-carnage",
          year: 2022,
          desc: "Made for Ludum Dare 50. Also my first game for a game jam.",
          tags: ["haxe", "game jam"],
          },
          {
          name: "Markov Chain Generator",
          link: "markov/",
          year: 2022,
          desc: "A basic markov chain generator. You put training data in the 'train model' page, and receive output on the 'generate text' page. It can accept any arbitrary file as input, and supports appending new data to your current model.",
          tags: ["javascript", "vue"],
          },
          {
          name: "Hunger Games Sim",
          link: "hungergames-js/",
          year: 2021,
          desc: "A sequel to my hunger games simulator in python. Provides a much better simulation than the previous project. Work stopped due to misgivings about the project structure.",
          tags: ["javascript"],
          },
          {
          name: "Bullet Hell Game",
          link: "pages/labs/proj2/index.html",
          year: 2020,
          desc: "Final project for my javascript class in community college. The assignment was 'make a game' and I went pretty hard on it.",
          tags: ["javascript", "jquery"]
          },
          {
          name: "PokeSmash",
          link: "pokesmash/",
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
          link: "pages/anybase/anybase.html",
          year: 2021,
          desc: "This project is a simple tool to convert numbers from one base to any other base from 2-36. It supports decimals as well.",
          tags: ["javascript"]
          },
          {
          name: "CMWEB 200 Personal Site",
          link: "cmweb200.html",
          year: 2020,
          desc: "The personal site I created for my javascript class in community college. It contains all of the projects I did in that class, most notably Proximity and Bullet Hell Game.",
          tags: ["javascript"]
          },
          {
          name: "Mental Math Trainer",
          link: "pages/mentalmath/index.html",
          year: 2020,
          desc: "A tool to generate randomized arithmetic problems. Meant to train mental math speed.",
          tags: ["javascript"]
          },
          {
          name: "Toki Pona Sentence Generator",
          link: "pages/tokiponagame/index.html",
          year: 2021,
          desc: "Generates random sentences in Toki Pona using a structure I've long since forgotten. If I ever host this site I'll convert this page into an API to be more useful.",
          tags: ["javascript"]
          }
        ]);

      return {
        projects,
      };
    }
  }).mount('#content');