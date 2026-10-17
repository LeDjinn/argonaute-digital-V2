import Script from "next/script";

// Public GA4 measurement ID supplied by the site owner (not a credential).
export default function GoogleAnalytics() {
  if (process.env.NODE_ENV !== "production") return null;

  return (
    <>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-ZEDXENKBV4"
        strategy="afterInteractive"
      />
      <Script id="argonaute-google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-ZEDXENKBV4');
        `}
      </Script>
    </>
  );
}
