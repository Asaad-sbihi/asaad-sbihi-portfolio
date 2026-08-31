# Asaad Sbihi — Portfolio

Next.js 14 (App Router) portfolio for a Full-Stack AI Engineer.

## Run it

```bash
npm install
cp .env.local.example .env.local   # then paste your Formspree ID
npm run dev                        # http://localhost:3000
```

## Contact form — it already works

The modal posts to [FormSubmit](https://formsubmit.co) using the address in
`lib/content.js`. No account, no API key.

**One step is required:** send yourself a test message from the live site. FormSubmit
replies with a confirmation email — click the link in it once, and every message from
then on arrives in your inbox. Until you confirm, messages are held.

Each email arrives as a table with the sender's name, email, the topic they picked
(Project brief / Job opportunity / Something else) and their message, with the subject
line pre-filled as e.g. "Project brief from Sara".

### Prefer Formspree?

Create a form at [formspree.io](https://formspree.io), then put the ID in `.env.local`:

```
NEXT_PUBLIC_FORMSPREE_ID=mzbqwxyz
```

When set it takes priority over FormSubmit. On Vercel, add the same variable under
Project → Settings → Environment Variables.

If a send fails either way, the modal offers a mailto link that opens the visitor's
email app with their message already in the body — so a lead is never lost.

## Structure

```
app/
  layout.jsx        fonts (next/font), metadata, ModalProvider
  page.jsx          section composition
  globals.css       design system — tokens, sections, modal
components/
  Header.jsx        sticky nav, smooth scroll, mobile menu, "Let's talk"
  Hero.jsx          typewriter, parallax, code card
  Trust.jsx         100% badge + cards #01–#04
  Focus.jsx         profile carousel (autoplay, arrows, keyboard)
  Services.jsx      #services — drag-scroll stack rail
  Work.jsx          #projects — filter chips + project grid
  Path.jsx          experience, education, language bars
  Contact.jsx       contact links, "Send a brief", CV download
  ContactModal.jsx  slide-in form, validation, Formspree submit
  Reveal.jsx        scroll-reveal wrapper
context/
  ModalContext.jsx  shared open/close state for the modal
hooks/
  useReveal.js      IntersectionObserver reveal
  useSmoothScroll.js  offset-aware anchor scrolling
  useReducedMotion.js
lib/
  content.js        ALL copy, projects, experience — edit here
public/
  resume.pdf        served by the Download CV button
  avatar.jpg
```

## Add your projects

Open `lib/content.js` and edit the `PROJECTS` array:

```js
{
  title: "Client dashboard",
  desc: "One line: the problem, what you built, the result.",
  tags: ["AI", "Full-Stack"],        // drives the filter chips
  stack: ["Next.js", "Laravel", "OpenAI"],
  image: "/projects/dashboard.jpg",  // file in /public, or "" for a placeholder
  url: "https://example.com"         // "" hides the View project link
}
```

Screenshots go in `public/projects/`. Nothing else needs touching.

## Section IDs

`#top` · `#about` · `#services` · `#projects` · `#path` · `#contact`

Header links scroll to `#projects` and `#services` with a 92px offset so the fixed
header never covers a heading. Change the offset in `hooks/useSmoothScroll.js`.

## Replace the CV

Drop your PDF at `public/resume.pdf` (currently your existing CV). The button uses
`<a href="/resume.pdf" download>`, so it saves the file instead of opening a tab.

## Deploy

```bash
npx vercel        # or: npm run build && npm start
```

Push to GitHub and import the repo on Vercel. Remember the environment variable.

## Notes

- Fonts load through `next/font/google` — self-hosted at build time, no layout shift, no render-blocking request to Google.
- Every animation is behind `prefers-reduced-motion`.
- The modal traps focus, closes on Escape and backdrop click, locks body scroll, and restores focus to the button that opened it.
- The form has a honeypot field to absorb bots.
