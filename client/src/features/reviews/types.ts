export interface Review {
    id: number;
    author: string;
    text: string;
    object: string | null;
    rating: number;
    image: string | null;
    isPublished: boolean;
    sortOrder: number;
}
