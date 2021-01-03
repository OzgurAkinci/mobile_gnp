export class UtilFunctions {
  static replaceSpecialCharacters(str) {
    return str
      .replace('&#8216;', "'")
      .replace('&#8217;', "'")
      .replace('&#8220;', "'");
  }
}

export default new UtilFunctions();
