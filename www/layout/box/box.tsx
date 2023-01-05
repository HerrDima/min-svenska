import {ReactNode, ElementType, CSSProperties} from 'react';

import {makeCssArray} from './box-helper';

type BoxPropsType = {
    backgroundColor?: string;
    boxSizing?: 'border-box' | 'content-box' | 'initial';
    children?: ReactNode;
    display?: 'block' | 'flex' | 'inline';
    height?: number | string;
    margin?: Array<number> | number;
    padding?: Array<number> | number;
    tagName?: ElementType;
    width?: number | string;
};

export function Box(props: BoxPropsType): JSX.Element {
    const {
        tagName: TagName = 'div',
        children,
        margin,
        padding,
        width,
        height,
        boxSizing,
        backgroundColor,
        display,
    } = props;

    const [marginTop, marginRight, marginBottom, marginLeft, paddingTop, paddingRight, paddingBottom, paddingLeft] = [
        ...makeCssArray(margin),
        ...makeCssArray(padding),
    ].map((value: number): string => `${value}px`);

    const style: CSSProperties = {
        backgroundColor,
        boxSizing,
        display,
        height,
        marginBottom,
        marginLeft,
        marginRight,
        marginTop,
        paddingBottom,
        paddingLeft,
        paddingRight,
        paddingTop,
        width,
    };

    return <TagName style={style}>{children}</TagName>;
}
