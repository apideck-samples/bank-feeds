'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

// App-router variant of the Apideck website HubSpot tracker. Loads the HubSpot
// script and reports page views on client navigations via usePathname. Defaults
// match the marketing site (EU data residency); override with NEXT_PUBLIC_HUBSPOT_ID
// or leave unset to disable.

const DEFAULT_HUBSPOT_REGION = 'eu1'
const DEFAULT_HUBSPOT_ID = '144566223'

export default function HubspotTracking(): null {
  const pathname = usePathname()

  const hsId = process.env.NEXT_PUBLIC_HUBSPOT_ID || DEFAULT_HUBSPOT_ID
  const hsRegion = process.env.NEXT_PUBLIC_HUBSPOT_REGION || DEFAULT_HUBSPOT_REGION

  useEffect(() => {
    if (!hsId) return
    const endpoint = hsRegion === 'eu1' ? 'js-eu1.hs-scripts.com' : 'js.hs-scripts.com'

    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.id = 'hs-script-loader'
    script.async = true
    script.defer = true
    script.src = `//${endpoint}/${hsId}.js`
    document.body.appendChild(script)

    return () => {
      document.getElementById('hs-script-loader')?.remove()
    }
  }, [hsId, hsRegion])

  useEffect(() => {
    if (typeof window === 'undefined') return
    const w = window as any
    if (w._hsq === undefined) w._hsq = []
    w._hsq.push(['setPath', pathname])
    w._hsq.push(['trackPageView'])
  }, [pathname])

  return null
}
