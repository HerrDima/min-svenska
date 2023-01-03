/* global HTMLElement */

import assert from 'node:assert/strict';

import {render, screen} from '@testing-library/react';
import {describe, test} from '@jest/globals';

import {LibraryComponent} from './library-component';

describe('LibraryComponent', () => {
    test('default state', () => {
        render(<LibraryComponent textContent="some text">child node</LibraryComponent>);

        assert.equal(screen.getByText('child node') instanceof HTMLElement, true);
    });
});
