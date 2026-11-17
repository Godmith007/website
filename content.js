/* =========================================================
   EDIT THIS FILE to change what the site says.
   Kept free of personal details: no town, phone, college,
   school or grades.
   ========================================================= */
const CONTENT = {
  name: "Amith Antony John",
  initials: "AJ",
  role: "Mechanical engineer in the making",
  focus: ["design", "simulation", "advanced manufacturing"],

  tagline:
    "I build simulation models that predict how metal heats up, cools down and deforms, and I use what they show to design better parts.",

  about: [
    "I'm a final-year mechanical engineering student with a strong interest in design and advanced manufacturing.",
    "Most of my work so far has been simulation. I've modelled how a metal wall heats and cools as it is 3D printed layer by layer, and how a motorcycle brake disc handles heat and stress under braking. On the hands-on side, I designed and built a custom casing for my own home server.",
    "I'm looking for a graduate engineer role where I can use my CAD and simulation skills on real projects and grow with a team.",
  ],

  facts: [
    { value: "150 mm", label: "WAAM wall modelled in ANSYS APDL" },
    { value: "88", label: "toolpath points for the moving heat source" },
    { value: "2", label: "industrial internships" },
  ],

  // level: "Strong" | "Working" | "Basics"
  skills: [
    { name: "ANSYS APDL", level: "Working", group: "Simulation" },
    { name: "Finite element analysis", level: "Working", group: "Simulation" },
    { name: "ANSYS Structural & Thermal", level: "Basics", group: "Simulation" },
    { name: "MATLAB Simulink", level: "Basics", group: "Simulation" },
    { name: "Fusion 360", level: "Working", group: "CAD" },
    { name: "AutoCAD", level: "Working", group: "CAD" },
    { name: "Wire arc additive manufacturing", level: "Working", group: "Manufacturing" },
    { name: "Metal 3D printing", level: "Basics", group: "Manufacturing" },
    { name: "Problem solving", level: "Strong", group: "Working style" },
    { name: "Team collaboration", level: "Strong", group: "Working style" },
    { name: "Project management", level: "Working", group: "Working style" },
    { name: "MS Office", level: "Strong", group: "Working style" },
  ],

  projects: [
    {
      title: "Thermal simulation of wire arc additive manufacturing",
      kind: "Seminar project",
      summary: "A transient thermal model of a metal wall being printed layer by layer.",
      points: [
        "Built a transient thermal model of a 150 mm metal wall in ANSYS APDL.",
        "Used a Goldak double-ellipsoid heat source moving along an 88-point toolpath.",
        "Added material layer by layer using element birth and death, with cooling between layers.",
        "Ran the model until the part cooled to room temperature (22 °C).",
        "Studied how the deposition pattern affects residual stress and distortion.",
      ],
      tags: ["ANSYS APDL", "Transient thermal", "Element birth & death"],
      demo: true,
    },
    {
      title: "Thermo-structural analysis of a motorcycle brake disc",
      kind: "Group mini project",
      summary: "How heat and stress build up in a brake disc during braking.",
      points: [
        "Analysed heat generation and the resulting thermal stress in a brake disc during braking.",
        "Coupled thermal and structural analyses in ANSYS.",
      ],
      tags: ["ANSYS", "Thermal", "Structural"],
    },
    {
      title: "Home server with a custom casing",
      kind: "Personal project",
      summary: "A home server in a casing I designed and built myself.",
      points: [
        "Designed and built my own casing for a home server.",
        "Installed and configured Umbrel OS to run it.",
      ],
      tags: ["Enclosure design", "Fabrication", "Umbrel OS"],
    },
  ],

  experience: [
    {
      org: "MILMA dairy plant",
      what: "Internship",
      when: "June 2026 · 5 days",
      points: [
        "Studied the plant's fire-tube boilers, feed water treatment and multistage pumps.",
        "Learned how the 140 TR ammonia refrigeration plant works, including heat recovery to boiler feed water.",
        "Saw the pasteuriser, homogeniser, CIP system and effluent treatment plant.",
      ],
    },
    {
      org: "Fertilisers and Chemicals Travancore (FACT)",
      what: "Internship",
      when: "May 2025 · 1 week",
      points: [
        "Learned about industrial valves, pumps, mechanical seals, couplings and heat exchangers.",
        "Focused on how plant machinery is run and maintained in large-scale fertiliser production.",
      ],
    },
  ],

  certifications: [
    { name: "Simulink Onramp", by: "MathWorks", when: "March 2025", note: "Completed 100%" },
    { name: "Royal Enfield Service Camp workshop", by: "SAE student chapter", when: "November 2023" },
  ],

  // Past → now → future. Mark the current step with now: true
  journey: [
    { when: "Nov 2023", title: "Hands on an engine", text: "Royal Enfield Service Camp workshop: my first time taking a real motorcycle apart and servicing it." },
    { when: "Mar 2025", title: "Modelling systems", text: "Completed MathWorks' Simulink Onramp and started thinking in block diagrams and signals." },
    { when: "May 2025", title: "Inside a fertiliser plant", text: "A week at FACT learning how valves, pumps, seals and heat exchangers keep a large plant running." },
    { when: "2026", title: "Simulating metal 3D printing", text: "Built a WAAM thermal model in ANSYS APDL, with a moving Goldak heat source and material added layer by layer." },
    { when: "Jun 2026", title: "Plant utilities", text: "At the MILMA dairy plant: boilers, a 140 TR ammonia refrigeration plant and heat recovery in practice." },
    { when: "Now", title: "Final year", text: "Finishing my degree and looking for a graduate engineer role in design and advanced manufacturing.", now: true },
    { when: "Next", title: "Graduate engineer", text: "Use CAD and simulation on real products, and learn how designs hold up on the shop floor." },
    { when: "Goal", title: "Design for better machines", text: "Help build vehicles and machines that are more efficient and more sustainable, designed with simulation from day one." },
  ],

  // Who I want to become: flip cards
  goals: [
    { front: "Design engineer", back: "Take a part from a sketch to a validated design, with CAD and FEA working together." },
    { front: "Advanced manufacturing", back: "Help bring processes like WAAM from the lab to production, where distortion and residual stress really matter." },
    { front: "Automotive industry", back: "Work on vehicles and components that push for efficiency and sustainability." },
    { front: "Always learning", back: "Keep going deeper into simulation, and check every model against real test data." },
  ],

  // Public links only. Leave "" to hide.
  links: {
    linkedin: "https://www.linkedin.com/in/amith-john-652480267/",
    github: "https://github.com/godmith007",
  },
};
