# CMMC Toolkit Page Notes

Prepared local page for:

https://mirzayanllc.com/cmmc-toolkit/

Current form behavior: preview/static GET redirect to thank-you.html. Before live lead capture, wire to Formspree, Netlify Forms, HubSpot, Mailchimp/ConvertKit, or WordPress form plugin.

Assets included under cmmc-toolkit/assets/:
- cmmc-level-2-readiness-toolkit-v0.1.xlsx
- cmmc-level-2-readiness-workbook-preview-v0.1.pdf
- kdp-cover-preview-v0.1.png

Compliance posture: educational/readiness planning only; no certification guarantee.

## Formspree lead capture wiring

Local preview form is now wired for production lead capture using Formspree.

- Form action: `https://formspree.io/f/xgodwvbn`
- Method: `POST`
- Redirect after submit: `https://mirzayanllc.com/cmmc-toolkit/thank-you.html`
- Required fields: work email, company
- Additional fields: first name, website, DoD work status, CUI status, biggest need, timeline
- Hidden source tag: `mirzayanllc.com/cmmc-toolkit`

Do not push live until deployment approval is given. After live deploy, submit one real test lead and confirm it arrives in Formspree and redirects to the thank-you/download page.

