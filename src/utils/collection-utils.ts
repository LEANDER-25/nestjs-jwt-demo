export class CollectionUtils {
  static isEmpty<T>(arr: T[]): boolean {
    if (arr == undefined || arr == null) {
      return true;
    }
    return arr.length == 0;
  }

  static isNotEmpty<T>(arr: T[]): boolean {
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
  static strOrDefault(str: string, defaultValue: string): string {
    if (StringUtils.isEmpty(str)) {
      return defaultValue;
    }
    return str;
  }
  static strOrEmpty(str: string): string {
    return this.strOrDefault(str, '');
  }
}
