import { useEffect, useRef } from 'react';

export function Comments() {
  const commentBox = useRef<HTMLDivElement>();

  useEffect(() => {
    const scriptElement = document.createElement('script');

    scriptElement.setAttribute('src', 'https://utteranc.es/client.js');
    scriptElement.setAttribute('crossorigin', 'anonymous');
    scriptElement.setAttribute('async', 'true');
    scriptElement.setAttribute('repo', 'JFMacedo/ignite-challenge-05');
    scriptElement.setAttribute('issue-term', 'pathname');
    scriptElement.setAttribute('theme', 'photon-dark');

    commentBox.current.appendChild(scriptElement);
  }, []);

  return <div ref={commentBox} id="comments" />;
}