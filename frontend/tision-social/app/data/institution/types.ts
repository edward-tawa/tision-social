export interface InstitutionInterface {
    id: number;
    name: string;
    location: string;
    description?: string;
    offers: string[];
    logoUrl?: string;
    websiteUrl?: string;
    address?: string;
    phone?: string;
    email?: string;
    createdAt: Date;
    updatedAt: Date;
    isActive: boolean;
    verified: boolean;
}

