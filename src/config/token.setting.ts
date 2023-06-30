export class TokenSetting {
  private constructor() {}
  private static instance: TokenSetting;
  static getInstance() {
    if (!this.instance) {
      this.instance = new TokenSetting();
    }
    return this.instance;
  }
  secretKey: string;
  refreshExp: string;
  accessExp: string;
}
