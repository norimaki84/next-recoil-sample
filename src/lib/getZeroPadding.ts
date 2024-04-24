const getZeroPadding = (num: number | undefined, len: number): string => {
  return (Array(len).join('0') + num).slice(-len)
}
export { getZeroPadding }
