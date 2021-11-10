import React from 'react';
import dynamic from 'next/dynamic';

const ClientOnly = props => (
  <React.Fragment>{props.children}</React.Fragment>
);

export default dynamic(() => Promise.resolve(ClientOnly), {
  ssr: false
});