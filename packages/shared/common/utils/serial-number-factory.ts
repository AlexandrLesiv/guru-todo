export const serialNumberFactory = () => {
  let value = 0

  return () => value++
}