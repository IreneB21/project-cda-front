export interface ProfileUpdateDto {
    userId: number;
    lastname: string;
    firstname: string;
    pseudonym: string;
    password?: string;
    email: string;
    city: string;
    postalCode: string;
    street: string;
    isInCity: boolean;
    birthdate: Date;
    phone: string;
}