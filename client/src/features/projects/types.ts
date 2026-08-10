export interface Project {
    id: number;
    title: string;
    slug: string;
    description: string;
    city: string;
    area: number;
    category: string;
    image: string;
    images: string[];
    isPublished: boolean;
    sortOrder: number;
}
