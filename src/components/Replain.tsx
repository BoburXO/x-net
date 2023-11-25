import { useEffect } from 'react';
import Head from 'next/head';

const ReplainChat = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://widget.replain.cc/dist/client.js';

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <Head>
      <script
        dangerouslySetInnerHTML={{
          __html: `window.replainSettings = { id: 'c9f50649-2760-467d-9fb9-73ea363e041c' }`,
        }}
      />
    </Head>
  );
};

export default ReplainChat;
