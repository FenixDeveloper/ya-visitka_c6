// App
export const DEFAULT_PORT = 3001;
export const DEFAULT_DB_URL = 'mongodb://localhost:27017/visitkadb';

// HTTP Statuses
export const HTTP_STATUS_BAD_REQUEST = 400;
export const HTTP_STATUS_UNAUTHORIZED = 401;
export const HTTP_STATUS_FORBIDDEN = 403;
export const HTTP_STATUS_NOT_FOUND = 404;
export const HTTP_STATUS_SERVER_ERROR = 500;

// Token
export const TOKEN_INCORRECT = 'Некорректный токен';
export const TOKEN_SECRET = 'super-strong-secret';
export const TOKEN_NOT_IN_HEADER = 'Отсутствует заголовок авторизации';
export const TOKEN_LIFE_TIME = '7d';

// Messages
export const MSG_SERVER_ERROR = 'На сервере произошла ошибка';
export const MSG_FORBIDDEN = 'Вам не разрешена данная операция';
export const MSG_UNAUTHORIZED = 'Неверная почта или когорта';
export const MSG_FIELD_REQUIRED = 'Это обязательное поле';
export const MSG_INCORRECT_EMAIL = 'Некорректный e-mail';

// User messages
export const USER_ERR_EMAIL_EMPTY = 'E-mail должен быть введен';
export const USER_ERR_EMAIL = 'Не корректно задан e-mail';

// Roles
export const ROLE_CURATOR = 'CURATOR';
export const ROLE_STUDENT = 'STUDENT';
