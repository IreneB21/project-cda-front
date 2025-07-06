import { AuthorDto } from "./event-author.dto";

export interface PublicationGetDto {
    id: number;
    title: string;
    category: string;
    city: string;
    postalCode: string;
    street: string;
    latitude: number;
    longitude: number;
    description: string;
    illustrations: string[];
    author: AuthorDto;
    likes: number[];
    publicationDate: Date;
}