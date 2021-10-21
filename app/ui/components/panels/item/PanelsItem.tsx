import React from 'react';

type Props = {
  label: string
  selected: string
  options: { [key: string ]: string | number }
};

const PanelsItem: React.FC<Props> = ({ label, selected, options }) => {
  return (
    <div>
      {label} - {options[selected]}
      <div>
        Toggle
      </div>
    </div>
  );
};

export default PanelsItem;
