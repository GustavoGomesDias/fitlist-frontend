import { createContext } from 'react';
import { User } from '@/data/models/User';

export interface AuthContextType {
    isAuthenticated: boolean
    signIn({email, password}: Omit<User, 'name'>): Promise<void>
    signOut(): void
    user: (Omit<User, 'password'> & {[id: string]: string}) | null
}

const AuthContext = createContext({} as AuthContextType);

export default AuthContext;