import React from 'react';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CheckboxFilter from './CheckboxFilter';

const MockLabel = 'label1';
const MockOptionTranslationPrefix = '';
const MockOptions = ['option1', 'option2', 'option3'];
const MockSelected = ['option1'];

describe(CheckboxFilter, () => {
  describe('test display content', () => {
    beforeEach(async () => {
      render(
        <CheckboxFilter
          label={MockLabel}
          optionTranslationPrefix={MockOptionTranslationPrefix}
          options={MockOptions}
          selected={MockSelected}
          onSelect={() => {}}
        />,
      );
      const toggleButton = screen.getByTestId('toggle-button');
      await act(async () => userEvent.click(toggleButton));
    });

    it('should have the correct title', () => {
      const element = screen.getByText(/label1/i);
      expect(element).toBeInTheDocument();
    });

    it('should have correct amount of options', () => {
      const elements = screen.queryAllByRole('checkbox');
      expect(elements).toHaveLength(MockOptions.length);
    });

    it('should have correct checked contents', async () => {
      const elements: HTMLInputElement[] = screen.queryAllByRole('checkbox');
      expect(elements.filter(({ checked }) => checked)).toHaveLength(
        MockSelected.length,
      );
    });
  });

  describe('test click event', () => {
    it('should be fired with true result', async () => {
      let checkedResult = false;
      let valueResult = '';
      render(
        <CheckboxFilter
          label={MockLabel}
          optionTranslationPrefix={MockOptionTranslationPrefix}
          options={MockOptions}
          selected={MockSelected}
          onSelect={(value, checked) => {
            valueResult = value;
            checkedResult = checked;
          }}
        />,
      );
      const toggleButton = screen.getByTestId('toggle-button');
      await act(async () => userEvent.click(toggleButton));
      const id = `label1_option2`;
      const checkbox = screen.getByTestId(id);
      await act(async () => userEvent.click(checkbox));
      expect(checkedResult).toBeTruthy();
      expect(valueResult).toBe('option2');
    });

    it('should be fired with false result', async () => {
      let checkedResult = false;
      let valueResult = '';
      render(
        <CheckboxFilter
          label={MockLabel}
          optionTranslationPrefix={MockOptionTranslationPrefix}
          options={MockOptions}
          selected={MockSelected}
          onSelect={(value, checked) => {
            valueResult = value;
            checkedResult = checked;
          }}
        />,
      );
      const toggleButton = screen.getByTestId('toggle-button');
      await act(async () => userEvent.click(toggleButton));
      const id = `label1_option1`;
      const checkbox = screen.getByTestId(id);
      await act(async () => userEvent.click(checkbox));
      expect(checkedResult).toBeFalsy();
      expect(valueResult).toBe('option1');
    });
  });
});
