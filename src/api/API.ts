import axios, {AxiosInstance} from 'axios';

import {
    AUTH_LOGIN,
    AUTH_REFRESH,
    INIT,
    AUTH_REGISTER,
    USER,
    FILE_ID,
    USER_AVATAR,
    POST,
    POST_IMAGE_ID,
    POST_MYFEED,
    TAG_SEARCH,
    POST_ID,
    POST_ID_LIKES} from 'constants/urls';
import {IAuthRequest} from 'types/IAuthRequest';
import {TokenTypeEnum} from 'enums/TokenTypeEnum';
import getFromLocalStorage from 'utils/getFromLocalStorage';
import setToLocalStorage from 'utils/setToLocalStorage';
import store from 'store/store';
import {logout} from 'store/slices/authSlice';
import {clearUser} from 'store/slices/initSlice';
import {IEditUserRequest} from 'types/IEditUserRequest';
import {IPostRequest} from 'types/IPostRequest';
import {IEditPostLikeStatus} from 'store/thunks/editPostLikeStatusThunk';

class API {
    private api: AxiosInstance;

    constructor(url: string = process.env.REACT_APP_BACKEND_URL || '') {
        if (!url) {
            throw new Error('Backend url is not defined');
        }

        this.api = axios.create({
            baseURL: url,
            withCredentials: true,
        });

        this.api.interceptors.request.use(async (config) => {
            if (config.headers['Content-Type'] !== 'multipart/form-data') {
                config.headers['Content-Type'] = 'application/json';
            }

            const accessToken = getFromLocalStorage(TokenTypeEnum.ACCESS);

            if (accessToken) {
                config.headers.Authorization = `Bearer ${accessToken}`;
            }
            return config;
        });

        this.api.interceptors.response.use(
            (config) => config,
            async (error) => {
                const originalRequest = {...error.config};
                originalRequest._isRetry = true;
                if (
                    error.response.status === 401
                    && error.config
                    && !error.config._isRetry
                ) {
                    try {
                        const refreshToken = getFromLocalStorage(TokenTypeEnum.REFRESH);
                        if (!refreshToken) {
                            throw new Error(error.response.data.message);
                        }
                        const response = await this.api.post(AUTH_REFRESH, {refreshToken});
                        if (!response.data.accessToken) {
                            throw new Error(error.response.data.message);
                        }
                        setToLocalStorage(TokenTypeEnum.ACCESS, response.data.accessToken);
                        return this.api.request(originalRequest);
                    } catch (err) {
                        this.dispatch(logout());
                        this.dispatch(clearUser());
                    }
                }
                throw error;
            },
        );
    }

    dispatch(action: any) {
        store.dispatch(action);
    }

    async init() {
        try {
            const response = await this.api.get(INIT);

            const result = response.data;

            return {
                data: result,
                error: null,
            };
        } catch (error: any) {
            const errorMessage = error.response
                ? error.response.data.message
                : error.message;
            return {
                data: null,
                error,
                errorMessage,
            };
        }
    }

    async loginUser(userData: IAuthRequest) {
        try {
            const response = await this.api.post(AUTH_LOGIN, userData);

            const result = response.data;

            if (result.refreshToken && result.accessToken) {
                setToLocalStorage(TokenTypeEnum.ACCESS, result.accessToken);
                setToLocalStorage(TokenTypeEnum.REFRESH, result.refreshToken);
            } else {
                throw new Error('Unexpected format of response data');
            }

            return {
                data: result,
                error: null,
            };
        } catch (error: any) {
            const errorMessage = error.response
                ? error.response.data.message
                : error.message;
            return {
                data: null,
                error,
                errorMessage,
            };
        }
    }

    async registrationUser(userData: IAuthRequest) {
        try {
            const response = await this.api.post(AUTH_REGISTER, userData);

            const result = response.data;

            return {
                data: result,
                error: null,
            };
        } catch (error: any) {
            const errorMessage = error.response
                ? error.response.data.message
                : error.message;
            return {
                data: null,
                error,
                errorMessage,
            };
        }
    }

