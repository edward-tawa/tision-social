export interface ScholarshipInterface {
    id: number;
    posterId: number;
    name: string;
    description: string;
    requirements: string[];
    deadline: string;
    amount: number;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}