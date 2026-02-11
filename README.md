# PawTrack Mobile (Implementation Progress)

This repository contains an incremental implementation of PawTrack aligned with the V1 direction.

## Implemented so far

- local-first domain models for pets, vaccine records, and reminder policies,
- reminder scheduling with default `7` and `1` day offsets,
- English-first i18n setup (with Turkish dictionary),
- starter home screen for pets, reminders, and calendar sync CTA buttons,
- application service layer for vaccine upsert and upcoming reminder listing,
- in-memory repositories to keep flow stable before SQLite integration,
- calendar payload builders for Google/Microsoft provider shapes,
- lightweight schedule share encode/decode utility for vet-owner transfer via QR/link payloads.

## Run

```bash
npm install
npm run start
```

## Test

```bash
npm test
```

## Next incremental step

- Replace in-memory repositories with encrypted SQLite persistence.
- Add vaccine CRUD forms and note editing from UI.
- Wire OAuth + calendar write sync for Google and Microsoft accounts.
