export interface Service {
    id: number;
    title: string;
    slug: string;
    shortDescription: string;
    description: string;
    priceFrom: number | null;
    image: string | null;
    features: string[];
    isActive: boolean;
    sortOrder: number;
}
