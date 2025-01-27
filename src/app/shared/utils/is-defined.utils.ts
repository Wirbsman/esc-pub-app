export function isDefined<T>(sth?: T | null): sth is T {
    return sth !== undefined && sth !== null;
}
