export class A3SSetting {
    private constructor() {}

    /* access id */
    ACSID: string;

    /* secret key */
    SECKY: string;

    private static instance: A3SSetting;
    static getInstance() {
      if (!this.instance) {
        this.instance = new A3SSetting();
      }
      return this.instance;
    }
  }
  