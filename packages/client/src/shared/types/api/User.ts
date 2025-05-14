export interface User {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string;
  phone: string;
  login: string;
  avatar: string;
  email: string;
}

export interface SignInProps {
  login: string;
  password: string;
}

export interface SignUpProps {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
}

export interface PasswordProps {
  oldPassword: string;
  newPassword: string;
}
