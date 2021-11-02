/* Component called by the SortTable component
Shows the icons at the top of the sortable columns
 
NOTE: icons are free from FontAwesome and can be used without restrictions
See the Font Awesome website for more information
*/

import React from 'react';

// export type sortType = 'size' | 'alpha' | 'sortable';

interface Props {
  color?: string;
  size?: string;
}

const Loading = (props: Props): JSX.Element => {
  const { color: colorProp, size: sizeProp } = props;

  const color: string = colorProp ?? '#aaa ';
  const size: string = sizeProp ?? '40px';

  const style = {
    width: size,
    height: size,
    color,
  };

  return (
    <div
      className='spinner-border'
      role='status'
      style={style}
      data-sort-table-loading
    >
      <span className='sr-only visually-hidden'>Loading...</span>
    </div>
  );
};

export default Loading;
