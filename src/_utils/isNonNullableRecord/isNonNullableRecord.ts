type UnknownRecord = Record<string | number | symbol, unknown>;

export type NonNullableRecord<T extends UnknownRecord> = {
  [K in keyof T]: NonNullable<T[K]>;
};

/**
 * Check if any value in record is nullable
 */
export function isNonNullableRecord<T extends UnknownRecord>(
  record: T,
): record is NonNullableRecord<T> {
  return Object.values(record).every((value) => value !== undefined && value !== null);
}
