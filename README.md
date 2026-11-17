# Personal website

An interactive single-page portfolio about what I do and who I want to become.
It's plain HTML, CSS and JavaScript, with no build step.

## Make it yours
Edit **`content.js`**. Everything on the page comes from that file: name, roles, about, skills, projects, journey, goals and links.

## Add photos
Put images in `images/` and add `image: { src: "images/file.jpg", alt: "..." }` to a project in `content.js`.

## Features
- Particle background that reacts to the mouse (click the background for a burst)
- Typing headline, scroll reveals, animated counters and skill bars
- 3D-tilt project cards, magnetic buttons, filterable skills
- Journey slider (past → now → future) and flip cards for future goals
- Dark/light theme
- Hidden terminal: press `` ` `` and type `help`
- Easter eggs: Konami code, or click the logo 5 times

## Preview locally
Open `index.html` in a browser.

## Publish free with GitHub Pages
1. The repository must be **public** (Settings → General → Danger Zone → Change visibility). Pages works on private repositories only with a paid plan.
2. Merge the site into `main`.
3. Go to **Settings → Pages**. Under *Build and deployment*, choose **Deploy from a branch**, then pick `main` and `/ (root)`, and click **Save**.
4. After about a minute the site is live at `https://<username>.github.io/website/`.

Want the shorter `https://<username>.github.io` address? Rename the repository to `<username>.github.io`.
