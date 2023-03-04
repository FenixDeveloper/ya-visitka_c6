# ya-visitka_c6
Репозиторий третьего проектного месяца для когорты 6, проект "Визитница" для Яндекс.Практикум

## Описание сервиса по загрузке файлов

- PATCH api/info/file
   Маршрут доступен для авторизованных пользователей. Тело запроса в формате formData
   пример:

```
const formData = new FormData();
formData.append('job', files[0]);
formData.append('status', files[1]);
formData.append('edu', files[2]);
formData.append('hobby', files[3]);
```

Допускается отправка отдельных файлов, не обязательно все 4 указывать.

Результат запроса:

```
{
    "hobby": {
        "file": "temp/8b19aa0033f0120eb7d38a12851ebbf7"
    }
}
```

- PATCH api/profile/:id
   полученные ссылки на временные файлы устанавливаются в image

```
...
"info":{
  "hobby":{
    "text":"", //текстовая информация
    "image":temp/8b19aa0033f0120eb7d38a12851ebbf7, // временная ссылка на файл
    ...
```

Результат:
возвращается info с уже замененными временными ссылками на постоянные

```
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
```
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

1. Получение токена:

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

2. Полученный в ответе токен должен присутствовать в загловках при каждом запросе.

    ```bash
    "Authorization": "Bearer ..."
    ```

3. Получение информации о текущем пользователе

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
