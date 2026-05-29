'use client'

import Script from 'next/script'
import { useState, useEffect } from 'react'
import type { CookieConsent } from './CookieConsentBanner'

interface Props {
  ga4Id?: string
  clarityId?: string
  fbPixelId?: string
  linkedinId?: string
  gadsId?: string
  gscTag?: string
}

export function ScriptInjector({ ga4Id, clarityId, fbPixelId, linkedinId, gadsId, gscTag }: Props) {
  const [consent, setConsent] = useState<CookieConsent | null>(null)

  useEffect(() => {
    const stored = localStorage.getItem('cookie-consent')
    if (stored) {
      try { setConsent(JSON.parse(stored) as CookieConsent) } catch { /* ignore malformed */ }
    }
    const handler = (e: Event) => {
      setConsent((e as CustomEvent<CookieConsent>).detail)
    }
    window.addEventListener('cookie-consent-update', handler)
    return () => window.removeEventListener('cookie-consent-update', handler)
  }, [])

  return (
    <>
      {/* GSC verification — no personal data, no consent required */}
      {gscTag && (
        <Script id="gsc-verify" strategy="afterInteractive">
          {`/* GSC: ${gscTag} */`}
        </Script>
      )}

      {/* GA4 — analytics consent required */}
      {consent?.analytics && ga4Id && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${ga4Id}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${ga4Id}',{anonymize_ip:true});`}
          </Script>
        </>
      )}

      {/* Microsoft Clarity — analytics consent required */}
      {consent?.analytics && clarityId && (
        <Script id="clarity-init" strategy="afterInteractive">
          {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${clarityId}");`}
        </Script>
      )}

      {/* Facebook Pixel — marketing consent required */}
      {consent?.marketing && fbPixelId && (
        <Script id="fb-pixel-init" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${fbPixelId}');fbq('track','PageView');`}
        </Script>
      )}

      {/* LinkedIn Insight Tag — marketing consent required */}
      {consent?.marketing && linkedinId && (
        <Script id="linkedin-init" strategy="afterInteractive">
          {`_linkedin_partner_id="${linkedinId}";window._linkedin_data_partner_ids=window._linkedin_data_partner_ids||[];window._linkedin_data_partner_ids.push(_linkedin_partner_id);(function(l){if(!l){window.lintrk=function(a,b){window.lintrk.q.push([a,b])};window.lintrk.q=[]}var s=document.getElementsByTagName("script")[0];var b=document.createElement("script");b.type="text/javascript";b.async=!0;b.src="https://snap.licdn.com/li.lms-analytics/insight.min.js";s.parentNode.insertBefore(b,s)})(window.lintrk);`}
        </Script>
      )}

      {/* Google Ads — marketing consent required */}
      {consent?.marketing && gadsId && (
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${gadsId}`}
          strategy="afterInteractive"
          id="gads-script"
        />
      )}
    </>
  )
}
