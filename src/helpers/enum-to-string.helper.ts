/**
 * Converts an Enum into a String
 * @param _enum Enum
 * @returns string type
 */
export const EnumToString = (_enum: Record<string, unknown>): string[] =>
  Object.keys(_enum)
    .map((key) => _enum[key])
    .filter((value) => typeof value === 'string') as string[];
