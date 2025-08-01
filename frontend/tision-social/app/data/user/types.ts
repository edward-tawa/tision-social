export interface UserInterface {
    id: number;
    firstname: string;
    lastname: string;
    username: string;
    email: string;
    password: string;
}
export type PublicUser = Omit<UserInterface, "password">