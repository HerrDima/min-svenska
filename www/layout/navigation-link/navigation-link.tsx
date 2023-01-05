/* global URLSearchParams */

import {ReactNode} from 'react';
import {Link, useSearchParams} from 'react-router-dom';

export type NavigationLinkPropsType = {
    children?: ReactNode;
    className?: string;
    isSaveQueries?: boolean;
    queries?: Record<string, string>;
    title?: string;
    to: string;
};

export function NavigationLink(props: NavigationLinkPropsType): JSX.Element {
    const {className, to, children, isSaveQueries = true, title, queries: passedQueries = {}} = props;

    const [search] = useSearchParams();
    const currentQueries: Record<string, string> = Object.fromEntries<string>(search.entries());

    const resultQueries: Record<string, string> = isSaveQueries ? {...currentQueries, ...passedQueries} : passedQueries;

    const queriesAsString: string = new URLSearchParams(resultQueries).toString();

    const queriesAsPartUrl = queriesAsString && `?${queriesAsString}`;

    return (
        <Link className={className} title={title} to={to + queriesAsPartUrl}>
            {children}
        </Link>
    );
}
