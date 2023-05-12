export interface SignUpRequest {
  name: string;
  email: string;
  password: string;
}

export interface SignUpResponse extends SignUpRequest {}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse extends LoginRequest {}
