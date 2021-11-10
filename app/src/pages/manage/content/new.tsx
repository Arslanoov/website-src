import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
import Editor from '@/ui/components/editor/Editor';

const NewContentItem: NextPage = () => {
  const Editor = dynamic(() => import('@/ui/components/editor/Editor'), {
    ssr: false
  });
  console.log(Editor);

  return (
    <Editor />
  );
};

export default NewContentItem;