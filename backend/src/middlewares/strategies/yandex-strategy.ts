import { StrategyCreated } from 'passport';
import { Request } from 'express';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'isomorphic-fetch';

interface YandexStrategyVerifyFn {
  // eslint-disable-next-line no-unused-vars,no-shadow
  (user: any, callback: (err: string | null, user?: any) => void): void;
}

interface YandexStrategyOptions {
  clientID: string;
  clientSecret: string;
  callbackUri?: string;
}

// eslint-disable-next-line import/prefer-default-export
export class YandexStrategy {
  /* Если указать свойство name при регистрации стратегии необязательно передавать его */
  public name = 'yandex';

  public oauthURL = new URL('https://oauth.yandex.ru/authorize?response_type=code');

  public tokenURL = new URL('https://oauth.yandex.ru/token');

  public profileURL = new URL('https://login.yandex.ru/info?format=json');

  public clientID: string;

  public clientSecret: string;

  public verify: YandexStrategyVerifyFn;

  constructor(
    { clientID, clientSecret, callbackUri }: YandexStrategyOptions,
    verify: YandexStrategyVerifyFn,
  ) {
    this.clientID = clientID;
    this.clientSecret = clientSecret;
    this.verify = verify;
    this.oauthURL.searchParams.append('client_id', clientID);
    if (callbackUri) {
      this.oauthURL.searchParams.append('redirect_uri', callbackUri);
    }
  }

  async authenticate(this: StrategyCreated<this>, req: Request) {
    const code = req.query.code as string;

    if (code) {
      // отправьте запрос для получения токена с помощью функции fetch
      // а затем получите данные пользователя и передайте из в this.success
      const response = await fetch(this.tokenURL.toString(), {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          grant_type: 'authorization_code',
          code,
          client_id: this.clientID,
          client_secret: this.clientSecret,
        }),
      });
      // eslint-disable-next-line camelcase
      const { access_token } = await response.json();
      const userResponse = await fetch(this.profileURL.toString(), {
        // eslint-disable-next-line camelcase
        headers: { Authorization: `OAuth ${access_token}` },
      });
      const userInfo = await userResponse.json();
      const onVerify = (err: string | null, user?: any) => {
        if (err) {
          this.fail(err);
          return;
        }
        // eslint-disable-next-line camelcase
        this.success({ token: access_token, user });
      };
      this.verify(userInfo, onVerify);
    } else {
      this.redirect(this.oauthURL.toString());
    }
  }
}
