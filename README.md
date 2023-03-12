# ya-visitka_c6

Репозиторий третьего проектного месяца для когорты 6, проект "Визитница" для Яндекс.Практикум

**Бриф проекта**

[Платформа-визитница VISITKI](https://www.notion.so/3-465e1da1ed11434799ccfb0b27354e75?pvs=4#ad33a3506d264a7a810d62e3644014ca)

## Описание сервиса по загрузке файлов

- POST /api/files
   Маршрут доступен для авторизованных пользователей. Тело запроса в формате formData
   пример:

```js
const formData = new FormData();
formData.append('job', files[0]);
formData.append('status', files[1]);
formData.append('edu', files[2]);
formData.append('hobby', files[3]);
formData.append('photo', files[4]);
```

Допускается отправка отдельных файлов, не обязательно все 4 указывать.

Результат запроса:

```json
{
    "hobby": {
        "file": "temp/8b19aa0033f0120eb7d38a12851ebbf7"
    }
}
```

- PATCH api/profiles/:id
   при обновлении профиля временные ссылки, меняются на постоянные (происходит перемещение временных файлов в постоянное хранилище)

```json
...
"info":{
  "hobby":{
    "text":"", //текстовая информация
    "image":temp/8b19aa0033f0120eb7d38a12851ebbf7, // временная ссылка на файл
    ...
```

Результат:
возвращается info с уже замененными временными ссылками на постоянные

```json
...
"info":{
  "hobby":{
    "text":"", //текстовая информация
    "image":8b19aa0033f0120eb7d38a12851ebbf7, // постоянная ссылка на файл
    ...
```

- Получение файла для авторизованных пользователей GET api/files/:file

напрямую использовать файл в качестве картинки из html не получится, поскольку нужна авторизация. поэтому сначала файл нужно получить через fetch, а затем его установить в img

пример:

```js
const imageUrl = /api/files/8b19aa0033f0120eb7d38a12851ebbf7";

fetch(imageUrl)
  //заголовки авторизации
  .then(response => response.blob())
  .then(imageBlob => {

      const imageObjectURL = URL.createObjectURL(imageBlob);
      const image = //img tag element//
      image.src = imageObjectURL
  });
```

## Авторизация

- Получение токена:

  ```bash
  POST /api/token

  body:

    {
      code: <код, полученный от https://oauth.yandex.ru/authorize>
    }
  ```

  ```bash
    response:

      {
        token: "string"
      }
  ```

- Полученный в ответе токен должен присутствовать в загловках при каждом запросе.

  ```bash
  "Authorization": "Bearer ..."
  ```

- Получение информации о текущем пользователе

  ```bash
  GET /api/login
  ```

  ```bash
  response:

    {
      _id: "507f1f77bcf86cd799439011",
      name: "string",
      email: "user@example.com",
      cohort: "web+123",
      photo: "https://placehold.co/600",
      role: "student"
    }
  ```
