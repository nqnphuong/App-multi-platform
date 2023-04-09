interface IRegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
}

interface ILoginRequest {
  userName: string;
  password: string;
}

export type {IRegisterRequest, ILoginRequest};
