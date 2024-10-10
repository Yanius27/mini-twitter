export const AUTH_REGISTER = '/api/auth/register';
export const AUTH_LOGIN = '/api/auth/login';
export const AUTH_REFRESH = '/api/auth/refresh';

export const USER = '/api/user';
export const USER_ID = (id: string) => `/api/user/${id}`;
export const USER_SUBSCRIBE = (id: string) => `/api/user/${id}/subscribe`;
export const USER_AVATAR = '/api/user/avatar';

export const FILE_ID = (id: string) => `/api/file/${id}`;

export const POST = '/api/post';
export const POST_MYFEED = '/api/post/my-feed';
export const POST_ID = (id: string) => `/api/post/${id}`;
export const POST_ID_LIKES = (id: string) => `/api/post/${id}/likes`;
export const POST_IMAGE_ID = (id: string) => `/api/post/image/${id}`;
export const POST_POSTID_COMMENTS = (postId: string) => `/api/post/${postId}/comments`;
export const POST_POSTID_COMMENTS_COMMENTID = (postId: string, commentId: string) => `/api/post/${postId}/comments${commentId}`;

export const TAG_SEARCH = '/api/tag/search';

export const INIT = '/api/init';
