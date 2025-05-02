import { User } from '../types/user.types';

export function sortByAdminAndNameAsc(a: User, b: User): number {
    return Number(b.admin) - Number(a.admin) || a.name.localeCompare(b.name);
}
