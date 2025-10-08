export interface ExperienceInterface {
    id: number,
    userId: number,
    company: string,
    role: string,
    location: string,
    startDate: string,
    endDate: string,
    description: string[],
    technologies: string[],
}