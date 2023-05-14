export type LoginForm = {
    email: string;
    password: string;
};

export enum Roles {
    SuperAdmin = 'SuperAdmin',
    Admin = 'Admin',
    Manager = 'Manager',
}

export type ForgotPasswordType = {
    email: string;
};
export type NewPasswordType = {
    newPassword: string;
    token: string;
};
export type RegisterForm = {
    username: string;
    email: string;
    password: string;
};

export type UpdateProfileType = {
    // email: string;
    username: string;
    image?: [key: string] | undefined;
};

// MONGO TYPE
export type MongoType = {
    createdAt: string;
    updatedAt: string;
    __V: number;
    _id: string;
};

// USER
export type UserType = {
    bio: string;
    email: string;
    id: string;
    image: string;
    username: string;
};

export type UserProfilesType = {
    bio: string;
    image: string;
    username: string;
    following: boolean;
};

// AUTHOR
export type Author = {
    id: number;
    username: string;
    email: string;
    bio: string;
    image: string;
};

// ARTICLE
export type ArticleType = {
    id: number;
    slug: string;
    title: string;
    description: string;
    body: string;
    created: number;
    updated: number;
    tagList: string[];
    favoriteCount: number;
    author: Author;
};

export type ArticleProfilesType = Omit<ArticleType, 'author'> & {
    comments: CommentType[];
};

export type UpdateArticleType = Pick<ArticleType, 'title' | 'description' | 'body' | 'tagList'>;

// COMMENT
export type CommentType = {
    id: number;
    body: string;
    created: number;
    author: Author;
};
