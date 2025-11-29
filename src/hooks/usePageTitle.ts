import { useEffect } from 'react';

const usePageTitle = (title: string) => {
  useEffect(() => {
    const [$title] = document.getElementsByTagName('title');
    if ($title) {
      $title.innerText = title;
    }
  }, [title]);
};

export default usePageTitle;
