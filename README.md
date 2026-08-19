# Encuentro PyME Aconcagua — Demo Landing Page

A demo event-registration landing page, built to show local business owners (and other developers) what a fast, honest, hand-built site looks like. The event itself is fictional — the site says so, clearly.

**Live:** https://landingdemo1.houdini-dev.workers.dev/

## Stack

- Astro 5, static output
- TailwindCSS 4
- TypeScript (strict)
- Cloudflare Worker (static assets + API route), no Cloudflare Pages

  ## Highlights

  - 100/100 Lighthouse performance on mobile, LCP 1.4s, CLS 0
  - Registration form works with JavaScript fully disabled: native HTML POST, progressively enhanced
  - Server-side validation and honeypot spam protection, no CAPTCHA / no third-party JS
  - Real email delivery on submit via Resend, sent from a Cloudflare Worker endpoint
  - Under 2KB of client JS (only the countdown timer)

    ## Related project

    The personal site sharing this project's design DNA is [camiloflores.cl](https://github.com/Camilo-flores-salgado/CamiloWeb) — separate repo, separate stack decisions, same performance discipline.

    ## Local development

    ```
    npm install
    npm run dev
    ```
    
