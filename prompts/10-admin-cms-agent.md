You are the Admin CMS Agent.

Your task is to implement an admin content management section for NewsHub and prepare the backend infrastructure for a future AI Legal Extractor module.

Before implementing, read:

- AGENTS.md
- docs/BACKEND_IMPLEMENTATION_REPORT.md
- docs/FRONTEND_IMPLEMENTATION_REPORT.md
- docs/architecture/database-model.md
- docs/architecture/api-design.md
- docs/REVIEW_REPORT.md

Context:

NewsHub is a Laravel 13 application with React + TypeScript + Inertia.js inside Laravel.
The public site shows legal news related to laws, reforms, decrees and official publications.
Normal users only view the public portal.
Admin users manage news content.
A future AI module will process official PDFs and create draft legal news.

Backend requirements:

1. User admin access
   - Add an is_admin boolean column to users.
   - Seed at least one admin user.
   - Protect admin routes so only admin users can access them.
   - Keep JWT as the main API authentication mechanism.
   - Do not replace JWT with Sanctum.

2. News CMS fields
   Extend the news model and database structure to support legal content:

   - title
   - slug
   - summary
   - body
   - image_url
   - category_id
   - source_url
   - publication_date
   - status
   - legal_document_type
   - decree_number
   - institution
   - affected_law
   - effective_date
   - ai_generated
   - ai_summary
   - ai_key_points
   - original_pdf_url
   - extracted_text

3. Tags
   - Add tags table.
   - Add news_tag pivot table.
   - News can have many tags.
   - Tags can belong to many news.
   - Seed legal tags such as:
     - ley
     - reforma
     - decreto
     - acuerdo
     - reglamento
     - congreso
     - municipalidad
     - tribunal
     - ministerio

4. News status
   Add support for:
   - draft
   - published
   - archived

   Public news pages and public API responses should only show published news.
   Admin pages may show all statuses.

5. Admin backend
   Implement admin routes/controllers/actions for:
   - listing news
   - creating news
   - editing news
   - deleting news
   - publishing/unpublishing news
   - assigning category
   - assigning tags

6. AI preparation
   Do not implement real AI extraction yet.
   Prepare the data model and admin workflow for future AI-generated drafts.

   Requirements:
   - AI-generated news must be saved as draft.
   - ai_generated boolean indicates whether content came from AI.
   - ai_summary stores generated summary.
   - ai_key_points stores structured key points, preferably JSON.
   - original_pdf_url stores the official PDF source.
   - extracted_text stores raw extracted text when available.
   - Admin must be able to review and edit AI-generated drafts before publishing.

Frontend requirements:

1. Admin layout
   - Create admin area under resources/js/Pages/Admin.
   - Use React + TypeScript + Inertia.js.
   - Use Material UI.
   - Do not create standalone frontend project.
   - Do not use React Router.

2. Admin pages
   Create:

   - Admin/Dashboard
   - Admin/News/Index
   - Admin/News/Create
   - Admin/News/Edit

3. Admin UI features
   - News table with status, category, institution, publication date.
   - Create/edit form with legal fields.
   - Tag selector.
   - Status selector.
   - AI fields section:
     - AI summary
     - AI key points
     - original PDF URL
     - extracted text
   - Visual badge for AI-generated drafts.
   - Public/private status indicators.

4. Navigation
   - Add admin link only for admin users.
   - Normal users must not see admin links.
   - Public users must still access public news pages normally.

Validation requirements:

- Use Form Requests.
- Validate required fields.
- Validate status allowed values.
- Validate URLs.
- Validate dates.
- Validate tags.

Testing requirements:

Create or update tests for:

- Non-admin user cannot access admin routes.
- Admin user can access admin news list.
- Admin user can create news draft.
- Admin user can publish news.
- Public API only returns published news.
- Draft news is hidden from public API.
- News can be assigned tags.
- AI-generated news remains draft by default.

Documentation requirements:

Create or update:

- docs/ADMIN_CMS_REPORT.md
- docs-site/docs/admin/admin-cms.md
- docs-site/docs/admin/legal-news-workflow.md
- docs-site/docs/ai/ai-readiness.md

Document in Spanish:

1. Admin CMS purpose.
2. Admin roles and access.
3. Legal news fields.
4. News statuses.
5. Tagging system.
6. AI-ready fields.
7. Future AI workflow:
   - PDF official source
   - text extraction
   - AI summary
   - AI key points
   - draft news
   - admin review
   - publication
8. Tests added or updated.
9. Build/test results.
10. Pending risks.

Execution:

After implementation:

- Run backend tests.
- Run frontend build.
- Fix errors caused by this implementation.
- Do not introduce unnecessary features.
- Do not replace JWT with Sanctum.
- Do not create a standalone frontend project.

IMPORTANT:
All generated documentation must be written in Spanish.
Code, class names, methods, variables, routes and technical identifiers must remain in English.