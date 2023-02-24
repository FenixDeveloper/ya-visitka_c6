import { useEffect } from 'react';

const useScript = (url: string, type: string) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = url;
    script.async = true;
    script.type = type;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, [url, type]);
};

export default useScript;
