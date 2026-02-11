# PawTrack Mobile (Initial Implementation)

This repository now contains a first implementation scaffold for the PawTrack mobile app aligned with the approved V1 direction:

- local-first data model foundation for pets and vaccine records,
- customizable reminder policy with default `7` and `1` day offsets,
- English-first i18n structure (with Turkish included as secondary dictionary),
- starter home screen for pets, upcoming reminders, and calendar sync actions.

## Run

```bash
npm install
npm run start
```

## Test

```bash
npm test
```

## Current Scope

This is a foundation phase. Calendar OAuth and API sync integration (Google/Microsoft), persistence adapters, and full CRUD forms will be added iteratively in next steps.
