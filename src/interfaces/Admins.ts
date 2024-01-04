export interface Admin {
  adminId: number | null;
  name: string | null;
  lastname: string | null;
  email: string | null;
  password: string | null;
  role: string | null;
  image: string | null;
  imgId: string | null;
  createdAt: string | null;
  updateAt: string | null; // Puedes cambiar esto según el formato de fecha y hora que estés utilizando
}

export interface Params {
  params: {adminId: string}
}

export interface ParamsEmail {
  params: {adminProfileId: string}
}
