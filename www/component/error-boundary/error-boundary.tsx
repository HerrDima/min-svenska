import {Component} from 'react';

type PropsType = {
    children: Array<JSX.Element> | JSX.Element;
    errorFallBack: JSX.Element;
};

type StateType = {
    hasError: boolean;
};

export class ErrorBoundary extends Component<PropsType, StateType> {
    constructor(props: PropsType) {
        super(props);

        this.state = {hasError: false};
    }

    componentDidCatch(error: Error, errorInfo: unknown): void {
        console.log('[ERROR]:', error);
        console.log('[ERROR-INFO]:', errorInfo);

        this.setState({hasError: true});
    }

    render(): Array<JSX.Element> | JSX.Element {
        const {state, props} = this;
        const {hasError} = state;
        const {children, errorFallBack} = props;

        return hasError ? errorFallBack : children;
    }
}
