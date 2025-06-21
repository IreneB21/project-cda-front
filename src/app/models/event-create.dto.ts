export interface EventCreateDto {
    title: string;
    city: string;
    postalCode: string;
    street: string;
    startDate: string; // ISO format (LocalDateTime côté Java)
    endDate: string;   // idem
    description: string;
    illustrations: string[];
    authorId: number;
}
  