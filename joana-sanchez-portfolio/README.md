# Joana Alexandra Sanchez — portfolio

A responsive portfolio written in plain HTML and CSS, with a dark purple and black theme. No installation, JavaScript, framework, or build step is required.

## Open and edit

1. Extract the ZIP before opening any files.
2. Open `index.html` in a browser.
3. Edit the text and links in `index.html` and the design in `style.css` using your editor.

If you use an editor's local preview extension, preview the folder containing `index.html`.

## Files

```text
index.html
style.css
README.md
assets/
  docs/
    joana-alexandra-sanchez-resume.pdf
  img/
    profile.jpg
    favicon.svg
    projects/
      chatcit.jpg
```

The résumé is the original supplied PDF. The portrait was extracted from it. The project screenshot shows the actual public ChatCIT guest interface, captured on November 3, 2026. The site has no external font or icon dependencies.

## Updates still needed for the full school rubric

- Add a second real technical project when ready, including its title, your role, a description, stack, screenshot, and available links. Only ChatCIT was supplied, so this version currently contains one project.
- Add your GitHub profile and available source repositories once ready. No invented or nonworking GitHub links are included.
- Replace `assets/img/profile.jpg` with a high-resolution solo photo. The current source portrait is only 134 × 134 pixels. Keep the same filename, or update the `<img>` path in `index.html`. A square crop works best with the current circular display.

## Add your next project

Find the `<article class="project-card">` inside the `projects` section. Duplicate that article, then replace every project-specific title, role, description, image, technology tag, and demo link. Save the real screenshot under `assets/img/projects/`. Add spacing to the second card with `.project-card + .project-card { margin-top: 24px; }` in the stylesheet.

To add a source repository link inside the project copy, use:

```html
<a class="project-link" href="YOUR_REAL_REPOSITORY_URL" target="_blank" rel="noopener noreferrer">Source code <span aria-hidden="true">↗</span></a>
```

Replace the example URL with your actual repository before adding it to the page. A comment in the hero social links marks where a GitHub profile link can go.

## Common changes

- Theme colors: edit the `:root` custom properties at the beginning of `style.css`.
- Résumé: replace the PDF under `assets/docs/`, keeping its current name.
- Contact or internship information: update both the hero/availability section and the contact section in `index.html`.
- Project stack: the badges in the ChatCIT card describe the project's technologies, not a claim of individual proficiency in every tool.

The current content reflects the supplied personal-details PDF, résumé, and the clarification that no second project or current GitHub links are available yet.
