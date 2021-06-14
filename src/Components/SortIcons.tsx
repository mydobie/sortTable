/* Component called by the SortTable component
Shows the icons at the top of the sortable columns
 
NOTE: icons are free from FontAwesome and can be used without restrictions
See the Font Awesome website for more information
*/

import React from 'react';

// export type sortType = 'size' | 'alpha' | 'sortable';

interface Props {
  sortAsc?: boolean;
  color?: string;
  size?: string;
  type?: string;
}

const SortIcons = (props: Props) => {
  const {
    sortAsc: sortAscProp,
    color: colorProp,
    size: sizeProp,
    type: typeProp,
  } = props;

  const sortAsc: boolean = sortAscProp !== undefined ? sortAscProp : true;
  const color: string = colorProp || '#000000';
  const size: string = sizeProp || '20px';
  const type: string = typeProp || 'size';

  const svgStyle = {
    width: size,
    height: size,
    display: 'inline-block',
    paddingRight: '5px',
  };

  const alphaAscending = ( // From: https://fontawesome.com/icons/sort-alpha-down?style=solid
    <path
      data-icontype='alphaAscending'
      fill={color}
      d='M176 352h-48V48a16 16 0 0 0-16-16H80a16 16 0 0 0-16 16v304H16c-14.19 0-21.36 17.24-11.29 27.31l80 96a16 16 0 0 0 22.62 0l80-96C197.35 369.26 190.22 352 176 352zm240-64H288a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h56l-61.26 70.45A32 32 0 0 0 272 446.37V464a16 16 0 0 0 16 16h128a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16h-56l61.26-70.45A32 32 0 0 0 432 321.63V304a16 16 0 0 0-16-16zm31.06-85.38l-59.27-160A16 16 0 0 0 372.72 32h-41.44a16 16 0 0 0-15.07 10.62l-59.27 160A16 16 0 0 0 272 224h24.83a16 16 0 0 0 15.23-11.08l4.42-12.92h71l4.41 12.92A16 16 0 0 0 407.16 224H432a16 16 0 0 0 15.06-21.38zM335.61 144L352 96l16.39 48z'
    />
  );

  const defaultAscending = ( // https://fontawesome.com/icons/sort-amount-down-alt?style=solid
    <path
      data-icontype='defaultAscending'
      fill={color}
      d='M240 96h64a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16h-64a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16zm0 128h128a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16H240a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16zm256 192H240a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h256a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16zm-256-64h192a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16H240a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16zm-64 0h-48V48a16 16 0 0 0-16-16H80a16 16 0 0 0-16 16v304H16c-14.19 0-21.37 17.24-11.29 27.31l80 96a16 16 0 0 0 22.62 0l80-96C197.35 369.26 190.22 352 176 352z'
    />
  );

  const alphaDescending = ( // From: https://fontawesome.com/icons/sort-alpha-up-alt?style=solid
    <path
      data-icontype='alphaDescending'
      fill={color}
      d='M16 160h48v304a16 16 0 0 0 16 16h32a16 16 0 0 0 16-16V160h48c14.21 0 21.38-17.24 11.31-27.31l-80-96a16 16 0 0 0-22.62 0l-80 96C-5.35 142.74 1.78 160 16 160zm272 64h128a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16h-56l61.26-70.45A32 32 0 0 0 432 65.63V48a16 16 0 0 0-16-16H288a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h56l-61.26 70.45A32 32 0 0 0 272 190.37V208a16 16 0 0 0 16 16zm159.06 234.62l-59.27-160A16 16 0 0 0 372.72 288h-41.44a16 16 0 0 0-15.07 10.62l-59.27 160A16 16 0 0 0 272 480h24.83a16 16 0 0 0 15.23-11.08l4.42-12.92h71l4.41 12.92A16 16 0 0 0 407.16 480H432a16 16 0 0 0 15.06-21.38zM335.61 400L352 352l16.39 48z'
    />
  );

  const defaultDescending = ( // https://fontawesome.com/icons/sort-amount-up?style=solid
    <path
      data-icontype='defaultDescending'
      fill={color}
      d='M304 416h-64a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h64a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16zM16 160h48v304a16 16 0 0 0 16 16h32a16 16 0 0 0 16-16V160h48c14.21 0 21.38-17.24 11.31-27.31l-80-96a16 16 0 0 0-22.62 0l-80 96C-5.35 142.74 1.77 160 16 160zm416 0H240a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h192a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16zm-64 128H240a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h128a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16zM496 32H240a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h256a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z'
    />
  );
  const sortable = ( // https://fontawesome.com/icons/sort-alt?style=solid
    <path
      data-icontype='sortable'
      fill={color}
      d='M176 352h-48V48a16 16 0 0 0-16-16H80a16 16 0 0 0-16 16v304H16c-14.19 0-21.36 17.24-11.29 27.31l80 96a16 16 0 0 0 22.62 0l80-96C197.35 369.26 190.22 352 176 352zm203.29-219.31l-80-96a16 16 0 0 0-22.62 0l-80 96C186.65 142.74 193.78 160 208 160h48v304a16 16 0 0 0 16 16h32a16 16 0 0 0 16-16V160h48c14.19 0 21.36-17.24 11.29-27.31z'
    />
  );

  let icon: JSX.Element = <></>;

  switch (type) {
    case 'alpha':
      icon = sortAsc === true ? alphaAscending : alphaDescending;
      break;
    case 'sortable':
      icon = sortable;
      break;
    default:
      icon = sortAsc === true ? defaultAscending : defaultDescending;
  }

  let ariaLabel = 'Sortable';

  if (type !== 'sortable') {
    ariaLabel = `Sorted ${sortAsc === true ? 'ascending' : 'descending'}`;
  }

  return (
    <svg
      role='img'
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 448 512'
      style={svgStyle}
      aria-label={ariaLabel}
    >
      {icon}
    </svg>
  );
};

// SortIcons.propTypes = {
//   sortAsc: PropTypes.bool, // sort ascending (if false, shows descending icon)
//   color: PropTypes.string, // color of the icon
//   size: PropTypes.string, // width and height
//   type: PropTypes.oneOf(['size', 'alpha', 'sortable']),
// };
// SortIcons.defaultProps = {
//   sortAsc: true,
//   color: '#000000',
//   size: '20px',
//   type: 'size',
// };

export default SortIcons;
