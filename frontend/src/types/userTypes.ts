export type userTypes = {
    name: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    phone: string;
};

export type FormErrors = {
    [key in keyof userTypes]?: string;
  };

  export type loginTypes = {
    email: string;
    password: string
  }

  export type loginErrors = {
    [key in keyof loginTypes]?: string
  };