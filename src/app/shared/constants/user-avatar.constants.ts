const AVATARS = ['alicia', 'flo', 'janine', 'jason', 'julia', 'pasc', 'smilla', 'tam'] as const;

export const AVATAR_OPTIONS = [...AVATARS]
    .sort()
    .map((avatar) => ({ value: avatar, label: avatar }));
