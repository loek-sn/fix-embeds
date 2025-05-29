export function defineEnv<const T extends readonly string[]>(variables: T): { [K in T[number]]: string } {
    return variables.reduce((env, variable) => {
        if (variable === undefined) {
            throw new Error(`Environment variable "${variable}" is not defined`);
        }
        if (variable === '') {
            console.warn(`Environment variable "${variable}" is defined but empty`);
        }
        return {
            ...env,
            [variable]: Bun.env[variable]
        }
    }, {} as { [K in T[number]]: string })
}