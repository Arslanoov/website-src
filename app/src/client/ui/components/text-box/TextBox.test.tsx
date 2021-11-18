import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import TextBox from './TextBox.component';

describe('TextBox', () => {
  test('rendering', () => {
    const content = 'Some content';

    // const { container } =
    render(<TextBox content={content} />);

    expect(screen.getByText(content)).toBeInTheDocument();
  });
});