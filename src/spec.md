# Specification

## Summary
**Goal:** Build a scheduler-style flow where users select a groomer and then view only that groomer’s services, backed by real data and presented with a modern pet-care themed UI.

**Planned changes:**
- Add a dedicated groomer selection step with clear selection controls.
- Add a services list step that updates based on the currently selected groomer, including a clear selected-groomer indicator and a way to change groomers.
- Implement backend APIs and seed data to (1) list groomers and (2) list services for a given groomer identifier (single Motoko actor).
- Connect the UI to backend APIs via React Query with loading, error, and retry states for both groomers and services.
- Apply a consistent, responsive visual theme across steps with a non-blue/non-purple primary color.

**User-visible outcome:** Users can open the scheduler page, choose a groomer, see that groomer’s services, and switch to a different groomer, with responsive layout and clear loading/error feedback.
