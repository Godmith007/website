# Personal website

An interactive single-page portfolio about what I do and who I want to become.
It's plain HTML, CSS and JavaScript, with no build step.

## Make it yours
Edit **`content.js`**. Everything on the page comes from that file: name, roles, about, skills, projects, journey, goals and links.

## Add photos
Put images in `images/` and add `image: { src: "images/file.jpg", alt: "..." }` to a project in `content.js`.

## Features
- Live, simplified WAAM thermal model at the top: material is added layer by layer, the torch moves along the wall, and the colours follow an ANSYS-style temperature scale
- Projects that expand to show drawn figures: an interactive Ackermann steering diagram, a before/after view of the pitman arm optimisation, and WAAM tool paths compared
- Filterable skills, core subjects, internships and certifications
- Journey slider (past → now → future) and flip cards for goals
- Light and dark themes, plus a hidden command line: press `` ` `` and type `help`

## Preview locally
Open `index.html` in a browser.

## Publish free with GitHub Pages
1. The repository must be **public** (Settings → General → Danger Zone → Change visibility). Pages works on private repositories only with a paid plan.
2. Merge the site into `main`.
3. Go to **Settings → Pages**. Under *Build and deployment*, choose **Deploy from a branch**, then pick `main` and `/ (root)`, and click **Save**.
4. After about a minute the site is live at `https://<username>.github.io/website/`.

Want the shorter `https://<username>.github.io` address? Rename the repository to `<username>.github.io`.