    async editUser(userData: IEditUserRequest) {
        try {
            const response = await this.api.patch(USER, userData);

            const result = response.data;

            return {
                data: result,
                error: null,
            };
        } catch (error: any) {
            const errorMessage = error.response
                ? error.response.data.message
                : error.message;
            return {
                data: null,
                error,
                errorMessage,
            };
        }
    }

    async setAvatar(file: File) {
        try {
            const formData = new FormData();

            formData.append('file', file);
            const response = await this.api.post(USER_AVATAR, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setToLocalStorage('avatarName', file.name);

            const result = response.data;

            return {
                data: result,
                error: null,
            };
        } catch (error: any) {
            const errorMessage = error.response
                ? error.response.data.message
                : error.message;
            return {
                data: null,
                error,
                errorMessage,
            };
        }
    }

    async getImage(id: string) {
        try {
            const response = await this.api.get(FILE_ID(id), {
                responseType: 'blob',
            });

            const result = response.data;

            return {
                data: result,
                error: null,
            };
        } catch (error: any) {
            const errorMessage = error.response
                ? error.response.data.message
                : error.message;
            return {
                data: null,
                error,
                errorMessage,
            };
        }
    }

    async createPost(data: IPostRequest) {
        try {
            const response = await this.api.post(POST, data);

            const result = response.data;

            return {
                data: result,
                error: null,
            };
        } catch (error: any) {
            const errorMessage = error.response
                ? error.response.data.message
                : error.message;
            return {
                data: null,
                error,
                errorMessage,
            };
        }
    }

    async editPost(id: string, data: IPostRequest) {
        try {
            const response = await this.api.patch(POST_ID(id), data);

            const result = response.data;

            return {
                data: result,
                error: null,
            };
        } catch (error: any) {
            const errorMessage = error.response
                ? error.response.data.message
                : error.message;
            return {
                data: null,
                error,
                errorMessage,
            };
        }
    }

    async deletePost(id: string) {
        try {
            const response = await this.api.delete(POST_ID(id));

            const result = response.data;

            return {
                data: result,
                error: null,
            };
        } catch (error: any) {
            const errorMessage = error.response
                ? error.response.data.message
                : error.message;
            return {
                data: null,
                error,
                errorMessage,
            };
        }
    }

    async setPostImage(file: File, id: string) {
        try {
            const formData = new FormData();

            formData.append('file', file);
            const response = await this.api.post(POST_IMAGE_ID(id), formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            const result = response.data;

            return {
                data: result,
                error: null,
            };
        } catch (error: any) {
            const errorMessage = error.response
                ? error.response.data.message
                : error.message;
            return {
                data: null,
                error,
                errorMessage,
            };
        }
    }

    async getUserPosts() {
        try {
            const response = await this.api.get(POST_MYFEED);

            const result = response.data;

            return {
                data: result,
                error: null,
            };
        } catch (error: any) {
            const errorMessage = error.response
                ? error.response.data.message
                : error.message;
            return {
                data: null,
                error,
                errorMessage,
            };
        }
    }

    async getTags() {
        try {
            const response = await this.api.get(TAG_SEARCH);

            const result = response.data;

            return {
                data: result,
                error: null,
            };
        } catch (error: any) {
            const errorMessage = error.response
                ? error.response.data.message
                : error.message;
            return {
                data: null,
                error,
                errorMessage,
            };
        }
    }

    async editPostLikeStatus(id: string, data: IEditPostLikeStatus) {
        try {
            const response = await this.api.post(POST_ID_LIKES(id), data);

            const result = response.data;

            return {
                data: result,
                error: null,
            };
        } catch (error: any) {
            const errorMessage = error.response
                ? error.response.data.message
                : error.message;
            return {
                data: null,
                error,
                errorMessage,
            };
        }
    }
}

export default new API();
