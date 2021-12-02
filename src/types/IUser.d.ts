import {UserRole} from '../enums/UserRole';
export interface IUser {
    userId: string,
    userName?:string,
    email: string,
    roleId: UserRole,
    accessToken: string
}


