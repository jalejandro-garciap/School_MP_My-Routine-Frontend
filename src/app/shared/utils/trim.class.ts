export class Trim {
  public static trimProperties<T>(obj: T): T {
    
    if (typeof obj === 'string') {
      return obj.trim() as any;
    }

    if (Array.isArray(obj)) {
      return obj.map((item) => this.trimProperties(item)) as any;
    }

    if (typeof obj === 'object') {
      const newObj: any = { ...obj };

      for (const attribute in newObj) {
        if (newObj.hasOwnProperty(attribute)) {
          newObj[attribute] = this.trimProperties(newObj[attribute]);
        }
      }

      return newObj as T;
    }

    return obj;
  }
}
