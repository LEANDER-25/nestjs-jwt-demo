export class CollectionUtils {
  static isEmpty(arr: []): boolean {
    if (arr == undefined || arr == null) {
      return true;
    }
    return arr.length == 0;
  }

  static isNotEmpty(arr: []): boolean {
    return !CollectionUtils.isEmpty(arr);
  }
}

export class StringUtils {
  static isEmpty(str: string): boolean {
    return str == undefined || str == null || str.length == 0;
  }
  static isNotEmpty(str: string): boolean {
    return !StringUtils.isEmpty(str);
  }
  static EMPTY: string = '';
}
