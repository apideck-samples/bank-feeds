'use client'

import { PropsWithChildren } from 'react'
import HubspotTracking from './HubspotTracking'
import PostHogTracking from './PostHogTracking'

// Client-side analytics entry point for app-router sample apps. Mount inside the
// root layout's <body>, wrapping the app. PostHog self-initializes only when
// NEXT_PUBLIC_POSTHOG_KEY is set; HubSpot defaults to the Apideck portal (blank
// NEXT_PUBLIC_HUBSPOT_ID to disable). Config mirrors the Apideck website so
// events land in the same PostHog project / HubSpot portal.

const isPostHogEnabled = Boolean(process.env.NEXT_PUBLIC_POSTHOG_KEY)

interface AnalyticsProviderProps {
  source?: string
}

export default function AnalyticsProvider({
  source = 'sample',
  children
}: PropsWithChildren<AnalyticsProviderProps>) {
  return (
    <>
      {children}
      <HubspotTracking />
      {isPostHogEnabled && <PostHogTracking source={source} />}
    </>
  )
}
