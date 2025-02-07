import { Timestamp } from "firebase/firestore";
//usuario form
export type userTypes = {
    uid?: string
    name: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    phone: string;
};

export type users = {
  name: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  role: string
};

//usuario DB
export type userData = {
  uid: string
  name: string;
  lastName: string;
  email: string;
  phone: string;
  createdAt: Timestamp
  role: string
}
export type ServiceFormFunction = (email: string, password: string, formData: userData) => Promise<{ success: boolean; user: userData; error?: unknown }>;


//validate users from
export type FormErrors = {
    [key in keyof userTypes]?: string;
  };

  //login users
  export type loginTypes = {
    email: string;
    password: string
  }

  export type loginFormFunction = (formData: loginTypes) => Promise <{success: boolean, user:loginTypes; error?: unknown }>
  
  //validate login users
  export type loginErrors = {
    [key in keyof loginTypes]?: string
  };