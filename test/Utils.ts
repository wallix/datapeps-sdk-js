export function sleep(ms: number): Promise<void> {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, ms)
    })
}

export async function wait(ms: number, predicate: () => boolean): Promise<boolean> {
    while(ms > 0 && !predicate()) {
        ms -= 10;
        await sleep(10)
    }
    return ms > 0
}