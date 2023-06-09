import './button.css';

interface ButtonProps {
    /**
     * What background color to use
     */
    backgroundColor?: string;
    /**
     * Button contents
     */
    label: string;
    /**
     * Is this the principal call to action on the page?
     */
    primary?: boolean;
    /**
     * How large should the button be?
     */
    size?: 'large' | 'medium' | 'small';
}

// Primary UI component for user interaction
export function Button({primary = false, size = 'medium', backgroundColor, label}: ButtonProps) {
    const mode = primary ? 'storybook-button--primary' : 'storybook-button--secondary';

    return (
        <button
            className={['storybook-button', `storybook-button--${size}`, mode].join(' ')}
            style={{backgroundColor}}
            type="button"
        >
            {label}
        </button>
    );
}
