# Akshay CP — Portfolio Site

A redesign of akshaycp.online around a "color-grading suite / director's
viewfinder" concept — the palette is a literal film teal–orange grade, mono
type stands in for camera timecode/HUD readouts, and the film-strip sprocket
strip replaces plain section dividers.

## Structure

```
index.html              Home
style.css                One shared stylesheet for the whole site
script.js                One shared script for the whole site
pages/
  about.html
  services.html
  projects.html
  experience.html
  contact.html
assets/                  Placeholder cover images (SVG)
```

Subpages link back to the root files using `../style.css`, `../script.js`
and `../assets/...` — keep this folder structure intact when you upload it.

## Replace the placeholder images

Every image is a generated placeholder (gradient + label) so you can see
exactly which file to swap and at what aspect ratio. Keep the same filename
and aspect ratio so the layout doesn't shift, or update the `<img>` paths in
the HTML if you rename them.

| File | Used in | Suggested ratio |
|---|---|---|
| assets/portrait-hero.svg | Home hero | 4:5 |
| assets/portrait-about.svg | About page | 4:5 |
| assets/project-jogger.svg | Home — featured (large) | 3:4 |
| assets/project-identity.svg | Home — featured | 5:4 |
| assets/project-motion.svg | Home — featured | 5:4 |
| assets/project-social.svg | Home — featured (wide) | 16:7 |
| assets/gallery-01.svg … gallery-09.svg | Projects page gallery | 1:1 |

## Things to personalize before launch

- **Instagram / LinkedIn links** in the footer are placeholder `#` — add
  your real profile URLs (search-replace `href="#"` near the social icons).
- **Experience timeline** (`pages/experience.html`) and the **About** bio
  use plausible placeholder copy — edit with your real roles/dates.
- **Project titles & categories** on the home and projects pages are
  placeholders — swap in your real project names once you add real covers.
- The **contact form** has no backend; submitting it opens the visitor's
  email app pre-filled with their message (no server required). If you'd
  rather collect submissions directly, you'll need to wire it to a form
  service or your own backend.

## Notes

- Fonts (Space Grotesk / Inter / JetBrains Mono), Font Awesome, GSAP,
  ScrollTrigger and Lenis all load from CDNs, same as the original — an
  internet connection is required for full styling/animation.
- Reduced-motion preference is respected; the loader and reveal animations
  also degrade gracefully (page stays fully visible) if any script fails
  to load.
