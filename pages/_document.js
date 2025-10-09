import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
     <Head>
  <style dangerouslySetInnerHTML={{
    __html: `
     
      nav[style*="z-index"] {
        z-index: 99999 !important;
        position: fixed !important;
        top: 0 !important;
      }
      
    
      .bg-\\[url\\(\\'\\/Image\\/construction\\.jpg\\'\\)\\] {
        z-index: 1 !important;
      }
      
    
      .bg-yellow-600 {
        z-index: 1 !important;
      }
      
      /* Main content positioning */
      main {
        position: relative;
        z-index: 1;
      }
    `
  }} />
</Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
