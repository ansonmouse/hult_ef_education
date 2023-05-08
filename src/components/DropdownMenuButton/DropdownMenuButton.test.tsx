import React from 'react';
import { act, render, screen } from '@testing-library/react';
import DropdownMenuButton from './DropdownMenuButton';
import userEvent from '@testing-library/user-event';

const MockButtonContent = 'toggleButton';
const MockItems = [
  {
    text: 'Option 1',
    value: 'option1',
  },
  {
    text: 'Option 2',
    value: 'option2',
  },
];
const MockSelected = 'option1';

jest.mock('react', () => {
  const originReact = jest.requireActual('react');
  const mUseRef = jest.fn();
  return {
    ...originReact,
    useRef: mUseRef,
  };
});

describe(DropdownMenuButton, () => {
  describe('test the display content', () => {
    beforeEach(() => {
      render(
        <DropdownMenuButton
          buttonContent={MockButtonContent}
          items={MockItems}
          selected={MockSelected}
          onChange={() => {}}
        />,
      );
    });

    it('should have correct toggle button content', () => {
      const element = screen.getByTestId('toggle-button');
      expect(element.textContent).toBe(MockButtonContent);
    });

    it('should have correct amount of options', () => {
      const elements = screen.queryAllByTestId(/option_.*/i);
      expect(elements).toHaveLength(MockItems.length);
    });

    it('should have the correct selected option', () => {
      const element = screen.getByTestId('option_option1');
      expect(element.className).toBe('selected');
    });
  });

  it('option should be fired when click', async () => {
    let result = '';
    render(
      <DropdownMenuButton
        buttonContent={MockButtonContent}
        items={MockItems}
        selected={MockSelected}
        onChange={(value) => (result = value)}
      />,
    );
    const optionButton = screen.getByTestId('option_option2');
    // console.log(optionButton);
    await act(async () => userEvent.click(optionButton));
    expect(result).toBe('option2');
  });
});
