export interface CommentGetDto {
    id: number
    body: string;
    parentId: number;
    parentCommentId: number;
    author: {
        id: number;
        firstname: string;
        lastname: string;
        pseudonym: string;
        picture: string;
    }
}