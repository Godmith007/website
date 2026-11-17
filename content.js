/* =========================================================
   EDIT THIS FILE to make the site yours.
   Everything visible on the page comes from here.
   Keep it free of personal details (address, school, phone…).
   ========================================================= */
const CONTENT = {
  name: "Your Name",
  initials: "YN",

  // Rotating phrases in the hero ("I am a …")
  roles: ["builder", "curious learner", "problem solver", "future engineer"],

  tagline:
    "I turn ideas into things people can click, use and enjoy — and I'm just getting started.",

  about: [
    "I'm someone who loves figuring out how things work, then making them work better.",
    "Most days you'll find me writing code, sketching ideas, or going down a rabbit hole about a new technology.",
    "This site is a small window into what I do today and where I'm heading.",
  ],

  // Short facts shown as animated counters
  stats: [
    { value: 12, suffix: "+", label: "Projects built" },
    { value: 5, suffix: "", label: "Languages explored" },
    { value: 1000, suffix: "+", label: "Hours of learning" },
  ],

  // What you do now. level = 0–100
  skills: [
    { name: "JavaScript", level: 80, group: "Code" },
    { name: "Python", level: 70, group: "Code" },
    { name: "HTML & CSS", level: 85, group: "Code" },
    { name: "UI Design", level: 60, group: "Design" },
    { name: "Problem Solving", level: 90, group: "Mindset" },
    { name: "Teamwork", level: 80, group: "Mindset" },
  ],

  // Things you've made or are doing
  projects: [
    {
      title: "Project One",
      emoji: "🚀",
      desc: "A short description of something you built and why it mattered.",
      tags: ["JavaScript", "Web"],
      link: "",
    },
    {
      title: "Project Two",
      emoji: "🎮",
      desc: "A fun experiment — maybe a game, a tool, or an automation.",
      tags: ["Python", "Games"],
      link: "",
    },
    {
      title: "Project Three",
      emoji: "🤖",
      desc: "Something you're learning right now and excited about.",
      tags: ["AI", "Learning"],
      link: "",
    },
  ],

  // The journey: past → now → future. Mark the current step with now: true
  journey: [
    { when: "The spark", title: "Got curious", text: "Wrote my first lines of code and got hooked." },
    { when: "Building", title: "Learning by making", text: "Started building small projects to learn faster." },
    { when: "Now", title: "Leveling up", text: "Sharpening my skills and taking on bigger challenges.", now: true },
    { when: "Next", title: "Becoming a pro", text: "Work on real products used by real people." },
    { when: "Dream", title: "Make an impact", text: "Build something that genuinely helps millions." },
  ],

  // Who you want to become — shown as flip cards
  dreams: [
    { icon: "🛠️", front: "Software Engineer", back: "Build reliable, beautiful software that people love using." },
    { icon: "🌍", front: "Make an Impact", back: "Use technology to solve problems that actually matter." },
    { icon: "📚", front: "Never Stop Learning", back: "Stay curious and keep picking up new skills every year." },
    { icon: "🤝", front: "Help Others Grow", back: "Mentor and share what I learn with people starting out." },
  ],

  // Contact — only public handles. Leave "" to hide.
  links: {
    github: "https://github.com/godmith007",
    linkedin: "",
    email: "", // optional public email
  },
};
