import { User } from "@/data/models/User"

export type UserInfo = Omit<User, 'password'> & {
    id: string
}