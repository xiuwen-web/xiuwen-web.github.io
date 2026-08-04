# Mobile Launch Analytics Evidence — Design and Implementation Brief

## Objective

Add a polished analytics evidence section to the **Mobile Product Launch** case study.

The section should use the four provided screenshots as supporting evidence, but it must be redesigned to match the current **Systems Blueprint** portfolio design system rather than displaying four large raw dashboard screenshots.

The goal is to show:

- The apps were successfully launched
- The student app achieved meaningful adoption
- The teacher app reached a smaller, role-specific audience
- Apple and Google report different metrics
- The evidence is presented accurately without combining incompatible figures

Do not present the screenshots as decorative images. Use them as supporting product evidence.

---

# 1. Placement

Add this section to:

```text
Mobile Product Launch
→ Outcomes
```

Recommended section title:

```text
Post-launch adoption
```

Alternative:

```text
Launch evidence
```

Recommended title:

```text
Post-launch adoption
```

---

# 2. Introductory Copy

Use:

```text
The launch created four app-store listings: student and teacher apps across iOS and Android. Post-launch analytics provided evidence that both products reached their intended users, although Apple and Google report different metrics.
```

Add this note immediately below:

```text
The figures are shown separately because downloads, installed audience and product-page views are not directly comparable.
```

Style the note as a small muted information label, not a full paragraph.

---

# 3. Metrics to Display

Use these figures exactly as shown in the screenshots.

## Student App

```text
iOS
2.03K total downloads
13 Dec 2025 to 2 Aug 2026
```

```text
Android
1,080 installed users
As of 29 Jul 2026
```

## Teacher App

```text
Android
51 installed users
As of 29 Jul 2026
```

```text
iOS
159 product-page views
Mar to 1 Aug 2026
```

Do not add these figures together.

Do not convert them into one combined adoption total.

Do not describe product-page views as downloads.

---

# 4. Recommended Portfolio Copy

Use this concise summary:

```text
The student app recorded 2.03K iOS downloads and an Android installed audience of 1,080 users by late July 2026. The teacher app served a smaller, role-specific audience, with 51 Android installed users and 159 iOS product-page views.

Because Apple and Google report different measures, I present each figure separately rather than combining them into one adoption total.
```

---

# 5. Design Direction

The section must match the existing Systems Blueprint design system.

Use:

- Deep navy text
- Cool off-white page background
- White evidence cards
- Teal accents for shipped and validated states
- Muted blue-grey secondary text
- Thin borders
- Minimal shadows
- Small monospaced labels
- Rounded corners consistent with existing cards
- Grid-based layout
- Clear spacing
- No colourful infographic styling

Avoid:

- Apple or Google brand-colour backgrounds
- Large raw screenshots occupying the full viewport
- Heavy drop shadows
- Oversized logos
- Bright gradients
- Combining unrelated metrics
- Dashboard-style clutter

---

# 6. Recommended Layout

## Desktop

Use a two-part section.

### Part A — Metric Summary

Create a 2 × 2 grid of evidence cards:

```text
STUDENT APP

┌──────────────────────────┐
│ IOS                      │
│ 2.03K                    │
│ Total downloads          │
│ Dec 2025 – Aug 2026      │
└──────────────────────────┘

┌──────────────────────────┐
│ ANDROID                  │
│ 1,080                    │
│ Installed users          │
│ As of 29 Jul 2026        │
└──────────────────────────┘


TEACHER APP

┌──────────────────────────┐
│ ANDROID                  │
│ 51                       │
│ Installed users          │
│ As of 29 Jul 2026        │
└──────────────────────────┘

┌──────────────────────────┐
│ IOS                      │
│ 159                      │
│ Product-page views       │
│ Mar – Aug 2026           │
└──────────────────────────┘
```

Each card should include:

- Platform label
- Primary metric
- Metric type
- Date range
- Small source label

Example source label:

```text
Source: App Store Connect
```

or:

```text
Source: Google Play Console
```

---

### Part B — Evidence Gallery

Below the metric cards, add a compact gallery of the four screenshots.

Use:

- Cropped screenshots
- Consistent aspect ratio
- Thin border
- Small caption
- Click-to-expand lightbox
- Avoid showing the screenshots full-size by default

Recommended gallery:

```text
Student iOS
Student Android
Teacher iOS
Teacher Android
```

Each caption should state the metric visible in the screenshot.

Example:

```text
Student iOS — 2.03K total downloads
```

---

# 7. Suggested Card Content

## Student iOS Card

```text
STUDENT APP · IOS

2.03K

Total downloads

13 Dec 2025 – 2 Aug 2026

Source: App Store Connect
```

## Student Android Card

```text
STUDENT APP · ANDROID

1,080

Installed users

As of 29 Jul 2026

Source: Google Play Console
```

## Teacher Android Card

```text
TEACHER APP · ANDROID

51

Installed users

As of 29 Jul 2026

Source: Google Play Console
```

## Teacher iOS Card

```text
TEACHER APP · IOS

159

Product-page views

Mar – 1 Aug 2026

Source: App Store Connect
```

---

# 8. Visual Hierarchy

Each card should follow this hierarchy:

```text
Small monospaced platform label
Large metric number
Medium metric description
Small muted date
Small source tag
```

Recommended styling:

```text
Platform label:
12px to 13px
uppercase
monospaced
muted teal

Metric number:
36px to 48px
bold
deep navy

Metric description:
16px to 18px
medium weight

Date and source:
12px to 14px
muted blue-grey
```

