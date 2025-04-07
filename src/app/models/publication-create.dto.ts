export interface PublicationCreateDto {
    title: string;
    city: string;
    zipCode: string;
    street: string;
    description: string;
    illustrations: string[];
    authorId: number;
    category: string;
}