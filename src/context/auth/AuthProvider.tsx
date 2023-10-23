import { useMemo, useState } from 'react';
import ProviderProps from '../ProviderProps';
import { User } from '@/data/models/User';
import api from '@/services/api';
import { useCookies, useToast } from '@/hooks';
import { AxiosError, AxiosResponse } from 'axios';
import AuthContext, { AuthContextType } from './AuthContext';

const AuthProvider = ({ children }: ProviderProps) => {
    const [user, setUser] = useState<(Omit<User, 'password'> & {[id: string]: string}) | null>(null);
    const isAuthenticated = !!user;

    const { saveCookie, deleteCookies, getCookie } = useCookies();

    const { changeConfigToast, showToast, toast } = useToast({
        isVisible: false,
        message: 'Toast',
        type: 'success'
    });


    const signIn = async ({ email, password }: Omit<User, 'name'>) => {
        try {
            const response = await api.post('/login/', {
                email,
                password,
            });
    
            const responseJSON = response.data;
    
            if (response.status !== 200) {
                changeConfigToast({
                    message: responseJSON.body.error,
                    type: 'error',
                });
                showToast();
    
                return;
            }
            saveCookie('token', responseJSON.body.content.token);

            setUser(responseJSON.body.content.userInfo);
        } catch(e) {
            if (!((e as unknown as AxiosError).response as AxiosResponse)) {
                changeConfigToast({
                    message: 'Erro interno, tente novamente mais tarde.',
                    type: 'error',
                });
            } else {
                changeConfigToast({
                    message: ((e as unknown as AxiosError).response as AxiosResponse).data.body.error,
                    type: 'error',
                });
            }
            showToast();
        }

    };


    const signOut = () => {
        deleteCookies('token');
    }

    const context: AuthContextType = useMemo(() => ({
        isAuthenticated,
        signIn,
        signOut,
        user
    }), [isAuthenticated, signIn, signOut, user]);

    return (
        <AuthContext.Provider value={context}>
            {toast()}
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;
