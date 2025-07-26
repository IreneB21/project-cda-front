export interface ProfileUpdateDto {
    id: number;
    firstname: string;
    lastname: string;
    pseudonym: string;
    email: string;
    password?: string;
    city: string;
    postalCode: string;
    street: string;
    isInCity: boolean;
    birthdate: Date;
    phone: string;
}