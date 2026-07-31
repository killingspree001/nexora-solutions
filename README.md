# Nexora Solutions — One Page Business Website

A clean, lightweight and responsive one page website for Nexora Solutions. Built with plain HTML, CSS and JavaScript, no frameworks or build steps, so it can be uploaded to any hosting as is.

## Sections

1. **Hero / intro** — headline, short pitch and call to action buttons
2. **About us** — who we are, what we stand for, plus animated stats
3. **Services** — Web Design, Development, SEO & Marketing, Branding
4. **Past work** — three selected projects with tags
5. **Contact** — phone, email, location and a contact form
6. **Footer** — quick links and social media icons (Facebook, Instagram, LinkedIn, YouTube)

## Folder structure

```
nexora-solutions/
├── index.html        the whole page
├── css/style.css     all styling, design tokens at the top
├── js/main.js        menu, scroll animations, counters, form handling
├── fonts/            Fraunces and Inter, self hosted woff2 files
└── images/           favicon
```

## How to use

Upload everything to your hosting (cPanel, shared hosting, Netlify, Vercel, GitHub Pages, anything that serves static files) and you are done. No install, no build.

To preview locally just open `index.html` in a browser, or run a small server from the folder:

```
python -m http.server 8000
```

## Customizing

- **Colors** — edit the CSS variables at the top of `css/style.css` (`--cream`, `--pine-950`, `--accent` and friends). Change those and the whole site follows.
- **Text and sections** — everything lives in `index.html`, plain markup with clear section comments.
- **Logo** — the hexagon logo is inline SVG in the header and footer of `index.html`, and `images/favicon.svg`. Swap those for your own mark.
- **Social links** — in the footer, update the four `href` values to your profiles.
- **Contact details** — phone, email and address are in the contact section, update the text and the `tel:` / `mailto:` links.
- **Stats** — the numbers in the about section come from `data-count` attributes, change them and the counters follow.

## Contact form

The form validates input and shows a success message on the page. It does not send anything by itself since that needs a server. To make it actually deliver messages, point it at your form handler in `js/main.js` (look for the submit handler) — services like Formspree, Web3Forms or your own backend endpoint all work. Until then it is safe to demo.

## Browser support

Works in all modern browsers (Chrome, Edge, Firefox, Safari, mobile browsers). Respects reduced motion settings for users who turn animations off.
