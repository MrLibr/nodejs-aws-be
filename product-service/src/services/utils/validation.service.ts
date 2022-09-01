export class ValidationService {
  public isValidUUID(uuid: string): boolean {
    if (typeof uuid === 'string' && uuid.length === 36) {
      return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/.test(uuid);
    } else {
      return false
    }
  }
}
