export const regex = (data: string): RegExp => {
  // Create a new regular expression object with the specified data and case-insensitive flag
  return new RegExp(data, 'i')
}
