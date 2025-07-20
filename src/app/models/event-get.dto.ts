import { AuthorDto } from "./author.dto";
import { ParticipantDto } from "./event-participant.dto";

export interface EventGetDto {
    id: number;
    title: string;
    city: string;
    postalCode: string;
    street: string;
    latitude: number;
    longitude: number;
    startDate: Date;
    endDate: Date;
    description: string;
    eventDate: Date;
    illustrations: string[];
    participants: ParticipantDto[];
    author: AuthorDto;
    likes: number[];
    creationDate: Date;
}
