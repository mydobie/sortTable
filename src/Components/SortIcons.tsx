import React from 'react';
import { ReactComponent as SortableIcon } from './Icons/arrow-down-up.svg';

import { ReactComponent as AlphaAscIcon } from './Icons/sort-alpha-down.svg';
import { ReactComponent as AlphaDescIcon } from './Icons/sort-alpha-up-alt.svg';

import { ReactComponent as SortAscIcon } from './Icons/sort-down-alt.svg';
import { ReactComponent as SortDescIcon } from './Icons/sort-up.svg';

import { ReactComponent as NumericAscIcon } from './Icons/sort-numeric-down.svg';
import { ReactComponent as NumericDescIcon } from './Icons/sort-numeric-up-alt.svg';

export type SortType = 'size' | 'alpha' | 'number' | 'sortable';

interface Props {
  sortAsc?: boolean;
  color?: string;
  size?: number;
  type?: SortType;
}

const SortIcons = ({
  sortAsc = true,
  color,
  size = 1,
  type = 'size',
}: Props) => {
  const iconColor = color || (type === 'sortable' ? '#ccc' : '#000');

  const iconProps = {
    style: {
      color: iconColor,
      display: 'inline-block',
      paddingRight: '5px',
      transform: `scale(${size})`,
    },
    'aria-hidden': true,
  };

  switch (type) {
    case 'alpha':
      return sortAsc === true ? (
        <AlphaAscIcon {...iconProps} data-icontype='alphaAscending' />
      ) : (
        <AlphaDescIcon {...iconProps} data-icontype='alphaDescending' />
      );

    case 'number':
      return sortAsc === true ? (
        <NumericAscIcon {...iconProps} />
      ) : (
        <NumericDescIcon {...iconProps} />
      );

    case 'sortable':
      return <SortableIcon {...iconProps} data-icontype='sortable' />;

    default:
      return sortAsc === true ? (
        <SortAscIcon {...iconProps} data-icontype='defaultAscending' />
      ) : (
        <SortDescIcon {...iconProps} data-icontype='defaultDescending' />
      );
  }
};

export default SortIcons;
