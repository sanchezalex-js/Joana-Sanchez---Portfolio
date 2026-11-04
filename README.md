# Joana Alexandra Sanchez — Internship Portfolio

A responsive portfolio built with HTML, CSS, and JavaScript. Includes larger typography, a navigation highlight that follows the current section, an alternating leadership timeline, a project showcase, and a downloadable résumé.

## Upload to GitHub

1. Extract the ZIP on your computer.
2. Create a GitHub repository, or open the repository you want to use.
3. Upload the extracted files and the entire `assets` folder to the repository's top level. Upload the contents, not the ZIP file itself.
4. Commit the uploaded files. You should see `index.html`, `style.css`, `navigation.js`, `vercel.json`, and `assets` directly in the repository root.

Keep the folders inside `assets` intact so the images and résumé links work.

## Deploy on Vercel

1. In Vercel, create a new project and import this GitHub repository.
2. Keep the Root Directory at the repository root (`./`).
3. Use **Other** as the Framework Preset. This site uses plain HTML/CSS/JavaScript.
4. The included `vercel.json` sets the Build Command to empty and the Output Directory to `.`. No dependency installation, build step, or environment variables are required.
5. Select **Deploy**.

After deployment, open the Vercel URL and check the navigation, images, résumé download, project demo link, and contact links. Future commits to your connected production branch can deploy through Vercel's Git integration.

Official references: [Importing a Git repository](https://vercel.com/docs/deployments) and [static-site build settings](https://vercel.com/docs/builds/configure-a-build#skip-build-step).

## Open locally

Open `index.html` after extracting the ZIP. You can also use your editor's local web preview.

## Files

```text
index.html
style.css
navigation.js
vercel.json
README.md
assets/
  docs/
    joana-alexandra-sanchez-resume.pdf
  img/
    favicon.svg
    profile.jpg
    projects/
      chatcit.jpg
```

## Edit the portfolio

- Content, contact information, roles, and project details: `index.html`.
- Colors, typography, spacing, and responsive layouts: `style.css`.
- Active-section navigation behavior: `navigation.js`.
- Résumé: replace the PDF in `assets/docs`, keeping its filename or updating the links in `index.html`.
- Portrait: replace `assets/img/profile.jpg`. A higher-resolution square photo will improve the large circular portrait.
- Projects: duplicate the project article in `index.html`, then supply the real title, description, screenshot, technologies, and links.

This export includes the latest larger-text design, active navigation indicator, and leadership timeline.
