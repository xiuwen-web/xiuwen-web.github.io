import type { AnalyticsEvidence } from '@/types/content';

/**
 * Post-launch store analytics for the two mobile apps
 * (MOBILE_LAUNCH_ANALYTICS_EVIDENCE_DESIGN_BRIEF.md, 2026-08-04).
 *
 * THE RULE THIS FILE EXISTS TO ENFORCE: these four figures are in three
 * different units. Total downloads counts installs over a period. Installed
 * audience counts devices holding the app on one day. Product-page views
 * counts listing visits, which are not installs at all.
 *
 * So they are never added, never averaged, and never rolled into a single
 * adoption number — and no figure is ever described as a download unless the
 * console called it one. Each card prints its own unit and its own date basis
 * next to the value, because a number without them invites exactly the
 * arithmetic the brief forbids.
 *
 * Values are transcribed from the consoles as displayed, including Apple's
 * "2.03K" rounding. The screenshots are cropped, never retouched — the account
 * name was removed by cropping the navigation band away, not by blurring.
 */
export const mobileAnalytics: AnalyticsEvidence[] = [
  {
    product: 'Student app',
    platform: 'iOS',
    value: '2.03K',
    metric: 'Total downloads',
    period: '13 Dec 2025 – 2 Aug 2026',
    source: 'App Store Connect',
    image: {
      src: '/images/mobile-launch/student-ios-analytics.webp',
      alt: 'App Store Connect analytics showing 2.03K total downloads for the AGrader student iOS app, over 13 December 2025 to 2 August 2026.',
      caption: 'Student iOS — 2.03K total downloads',
      width: 1400,
      height: 560,
    },
  },
  {
    product: 'Student app',
    platform: 'Android',
    value: '1,080',
    metric: 'Installed users',
    period: 'As of 29 Jul 2026',
    source: 'Google Play Console',
    image: {
      src: '/images/mobile-launch/student-android-analytics.webp',
      alt: 'Google Play Console statistics showing an installed audience of 1,080 users for the AGrader student Android app on 29 July 2026.',
      caption: 'Student Android — 1,080 installed users',
      width: 1400,
      height: 560,
    },
  },
  {
    product: 'Teacher app',
    platform: 'Android',
    value: '51',
    metric: 'Installed users',
    period: 'As of 29 Jul 2026',
    source: 'Google Play Console',
    image: {
      src: '/images/mobile-launch/teacher-android-analytics.webp',
      alt: 'Google Play Console statistics showing an installed audience of 51 users for the AGrader Teacher Android app on 29 July 2026.',
      caption: 'Teacher Android — 51 installed users',
      width: 1400,
      height: 560,
    },
  },
  {
    product: 'Teacher app',
    platform: 'iOS',
    value: '159',
    metric: 'Product-page views',
    period: '2 Mar – 1 Aug 2026',
    source: 'App Store Connect',
    image: {
      src: '/images/mobile-launch/teacher-ios-analytics.webp',
      alt: 'App Store Connect analytics showing 159 product-page views for the AGrader Teacher iOS app, over 2 March to 1 August 2026.',
      caption: 'Teacher iOS — 159 product-page views',
      width: 1400,
      height: 560,
    },
  },
];

export const analyticsIntro =
  'The launch created four app-store listings: student and teacher apps across iOS and Android. Post-launch analytics give evidence that both products reached their intended users, although Apple and Google report different metrics.';

export const analyticsNote =
  'Shown separately: downloads, installed audience and product-page views are not directly comparable.';

export const analyticsSummary =
  'The student app recorded 2.03K iOS downloads and an Android installed audience of 1,080 users by late July 2026. The teacher app served a smaller, role-specific audience, with 51 Android installed users and 159 iOS product-page views.';

export const analyticsInsight =
  'The student app shows broader adoption; the teacher app serves a smaller operational group. The difference is expected — the two products were built for different audiences.';

export const analyticsReflection =
  'This was the first release where I could connect product delivery to post-launch platform evidence. It is also where the limit of that evidence is clearest: the stores tell me an app was acquired, not what anyone did next. Defining the measures before a release, rather than reading whatever the platform happens to report afterwards, is what would let the next one be judged on consistent adoption and engagement figures.';
