export type User = {
    id: string;
    name: string;
    icon?: string;
    admin: boolean;
};

type UserWithoutId = Pick<User, 'name' | 'icon' | 'admin'>;

export type AddUserBody = UserWithoutId & {
    password: string;
};

export type UpdateUserBody = UserWithoutId & {
    oldPassword?: string;
    newPassword?: string;
};
export type UpdateUserBodyWithId = UpdateUserBody & Pick<User, 'id'>;
