/* eslint-disable react/react-in-jsx-scope */
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import SortIcons from '../Components/SortIcons';

describe('Search Icon tests', () => {
  test('Alpha ascending', async () => {
    const { container } = render(<SortIcons sortAsc type='alpha' />);
    expect(
      container.querySelector('path[data-icontype="alphaAscending"]')
    ).toBeInTheDocument();
    const results = await axe(`<main>${container.innerHTML}</main>`); // NOTE main is required to prevent landmark error
    expect(results).toHaveNoViolations();
  });

  test('Alpha descending', async () => {
    const { container } = render(<SortIcons sortAsc={false} type='alpha' />);
    expect(
      container.querySelector('path[data-icontype="alphaDescending"]')
    ).toBeInTheDocument();
    const results = await axe(`<main>${container.innerHTML}</main>`); // NOTE main is required to prevent landmark error
    expect(results).toHaveNoViolations();
  });

  test('Size/number ascending', async () => {
    const { container } = render(<SortIcons sortAsc />);
    expect(
      container.querySelector('path[data-icontype="defaultAscending"]')
    ).toBeInTheDocument();
    const results = await axe(`<main>${container.innerHTML}</main>`); // NOTE main is required to prevent landmark error
    expect(results).toHaveNoViolations();
  });

  test('Size/number descending', async () => {
    const { container } = render(<SortIcons sortAsc={false} />);
    expect(
      container.querySelector('path[data-icontype="defaultDescending"]')
    ).toBeInTheDocument();
    const results = await axe(`<main>${container.innerHTML}</main>`); // NOTE main is required to prevent landmark error
    expect(results).toHaveNoViolations();
  });

  test('Sortable', async () => {
    const { container } = render(<SortIcons type='sortable' />);
    expect(
      container.querySelector('path[data-icontype="sortable"]')
    ).toBeInTheDocument();
    const results = await axe(`<main>${container.innerHTML}</main>`); // NOTE main is required to prevent landmark error
    expect(results).toHaveNoViolations();
  });
});
