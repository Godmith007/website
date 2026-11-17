/* =========================================================
   EDIT THIS FILE to change what the site says.
   Kept free of personal details: no town, phone, email,
   college, school, grades or other people's names.

   To add a photo to a project: put the file in /images and add
     image: { src: "images/my-photo.jpg", alt: "What it shows" }
   to that project below.
   ========================================================= */
const CONTENT = {
  name: "Amith Antony John",
  initials: "AJ",
  role: "Mechanical engineer in the making",
  focus: ["design", "FEA & simulation", "topology optimisation", "advanced manufacturing"],

  tagline:
    "I design parts, test them in simulation, and make them lighter and stronger. Most recently: a go-kart steering arm that came out 15% lighter and still stronger.",

  about: [
    "I have always wanted to know how things work, and then to make them work better. That is what drew me to mechanical engineering.",
    "Designing the go-kart steering system showed me how much thought goes into a single part: we made the pitman arm 15% lighter and it still came out stronger. Building my own home server, casing and all, showed me how much I enjoy taking an idea all the way to something that works.",
    "At FACT and MILMA I saw boilers, pumps and refrigeration plants that run day and night, and I understood how much people rely on engineers getting the details right. That is the engineer I want to be: careful, curious and always learning.",
    "I'm in the final year of a B.Tech in Mechanical Engineering and looking for a graduate engineer role where I can use my CAD, FEA and simulation skills on real projects.",
  ],

  facts: [
    { value: "−15.35%", label: "pitman arm mass after topology optimisation" },
    { value: "12.92", label: "factor of safety after optimisation, up from 11.97" },
    { value: "150 mm", label: "WAAM wall modelled in ANSYS APDL" },
    { value: "2", label: "industrial internships" },
  ],

  // level: "Strong" | "Working" | "Basics"
  skills: [
    { name: "Finite element analysis", level: "Working", group: "Simulation" },
    { name: "Topology optimisation", level: "Working", group: "Simulation" },
    { name: "ANSYS APDL", level: "Working", group: "Simulation" },
    { name: "ANSYS Structural & Thermal", level: "Basics", group: "Simulation" },
    { name: "MATLAB Simulink", level: "Basics", group: "Simulation" },
    { name: "Fusion 360", level: "Working", group: "CAD" },
    { name: "Wire arc additive manufacturing", level: "Working", group: "Manufacturing" },
    { name: "Metal 3D printing", level: "Basics", group: "Manufacturing" },
    { name: "Problem solving", level: "Strong", group: "Working style" },
    { name: "Teamwork", level: "Strong", group: "Working style" },
    { name: "MS Office", level: "Strong", group: "Working style" },
  ],

  subjects: [
    "Engineering Mechanics", "Mechanics of Solids", "Engineering Thermodynamics",
    "Fluid Mechanics and Machinery", "Manufacturing Processes", "Kinematics and Dynamics of Machinery",
    "Design of Machine Elements", "Heat and Mass Transfer", "Finite Element Method",
    "Metrology and Instrumentation",
  ],

  projects: [
    {
      title: "Formula go-kart steering system",
      kind: "Mini project · Jan – Mar 2026 · team of three",
      summary: "Design, analysis and topology optimisation of a pitman arm steering system built to Formula Kart Design Challenge (FKDC) rules.",
      points: [
        "Designed a pitman arm steering system based on Ackermann geometry, following the FKDC technical regulations.",
        "Chose Ackermann geometry because a kart corners at low speed: turning the inner wheel more sharply reduces tyre scrub and tightens the turning radius.",
        "Chose a pitman arm layout. Most published design data covers rack and pinion steering, so there was much less to go on for small vehicles.",
        "Calculated the steering geometry, inner and outer wheel angles, steering ratio and a 330 mm tie rod length.",
        "Modelled the knuckle, mounting bracket, tie rod, pitman arm, steering column and hub in CAD.",
        "Checked the EN8 steel components with static structural FEA in ANSYS under 1040 N cornering loads.",
        "Applied topology optimisation to the pitman arm, cutting its mass by 15.35% while its factor of safety rose from 11.97 to 12.92.",
      ],
      tags: ["Ackermann geometry", "ANSYS static structural", "Topology optimisation", "EN8 steel", "CAD"],
      figures: ["ackermann", "topology"],
    },
    {
      title: "Deposition strategy optimisation in WAAM",
      kind: "Seminar · Sept 2026",
      summary: "How the deposition path affects residual stress and distortion in wire arc additive manufacturing.",
      points: [
        "Studied why WAAM parts warp: each new layer reheats the layers below it, which builds up residual stress and distortion.",
        "Reviewed studies comparing raster, spiral and oscillation tool paths.",
        "Built a transient thermal model of a 150 mm wall in ANSYS APDL, with a moving Goldak double-ellipsoid heat source on an 88-point toolpath.",
        "Used element birth and death to add material layer by layer, with interlayer cooling down to 22 °C.",
        "Concluded that tool-path planning alone can sharply reduce distortion without new hardware. One reviewed study recorded a 68.6% reduction with an out-in spiral path.",
      ],
      tags: ["ANSYS APDL", "Transient thermal", "Element birth & death", "Goldak heat source"],
      figures: ["paths"],
      demo: true,
    },
    {
      title: "Thermo-structural analysis of a motorcycle brake disc",
      kind: "Group mini project",
      summary: "How a brake disc heats up and how much it is stressed under hard braking.",
      points: [
        "Ran a thermal analysis in ANSYS to find the disc temperature during hard braking.",
        "Applied those temperatures to a structural analysis to evaluate stress and deformation.",
        "Identified the hottest and most highly stressed regions of the disc.",
      ],
      tags: ["ANSYS", "Thermal", "Structural", "Coupled analysis"],
      figures: ["disc"],
    },
    {
      title: "Home server with a custom casing",
      kind: "Personal project",
      summary: "A self-hosted home server in an enclosure I designed and built.",
      points: [
        "Designed and built a custom casing to house and protect the server hardware.",
        "Installed and configured Umbrel OS to host applications on it.",
        "Delivered a fully working server, from enclosure design through to software setup.",
      ],
      tags: ["Enclosure design", "Fabrication", "Umbrel OS", "Self-hosting"],
      figures: ["server"],
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
    { when: "Nov 2023", title: "Hands on an engine", text: "Royal Enfield Service Camp workshop: my first time servicing a real motorcycle." },
    { when: "Mar 2025", title: "Modelling systems", text: "Completed MathWorks' Simulink Onramp." },
    { when: "May 2025", title: "Inside a fertiliser plant", text: "A week at FACT learning how valves, pumps, seals and heat exchangers keep a large plant running." },
    { when: "Jan 2026", title: "Go-kart steering", text: "Designed, analysed and optimised a pitman arm steering system with my team. The arm came out 15.35% lighter with a higher factor of safety." },
    { when: "Jun 2026", title: "Plant utilities", text: "At the MILMA dairy plant: boilers, a 140 TR ammonia refrigeration plant and heat recovery in practice." },
    { when: "Sep 2026", title: "Simulating metal 3D printing", text: "WAAM seminar: a transient thermal model in ANSYS APDL, and a review of how tool paths control distortion." },
    { when: "Now", title: "Final year", text: "Finishing my degree and looking for a graduate engineer role in design and advanced manufacturing.", now: true },
    { when: "Next", title: "Graduate engineer", text: "Use CAD, FEA and simulation on real products, and learn how designs hold up on the shop floor." },
    { when: "Goal", title: "Design for better machines", text: "Help build vehicles and machines that are lighter, more efficient and more sustainable, designed with simulation from day one." },
  ],

  goals: [
    { front: "Design engineer", back: "Take a part from a sketch to a validated design, with CAD and FEA working together." },
    { front: "Lighter, stronger parts", back: "Use topology optimisation to take material out where it isn't needed, like the go-kart pitman arm." },
    { front: "Advanced manufacturing", back: "Help bring processes like WAAM from the lab to production, where distortion and residual stress really matter." },
    { front: "Always learning", back: "Keep going deeper into simulation, and check every model against real test data." },
  ],

  // Public links only. Leave "" to hide.
  links: {
    linkedin: "https://www.linkedin.com/in/amith-john-652480267/",
    github: "https://github.com/godmith007",
  },
};
