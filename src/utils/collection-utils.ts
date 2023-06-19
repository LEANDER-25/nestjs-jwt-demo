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
