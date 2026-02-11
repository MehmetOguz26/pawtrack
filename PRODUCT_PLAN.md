# PawTrack Global – Product Direction (V1)

## Confirmed Requirements (from you)

- Audience: both pet owners and veterinarians (global usage).
- Language priority: English first.
- Species scope: cats and dogs.
- Calendar integration: Google Calendar and Microsoft Calendar compatibility is required.
- Data model approach: vaccine entries are created by veterinarian or owner (not by platform-managed schedule defaults).
- Reminder logic: notify at **7 days** and **1 day** before due date.
- Notes: each vaccine record should support custom notes.
- Flexibility: customizable structure/workflow is needed (vet- and owner-driven).
- File upload / vaccine passport synchronization: not required in initial release.
- Privacy preference: no centralized long-term data storage; device-based data with user-owned calendar sync.

---

## Recommended Product Strategy (aligned with your privacy goal)

### 1) Architecture: Local-first + Calendar-sync

Use a **local-first mobile architecture**:

- Store pet/vaccine/reminder data on-device (encrypted local DB).
- Sync reminder events into user calendars (Google / Microsoft) with explicit consent.
- Keep backend minimal (or no backend in V1 if feasible).
- Use OAuth for calendar access to avoid handling password flows directly.

This supports your goal:

- stronger privacy posture,
- reduced liability around centralized health data,
- easier reminder delivery via native calendar ecosystems.

### 2) Identity & security model

Because you want realistic handling for login/security:

- Use Google / Microsoft OAuth (no custom password database in V1).
- Store only access tokens securely on device (Keychain/Keystore).
- Scope permissions only to calendar events needed by app.
- Include clear consent and disconnect/revoke flow.

### 3) Reminder ownership model

App responsibility:

- create/manage events in user calendar,
- apply 7-day and 1-day reminder offsets,
- keep event metadata editable.

User/vet responsibility:

- define vaccine details and due dates,
- update records when dates change.

### 4) Cross-role UX (vet + owner)

V1 practical UX:

- **Owner mode**: manage own pets, add/edit vaccine entries, calendar sync.
- **Vet mode**: faster data entry templates + optional export/share payload.

For V1 without central storage, direct vet-owner shared accounts are complex.
A clean approach is:

- let vet create a schedule on device,
- share via QR / secure link payload,
- owner imports and syncs to personal calendar.

---

## MVP Scope Proposal

### Core Screens

1. Onboarding (language, privacy, calendar consent)
2. Pet list (cats/dogs)
3. Pet profile
4. Vaccine list per pet
5. Vaccine create/edit (date, type, notes, reminder toggle)
6. Calendar sync settings (Google / Microsoft connect + sync status)
7. Upcoming reminders timeline

### Data Objects (local)

- `Pet`: id, name, species, birthDate(optional), notes
- `VaccineRecord`: id, petId, vaccineName, dueDate, appliedDate(optional), notes, createdBy(owner|vet)
- `ReminderPolicy`: recordId, offsets = [7,1], enabled
- `CalendarLink`: provider, accountEmail, externalEventId, syncStatus, lastSyncedAt

---

## Suggested Tech Stack

- Mobile: Flutter or React Native (both support i18n + OAuth + local storage well).
- Local DB: SQLite (encrypted wrapper preferred).
- Auth/OAuth: Google + Microsoft SDK/OAuth2.
- Calendar APIs:
  - Google Calendar API
  - Microsoft Graph Calendar API
- Notifications: rely on calendar-native reminders + optional local notifications fallback.

---

## Open Decisions Needed From You (to finalize technical design)

1. Mobile priority: iOS first, Android first, or both together?
2. Preferred framework: Flutter or React Native?
3. Should app work fully offline and sync later when online?
4. In vet-owner flow, do you prefer QR import, link import, or both?
5. Should users be able to choose custom reminder offsets besides 7 and 1?
6. Do you want multi-language in V1 (EN + TR), or EN-only first?
7. Any regulatory target markets in first launch (EU/US/UK/etc.)?

---

## Next Step

If you answer the 7 open decisions above, I can generate:

- exact MVP feature list (week-by-week),
- screen-by-screen UX flow,
- local database schema,
- calendar sync logic and edge-case rules,
- V1→V2 roadmap.
