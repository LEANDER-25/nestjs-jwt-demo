export class CollectionUtils {
  static isEmpty<T>(arr: T[]): boolean {
    if (ObjectUtils.isNull(arr)) {
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
    return ObjectUtils.isNull(str) || str.length == 0;
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

export class ObjectUtils {
  static isNull<T>(obj: T): boolean {
    return obj == undefined || obj == null;
  }
  static isNotNull<T>(obj: T): boolean {
    return !this.isNull(obj)
  }
}
