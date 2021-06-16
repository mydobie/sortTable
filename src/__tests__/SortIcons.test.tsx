/* eslint-disable react/react-in-jsx-scope */
import { shallow, mount } from 'enzyme';
import { axe } from 'jest-axe';
import SortIcons from '../Components/SortIcons';

describe('Search Icon tests', () => {
  test('Alpha ascending', async () => {
    const wrapper = mount(<SortIcons sortAsc type='alpha' />);
    expect(wrapper.find('path[data-icontype="alphaAscending"]')).toHaveLength(
      1
    );
    const results = await axe(`<main>${wrapper.html()}</main>`); // NOTE main is required to prevent landmark error
    expect(results).toHaveNoViolations();
  });

  test('Alpha descending', async () => {
    const wrapper = shallow(<SortIcons sortAsc={false} type='alpha' />);
    expect(wrapper.find('path[data-icontype="alphaDescending"]')).toHaveLength(
      1
    );
    const results = await axe(`<main>${wrapper.html()}</main>`); // NOTE main is required to prevent landmark error
    expect(results).toHaveNoViolations();
  });

  test('Size/number ascending', async () => {
    const wrapper = shallow(<SortIcons sortAsc />);
    expect(wrapper.find('path[data-icontype="defaultAscending"]')).toHaveLength(
      1
    );
    const results = await axe(`<main>${wrapper.html()}</main>`); // NOTE main is required to prevent landmark error
    expect(results).toHaveNoViolations();
  });

  test('Size/number descending', async () => {
    const wrapper = shallow(<SortIcons sortAsc={false} />);
    expect(
      wrapper.find('path[data-icontype="defaultDescending"]')
    ).toHaveLength(1);
    const results = await axe(`<main>${wrapper.html()}</main>`); // NOTE main is required to prevent landmark error
    expect(results).toHaveNoViolations();
  });

  test('Sortable', async () => {
    const wrapper = shallow(<SortIcons type='sortable' />);
    expect(wrapper.find('path[data-icontype="sortable"]')).toHaveLength(1);
    const results = await axe(`<main>${wrapper.html()}</main>`); // NOTE main is required to prevent landmark error
    expect(results).toHaveNoViolations();
  });
});
