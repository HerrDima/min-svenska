export function replaceSpecialSymbols(text: string): string {
    return (
        text
            // replace "'" - single quote
            .replace(/'/g, '&#39;')
            // replace "`" - backtick
            .replace(/`/g, '&#96;')
    );
}
