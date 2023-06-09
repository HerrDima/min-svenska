import type {Meta, StoryObj} from '@storybook/react';

import {Button} from './button';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
    argTypes: {
        backgroundColor: {control: 'color'},
    },
    component: Button,
    tags: ['autodocs'],
    title: 'Example/Button',
} satisfies Meta<typeof Button>;

type StoryType = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: StoryType = {
    args: {
        label: 'Button',
        primary: true,
    },
};

export const Secondary: StoryType = {
    args: {
        label: 'Button',
    },
};

export const Large: StoryType = {
    args: {
        label: 'Button',
        size: 'large',
    },
};

export const Small: StoryType = {
    args: {
        label: 'Button',
        size: 'small',
    },
};

// eslint-disable-next-line import/no-default-export
export default meta;
