// App
export const DEFAULT_PORT = 3001;
export const DEFAULT_DB_URL = 'mongodb://127.0.0.1:27017/visitkadb';

// HTTP Statuses
export const HTTP_STATUS_OK = 200;
export const HTTP_STATUS_BAD_REQUEST = 400;
export const HTTP_STATUS_UNAUTHORIZED = 401;
export const HTTP_STATUS_FORBIDDEN = 403;
export const HTTP_STATUS_NOT_FOUND = 404;
export const HTTP_STATUS_CONFLICT = 409;
export const HTTP_STATUS_SERVER_ERROR = 500;

// Error codes
export const CONFLICT_ERROR_CODE = 11000;

// Token
export const TOKEN_NOT_IN_HEADER = 'Отсутствует заголовок авторизации';

// Messages
export const MSG_SERVER_ERROR = 'На сервере произошла ошибка';
export const MSG_FORBIDDEN = 'Вам не разрешена данная операция';
export const MSG_UNAUTHORIZED = 'Неверная почта или когорта';
export const MSG_FIELD_REQUIRED = 'Это обязательное поле';
export const MSG_INCORRECT_EMAIL = 'Некорректный e-mail';
export const MSG_INCORRECT_ID = 'Некорректное значение id';
export const MSG_PAR_REQUIRED = 'Это обязательный параметр';
export const MSG_INCORRECT_URL = 'Некорректная ссылка';
export const MSG_INCORRECT_DATE = 'Дата должна быть в формате: год-месяц-день';
export const MSG_INCORRECT_GEOCODE = 'Некорректные координаты';
export const MSG_USER_NOT_FOUND = 'Пользователь не найден';
export const MSG_INCORRECT_TARGET = 'Некорректное значение [target]';
export const MSG_EXPIRED_CODE = 'Срок действия кода истек';
export const MSG_CLIENT_NOT_FOUND = 'Приложение с текущим client_id не найдено';
export const MSG_WRONG_CLIENT_SECRET = 'Неверный client_secret';
export const MSG_EMAIL_ALREADY_EXIST =
  'Пользователь с таким email уже существует';
export const MSG_MISSING_PEERS =
  'Должно содержать хотя бы одно из [text, emotion]';
export const MSG_CONFLICT_PEERS =
  'Конфликт между взаимоисключающими полями [text, emotion]';

// User messages
export const USER_ERR_EMAIL_EMPTY = 'E-mail должен быть введен';
export const USER_ERR_EMAIL = 'Не корректно задан e-mail';

// Roles
export const ROLE_CURATOR = 'curator';
export const ROLE_STUDENT = 'student';

// Regex
export const regexUrl =
  /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:?#[\]@!$&'()*+,;=.]+$/;

// Yandex OAuth
export const TOKEN_URL = 'https://oauth.yandex.ru/token';
export const PROFILE_URL = 'https://login.yandex.ru/info?format=jwt';
export const ERR_INVALID_GRANT = 'invalid_grant';
export const ERR_INVALID_CLIENT = 'invalid_client';
export const ERR_CLIENT_NOT_FOUND = 'Client not found';

// UPLOADING FILES
export const DEFAULT_TEMP_DIR = 'temp/';
export const DEFAULT_UPLOAD_DIR = './uploads';
