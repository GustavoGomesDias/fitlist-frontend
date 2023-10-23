import { createContext } from 'react';
import { User } from '@/data/models/User';
import { UserInfo } from '@/context/types';

export interface AuthContextType {
    isAuthenticated: boolean
    signIn({email, password}: Omit<User, 'name'>): Promise<void>
    signOut(): void
    user: UserInfo
}

const AuthContext = createContext({} as AuthContextType);

export default AuthContext;