import React from 'react';
// import { ReactComponent as SortableIcon } from './Icons/arrow-down-up.svg';
import SortableIcon from './Icons/ArrowDownUp';

import AlphaAscIcon from './Icons/SortAlphaDown';
import AlphaDescIcon from './Icons/SortAlphaUpAlt';

import SortAscIcon from './Icons/SortDownAlt';
import SortDescIcon from './Icons/SortUp';

import NumericAscIcon from './Icons/SortNumericDown';
import NumericDescIcon from './Icons/SortNumericUpAlt';

export type SortType = 'size' | 'alpha' | 'number' | 'sortable';

const IconWrapper = ({
  children,
  type,
}: {
  children: JSX.Element;
  type: string;
}) => (
  <span
    style={{ display: 'inline-block', paddingRight: '5px' }}
    data-icontype={type}
    aria-hidden='true'
  >
    {children}
  </span>
);

interface Props {
  sortAsc?: boolean;
  color?: string;
  size?: number;
  type?: SortType;
}

const SortIcons = ({
  sortAsc = true,
  color,
  size = 20,
  type = 'size',
}: Props) => {
  const iconColor = color || (type === 'sortable' ? '#ccc' : '#000');

  switch (type) {
    case 'alpha':
      return sortAsc === true ? (
        <IconWrapper type='alphaAscending'>
          <AlphaAscIcon color={iconColor} size={size} />
        </IconWrapper>
      ) : (
        <IconWrapper type='alphaDescending'>
          <AlphaDescIcon color={iconColor} size={size} />
        </IconWrapper>
      );

    case 'number':
      return sortAsc === true ? (
        <IconWrapper type='numericAscending'>
          <NumericAscIcon color={iconColor} size={size} />
        </IconWrapper>
      ) : (
        <IconWrapper type='numericDescending'>
          <NumericDescIcon color={iconColor} size={size} />
        </IconWrapper>
      );

    case 'sortable':
      return (
        <IconWrapper type='sortable'>
          <SortableIcon color={iconColor} size={20} />
        </IconWrapper>
      );

    default:
      return sortAsc === true ? (
        <IconWrapper type='defaultAscending'>
          <SortAscIcon color={iconColor} size={size} />
        </IconWrapper>
      ) : (
        <IconWrapper type='defaultDescending'>
          <SortDescIcon color={iconColor} size={size} />
        </IconWrapper>
      );
  }
};

export default SortIcons;
