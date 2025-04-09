export interface EventGetDto {
    id: number;
    title: string;
    city: string;
    postalCode: string;
    street: string;
    startDate: Date;
    endDate: Date;
    description: string;
    publicationDate: Date;
    author: {
        id: number;
        lastname: string;
        firstname: string;
        pseudonym: string;
        roles: Array<Object>;
        city: string;
        postalCode: string;
        street: string;
        isInCity: boolean;
        birthdate: any;
        introduction: string;
        phone: string;
        picture: string;
        notificationPreferences: boolean;
        contacts: any;
        registrationDate: Date;
        withdrawalDate: null;
        withdrawalReason: null;
        lastActivityDate: any;
        enabled: boolean;
        accountNonExpired: boolean;
        credentialsNonExpired: boolean;
        username: string;
        authorities: Array<Object>;
        accountNonLocked: boolean;
    };
}
