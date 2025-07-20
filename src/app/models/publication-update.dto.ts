export interface PublicationUpdateDto {
    publicationId: number;
    title: string;
    city: string;
    postalCode: string;
    street: string;
    description: string;
    illustrations: string[];
}