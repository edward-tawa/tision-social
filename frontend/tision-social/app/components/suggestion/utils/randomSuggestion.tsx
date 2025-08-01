export const randomSuggestion = (array: any, size: number): any => {
    const shuffled = [...array].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, size);
}