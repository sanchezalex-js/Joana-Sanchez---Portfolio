# Joana Alexandra Sanchez — portfolio

A responsive portfolio in plain HTML, CSS, and JavaScript. It uses a dark plum palette, locally hosted Manrope, frosted glass cards, and a brief meteor effect. A navigation highlight follows the current section. Hover and scroll effects respect reduced-motion preferences. No installation, framework, or build step is required.

## Open and edit

1. Extract the ZIP before opening any files.
2. Open `index.html` in a browser.
3. Edit the text and links in `index.html` and the design in `style.css` using your editor.

If you use an editor's local preview extension, preview the folder containing `index.html`.

## Files

```text
index.html
style.css
navigation.js
motion.js
README.md
assets/
  fonts/
    manrope-latin.woff2
    OFL-Manrope.txt
  docs/
    joana-alexandra-sanchez-resume.pdf
  img/
    profile.jpg
    favicon.svg
    projects/
      chatcit.jpg
      royals-community.jpg
  video/
    royals-community.mp4
```

The résumé is the original supplied PDF. The portrait was extracted from it. The project screenshot shows the actual public ChatCIT guest interface, captured on November 3, 2026. Manrope is bundled locally under the SIL Open Font License.

## Updates still needed for the full school rubric

- Replace `assets/img/profile.jpg` with a high-resolution solo photo. The current source portrait is only 134 × 134 pixels. Keep the same filename, or update the `<img>` path in `index.html`. A square crop works best with the current circular display.

## Add your next project

Find the `<article class="project-card">` inside the `projects` section. Duplicate that article, then replace every project-specific title, role, description, image, technology tag, and demo link. Save the real screenshot under `assets/img/projects/`. Add spacing to the second card with `.project-card + .project-card { margin-top: 24px; }` in the stylesheet.

To add a source repository link inside the project copy, use:

```html
<a class="project-link" href="YOUR_REAL_REPOSITORY_URL" target="_blank" rel="noopener noreferrer">Source code <span aria-hidden="true">↗</span></a>
```

Replace the example URL with your actual repository before adding it to the page. The GitHub profile is linked in the hero and contact sections.

## Common changes

- Theme colors: edit the `:root` custom properties at the beginning of `style.css`.
- Résumé: replace the PDF under `assets/docs/`, keeping its current name.
- Contact or internship information: update both the hero/availability section and the contact section in `index.html`.
- Project stack: the badges in the ChatCIT card describe the project's technologies, not a claim of individual proficiency in every tool.

Royals Community is presented with an excerpt from the supplied walkthrough.
