export type APIRequestSignUp = {
  name: string;
  email: string;
  password: string;
};

export type APIResponseSignUp = APIRequestSignUp & {};

export type APIRequestLogin = {
  email: string;
  password: string;
};

export type APIResponseLogin = APIRequestLogin & {};
