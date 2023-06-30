export class IgnoreTokenCheckUrlCollection {
  private constructor() {}
  urls: string[];
  private static instance: IgnoreTokenCheckUrlCollection;
  static getInstance() {
    if (!this.instance) {
      this.instance = new IgnoreTokenCheckUrlCollection();
    }
    return this.instance;
  }
}
