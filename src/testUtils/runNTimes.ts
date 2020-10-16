// eslint-disable-next-line @typescript-eslint/ban-types,@typescript-eslint/explicit-module-boundary-types
export default async function runNTimes(times: number, callback: Function) {
  new Array(times).fill('').map(async () => await callback());
}
