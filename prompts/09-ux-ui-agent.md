You are the UX/UI Agent.

Your task is to improve the visual design and user experience of the NewsHub frontend.

Before implementing, read:

- AGENTS.md
- docs/FRONTEND_IMPLEMENTATION_REPORT.md
- docs/architecture/project-structure.md
- docs-site/docs/frontend/pages.md
- docs-site/docs/frontend/components.md

Design goal:

Create a professional news portal experience inspired by the visual identity and structure of https://infile.com/regional.

Use the Infile site only as visual inspiration:
- Corporate and clean layout.
- Regional/business tone.
- Strong hero section.
- Rounded cards.
- Clear CTAs.
- Organized content sections.
- Trust/statistics style blocks.
- Blog/news card style sections.
- Footer with structured information.

Important:
Do not copy proprietary assets, images, logos, text, or exact layout.
Do not use Infile brand name or logo.
Only use an inspired color palette and UX direction.

Suggested color direction:
- Deep navy / dark blue for header and primary sections.
- Bright blue or cyan accents.
- White backgrounds.
- Light gray surfaces.
- Subtle green/teal accent only if useful.
- High contrast text.
- Professional corporate style.

UX requirements:

1. Home news page
   - Add hero section.
   - Add featured news area.
   - Add latest news grid.
   - Add categories navigation.
   - Add right sidebar or reserved spaces for ads.
   - Add newsletter/subscription CTA if simple.

2. News detail page
   - Improve reading layout.
   - Add article metadata.
   - Add recommended news section.
   - Add reserved ad slot near sidebar or between sections.
   - Add back navigation.

3. Categories page
   - Improve category cards.
   - Add category filter UX.

4. Navbar
   - Improve visual hierarchy.
   - Include Home, Categories, Login/Register or Profile/Logout.
   - Keep responsive behavior.

5. Advertisement placeholders
   - Add reusable AdSlot component.
   - Use clear labels such as "Espacio publicitario".
   - Place ad slots without harming readability.

6. Responsive design
   - Desktop, tablet and mobile friendly.
   - Avoid horizontal scroll.
   - Keep cards readable.

Technical rules:

- Use React + TypeScript.
- Use Inertia.js.
- Use Material UI.
- Do not use React Router.
- Do not create a standalone frontend project.
- All frontend code must remain inside backend/resources/js.
- Prefer reusable components.
- Do not change backend business logic.
- Do not change API contracts.
- Do not replace JWT with Sanctum.
- Avoid adding unnecessary libraries.

After implementation:

- Run npm run build.
- Fix TypeScript/Vite errors.
- Create docs/UX_UI_REPORT.md in Spanish.
- Create or update docs-site/docs/frontend/ux-ui-report.md.

The UX/UI report must include:

1. Design objective.
2. Color palette used.
3. Layout improvements.
4. Components created or updated.
5. Advertisement spaces added.
6. Responsive behavior.
7. Accessibility considerations.
8. Build result.
9. Pending risks.

IMPORTANT:
All generated documentation must be written in Spanish.
Code, class names, methods, variables, routes and technical identifiers must remain in English.