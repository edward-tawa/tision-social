export interface EducationInterface {
    id: number,
    userId: number,
    institution: string,
    role: string,
    location: string,
    startDate: string,
    endDate: string,
    qualifications: string[],
}