export function replaceSpecialCharacters(str) {
  return str
    .replace('&#8216;', "'")
    .replace('&#8217;', "'")
    .replace('&#8220;', "'");
}
