export interface UserGetForVisitorDto {
  id: number;
  lastname: string;
  firstname: string;
  pseudonym: string;
  introduction: string;
  picture: string;
  registrationDate: Date;
}