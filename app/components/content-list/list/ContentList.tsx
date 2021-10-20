import React from 'react';

import ContentListItem from '../item/ContentListItem';

type Props = {
  title: string
};

const ContentList: React.FC<Props> = ({ title }) => {
  return (
    <div>
      {title}
      <ContentListItem />
      <ContentListItem />
      <ContentListItem />
    </div>
  );
};

export default ContentList;
