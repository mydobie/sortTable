import React from 'react';
interface Props {
    label: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    value: string | number;
    id: string;
    debounceTimeout?: number;
}
declare const Filter: (props: Props) => JSX.Element;
export default Filter;
