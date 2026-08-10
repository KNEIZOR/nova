export interface CreateRequestData {
    name: string;
    phone: string;
    area?: number | null;
    service: string;
    comment?: string;
}

export interface CreateRequestResponse {
    id: number;
    message: string;
}
