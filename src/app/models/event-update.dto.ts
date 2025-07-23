export interface EventUpdateDto {
    eventId: number;
    title: string;
    city: string;
    postalCode: string;
    street: string;
    startDate: Date;
    endDate: Date;
    description: string;
    illustrations: string[];
}