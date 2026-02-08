# Translation Fixes - February 8, 2026

## Issues Fixed

### Issue 1: ✅ leClub.diplomas Key Conflict

**Problem:**
- Error: `INSUFFICIENT_PATH: Message at leClub.diplomas resolved to object, but only strings are supported`
- The page showed "leClub.diplomas" instead of "Nos Diplômes et Certifications"

**Root Cause:**
- Duplicate key `"diplomas"` in the JSON file:
  1. Line 147: `"diplomas": "Nos Diplômes et Certifications"` (string)
  2. Line 199: `"diplomas": { ... }` (object with bpjepsBB, bpjepsCM, etc.)
- JSON doesn't allow duplicate keys, so the second one (object) overwrote the first one (string)

**Solution:**
- Renamed the first key from `"diplomas"` to `"diplomasTitle"`
- Updated both `messages/fr.json` and `messages/en.json`
- Updated `app/[locale]/le-club/page.tsx` to use `t('diplomasTitle')` instead of `t('diplomas')`

**Files Modified:**
- `messages/fr.json` - Changed `"diplomas"` to `"diplomasTitle"`
- `messages/en.json` - Changed `"diplomas"` to `"diplomasTitle"`
- `app/[locale]/le-club/page.tsx` - Updated to use `t('diplomasTitle')`

---

### Issue 2: ✅ Cours Page - PricingAndDocuments Component Not Translated

**Problem:**
- The text below the calendar (pricing and license information) was all in French
- Component had hardcoded French text

**Solution:**
- Added translation keys to both `messages/fr.json` and `messages/en.json`:
  - `cours.pricing.title` - "Nos tarifs et inscription" / "Our Rates and Registration"
  - `cours.pricing.viewRates` - "Voir nos tarifs en PDF" / "View our rates in PDF"
  - `cours.pricing.viewMembership` - "Voir notre fiche d'adhésion en PDF" / "View our membership form in PDF"
  - `cours.license.title` - "Licence et attestations médicales" / "License and Medical Certificates"
  - `cours.license.questionnairesTitle` - "Documents d'auto-questionnaire" / "Self-Assessment Documents"
  - `cours.license.viewAdults` - FFE questionnaire for adults
  - `cours.license.viewMinors` - FFE questionnaire for minors
  - `cours.license.medicalTitle` - "Exigences médicales" / "Medical Requirements"
  - `cours.license.medicalIntro` - Medical requirements intro text
  - `cours.license.minors` - "Mineurs :" / "Minors:"
  - `cours.license.minorsText` - Requirements for minors
  - `cours.license.adultsUnder40` - "Majeurs de moins de 40 ans :" / "Adults under 40 years:"
  - `cours.license.adultsUnder40First` - First application requirements
  - `cours.license.adultsUnder40Renewal` - Renewal requirements
  - `cours.license.adults40Plus` - "Majeurs de 40 ans et plus :" / "Adults 40 years and over:"
  - `cours.license.adults40PlusFirst` - First application requirements
  - `cours.license.adults40PlusBetween` - Between certificates requirements
  - `cours.license.source` - "Source :" / "Source:"
  - `cours.license.ffeLink` - FFE link text

- Updated `components/PricingAndDocuments.tsx`:
  - Added `'use client'` directive
  - Imported `useTranslations` from next-intl
  - Replaced all hardcoded French text with `t()` calls
  - Component now fully supports both French and English

**Files Modified:**
- `messages/fr.json` - Added 18 new translation keys under `cours.pricing` and `cours.license`
- `messages/en.json` - Added 18 new translation keys under `cours.pricing` and `cours.license`
- `components/PricingAndDocuments.tsx` - Converted to use translations

---

## Testing

### Build Status
```bash
npm run build
# ✅ Build successful
# ✅ No TypeScript errors
# ✅ All pages compile
# ✅ Static generation working for both locales
```

### Manual Testing Checklist

**Le Club Page:**
- [ ] Visit `/fr/le-club` - Should show "Nos Diplômes et Certifications"
- [ ] Visit `/en/le-club` - Should show "Our Diplomas and Certifications"
- [ ] No error messages about `INSUFFICIENT_PATH`
- [ ] No "leClub.diplomas" text visible

**Cours Page:**
- [ ] Visit `/fr/cours` - All text below calendar in French
- [ ] Visit `/en/cours` - All text below calendar in English
- [ ] Pricing section translated
- [ ] License section translated
- [ ] Medical requirements list translated
- [ ] FFE link text translated

---

## Summary

✅ **Both issues completely fixed:**

1. **leClub.diplomas conflict** - Resolved by renaming to `diplomasTitle`
2. **PricingAndDocuments translation** - Added 18 translation keys and updated component

**Total Translation Keys Added:** 18 new keys  
**Components Updated:** 2 (le-club page, PricingAndDocuments)  
**Build Status:** ✅ Successful  
**Ready for Testing:** ✅ Yes

---

## Commits

1. `e84e94b` - test: verify leClub translations exist in both languages
2. `06fbc9a` - fix: resolve leClub diplomas key conflict and translate PricingAndDocuments component
3. `2ed0719` - chore: remove test file

---

*Generated: February 8, 2026*
