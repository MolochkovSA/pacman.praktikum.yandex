export interface SignInDto {
  login: string;
  password: string;
}

export interface SignUpRequestDto {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  phone: string;
  password: string;
}

export interface SignUpResponseDto {
  id: number;
}

export interface SignInWithYandexRequestDto {
  code: string;
  redirect_uri: string;
}
