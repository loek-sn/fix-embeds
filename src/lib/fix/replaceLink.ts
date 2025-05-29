import { regexList } from "./regexList";

export function replaceLink(url: string): string | undefined {
    for (const { test, replace } of regexList) {
        if (test.test(url)) {
            const replaced = url.replace(test, replace);
            return replaced !== url ? replaced : undefined;
        }
    }
    return undefined;
}
