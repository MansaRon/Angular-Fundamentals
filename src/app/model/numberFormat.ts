export function format(parsedNum: number): number {
    return parseFloat((Math.round(parsedNum * 100) / 100).toFixed(2));
}