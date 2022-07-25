import Script from 'next/script'

const Analytics = ({GA_TRACKING_ID}: any) => (
  <>
    <Script 
      strategy="lazyOnload" 
      src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`} 
    />
    <Script
      id='1'
      strategy="lazyOnload">
      {
        `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${process.env.NEXT_PUBLIC_GA_TRACKING_ID}');
        `
      }
    </Script>
  </>
)

export default Analytics