---

# 9. Status Language

Add one restrained status badge above the section:

```text
POST-LAUNCH EVIDENCE
```

Use:

- Teal text
- Pale teal background
- Small rounded badge
- Monospaced uppercase label

Do not use promotional wording such as:

```text
Massive success
Huge traction
Explosive growth
```

Keep the tone factual.

---

# 10. Screenshot Treatment

Before displaying the screenshots publicly:

1. Crop out unnecessary navigation and blank space.
2. Remove or blur the personal account name shown in the top-right corner.
3. Remove any personal or sensitive account identifiers.
4. Preserve the app name and relevant metric.
5. Preserve the chart and date range.
6. Keep the platform interface recognisable.
7. Do not alter or fabricate the numbers.

Recommended crop focus:

```text
App name
Metric type
Metric value
Date range
Chart
```

---

# 11. Insight Callout

Add one concise callout below the evidence cards:

```text
The student app shows broader adoption, while the teacher app serves a smaller operational user group. The difference is expected because the two products were built for different audiences.
```

Style this as:

- Pale blue-grey panel
- Thin left teal border
- No large icon
- Maximum two lines on desktop

---

# 12. Reflection

Add this short reflection:

```text
This was the first release where I could connect product delivery with post-launch platform evidence. It reinforced the importance of defining measurement before launch, so that future releases can be evaluated using consistent adoption and engagement metrics.
```

This should sit under:

```text
Measurement
```

or at the end of:

```text
Post-launch adoption
```

---

# 13. Responsive Behaviour

## Desktop

- 2 × 2 metric grid
- Four-image evidence gallery
- Screenshots open in a lightbox
- Main content remains within the case-study content width

## Tablet

- Two cards per row
- Two screenshots per row
- Reduce card padding slightly

## Mobile

- One card per row
- One screenshot per row
- No horizontal scrolling
- Maintain readable metric sizes
- Lightbox must fit the viewport
- Captions must wrap correctly

---

# 14. Accessibility

Ensure:

- Screenshots have descriptive alt text
- Metrics are available as real HTML text, not embedded only in images
- Cards use semantic headings
- Colour is not the only way to distinguish student and teacher apps
- Focus states are visible
- Lightbox is keyboard accessible
- Escape closes the lightbox
- Captions remain readable at 200% zoom

Suggested alt text:

```text
App Store Connect analytics showing 2.03K total downloads for the AGrader student iOS app.
```

```text
Google Play Console analytics showing an installed audience of 1,080 users for the AGrader student Android app.
```

```text
Google Play Console analytics showing an installed audience of 51 users for the AGrader Teacher Android app.
```

```text
App Store Connect analytics showing 159 product-page views for the AGrader Teacher iOS app.
```

---

# 15. Suggested Reusable Components

Build this using reusable components:

```text
AnalyticsEvidenceSection
MetricCard
EvidenceGallery
EvidenceImage
MetricSourceTag
InsightCallout
Lightbox
```

Suggested data model:

```javascript
const analyticsEvidence = [
  {
    product: "Student App",
    platform: "iOS",
    value: "2.03K",
    metric: "Total downloads",
    period: "13 Dec 2025 – 2 Aug 2026",
    source: "App Store Connect",
    image: "/images/mobile-launch/student-ios-analytics.png"
  },
  {
    product: "Student App",
    platform: "Android",
    value: "1,080",
    metric: "Installed users",
    period: "As of 29 Jul 2026",
    source: "Google Play Console",
    image: "/images/mobile-launch/student-android-analytics.png"
  },
  {
    product: "Teacher App",
    platform: "Android",
    value: "51",
    metric: "Installed users",
    period: "As of 29 Jul 2026",
    source: "Google Play Console",
    image: "/images/mobile-launch/teacher-android-analytics.png"
  },
  {
    product: "Teacher App",
    platform: "iOS",
    value: "159",
    metric: "Product-page views",
    period: "Mar – 1 Aug 2026",
    source: "App Store Connect",
    image: "/images/mobile-launch/teacher-ios-analytics.png"
  }
];
```

---

# 16. Final Section Structure

Use this exact order:

```text
Post-launch adoption

Introductory copy

Metric cards

Metric comparison note

Evidence gallery

Insight callout

Reflection
```

---

# 17. Final Checks

Before completing the implementation, verify:

1. The four metrics match the screenshots exactly.
2. No incompatible figures are added together.
3. Product-page views are not described as downloads.
4. Personal account details are removed or blurred.
5. Screenshots are cropped consistently.
6. The section matches the Systems Blueprint design.
7. The section works on desktop, tablet and mobile.
8. No image causes horizontal scrolling.
9. All screenshots have accurate alt text.
10. The lightbox is accessible.
11. Metrics remain visible even if images fail to load.
12. Existing Mobile Product Launch content is preserved.
13. The new evidence section does not make the page excessively long.
14. The section is placed under Outcomes or Measurement.
15. The tone remains factual and credible.

---

# Final Instruction for Claude

Please add a new **Post-launch adoption** section to the Mobile Product Launch case study using this document.

Use the four analytics screenshots as supporting evidence, but redesign the presentation using the current Systems Blueprint design system.

Do not display the four screenshots as large raw dashboard images.

Build:

1. A 2 × 2 metric-card grid
2. A compact screenshot evidence gallery
3. A metric-comparison note
4. An insight callout
5. A short measurement reflection
6. Responsive and accessible behaviour

Preserve the original metrics exactly and do not combine incompatible figures.
