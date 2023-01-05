/* global document, KeyboardEvent */
import {useEffect} from 'react';

export const enum HotKeyModifierEnum {
    alt = 'alt',
    ctrl = 'ctrl',
    shift = 'shift',
}

export function useHotKey(modifierList: Array<HotKeyModifierEnum>, char: string, handleHotKey: () => unknown) {
    const hasAlt = modifierList.includes(HotKeyModifierEnum.alt);
    const hasCtrl = modifierList.includes(HotKeyModifierEnum.ctrl);
    const hasShift = modifierList.includes(HotKeyModifierEnum.shift);

    useEffect(() => {
        function handleBodyOnKeyPress(evt: KeyboardEvent) {
            const isModificationKeysMatched =
                evt.altKey === hasAlt && evt.ctrlKey === hasCtrl && evt.shiftKey === hasShift;
            const isKeyMatched = [`Key${char}`.toLowerCase(), char.toLowerCase()].includes(evt.code.toLowerCase());

            if (isModificationKeysMatched && isKeyMatched) {
                evt.preventDefault();
                handleHotKey();
            }
        }

        document.body.addEventListener('keydown', handleBodyOnKeyPress, false);

        return () => {
            document.body.removeEventListener('keydown', handleBodyOnKeyPress, false);
        };
    }, [hasAlt, hasCtrl, hasShift, char, handleHotKey]);
}
