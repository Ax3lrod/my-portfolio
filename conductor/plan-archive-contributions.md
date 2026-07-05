# Implementation Plan: Archive Restructure & Contributions Update

## 1. Objective
Update the portfolio's archive to exclusively showcase the 9 items detailed in `public/CONTRIBUTIONS.md`. The archive will be divided into "Experiences" and "Projects," and the detail pages will be enhanced to display specific contributions with text descriptions placed below image placeholders.

## 2. Scope & Impact
*   **Data Layer:** `src/const/projectArchive.ts` will be completely overhauled. Unwanted projects will be removed. Existing projects will be updated, and new entries from `CONTRIBUTIONS.md` will be added. The schema will introduce `type` ("experience" | "project") and `contributions` (an array of `{ title, description, image }`).
*   **Archive Page:** The main `/archive` view will change from a single horizontal grid to two stacked horizontal grids (one for Experiences, one for Projects).
*   **Detail Page:** The project detail view (`/archive/projects/[slug]`) will append a new section detailing the user's specific contributions, featuring a styled placeholder box above each contribution's description.
*   **Home Page Catalog:** The `ProjectCatalog` component will be verified to ensure it still functions correctly with the updated data structure and `SELECTED_SLUGS`.

## 3. Proposed Solution
### Step 1: Update Data Structure
Replace the contents of `src/const/projectArchive.ts`.
*   Create an `ArchiveEntry` type with the new fields: `type` and `contributions`.
*   Map the 9 items from `CONTRIBUTIONS.md`:
    *   **Experiences:** SRE ITS, ARA 6.0, ILITS 2025, Petrolida 2025, BEM ITS.
    *   **Projects:** Sustainamap, Virtual Try-On E-Commerce, Big Data Final Project, GENICS 2.0.
*   Extract the bolded text from the markdown as the contribution `title`, and the subsequent text as the `description`. Set the `image` field to an empty string `""` initially.
*   Ensure `SELECTED_SLUGS` in `src/sections/ProjectCatalog.tsx` aligns with the updated slugs.

### Step 2: Refactor Archive Grid Layout
Modify the `/archive` page to support two grids.
*   Refactor `src/app/archive/components/ArchiveGrid.tsx` to act as a reusable single-grid component that accepts `title` (e.g., "EXPERIENCES", "PROJECTS") and `items` (filtered array of `ArchiveEntry`) as props.
*   Update `src/app/archive/page.tsx` to render two instances of `ArchiveGrid`, stacked vertically. Ensure the vertical scrolling behavior allows the user to easily reach the second grid before horizontal scrolling takes over.

### Step 3: Enhance Detail Page
Update `src/app/archive/projects/[slug]/components/ProjectDetail.tsx`.
*   Below the main "About the Project" description, add a new section (e.g., "Key Contributions & Details").
*   Iterate over the `project.contributions` array.
*   For each contribution, render:
    *   An image placeholder: A sleek, dark-themed styled `div` (e.g., `bg-neutral-900 border border-neutral-800`) with a centered icon or "Image Placeholder" text. This will be replaced with an `<Image />` component if the `image` string is populated in the future.
    *   The text block: The contribution `title` (bold) followed by the `description` below the placeholder.

## 4. Alternatives Considered
*   **Toggle Button for Archive:** We considered a toggle button to switch between Experiences and Projects, but opted for two stacked grids as requested by the user to provide a more comprehensive overview at a glance.
*   **Alternating Image Layout:** We considered alternating images left and right on the detail page, but chose an "Image Above Text" layout per the user's preference for a cleaner, more vertical flow.

## 5. Verification
*   Verify that only the 9 items from `CONTRIBUTIONS.md` exist in the data and are displayed on the site.
*   Test horizontal scrolling on both the "Experiences" and "Projects" grids on the `/archive` page.
*   Navigate to a detail page and confirm the new "Key Contributions" section renders correctly with the styled placeholder boxes positioned above the text.
*   Check the Home page's `ProjectCatalog` to ensure it still displays the selected preview items without errors.