import { useState, MouseEvent, useEffect, ChangeEvent, FormEvent } from 'react';
import { SettingSection } from '../Settings/SettingSection';
import { Button, Input } from '../UI';
import style from './AccountPanel.module.css';
import Image from 'next/image';
import { useAuth, useCookies } from '@/hooks';
import { UserInfo } from '@/context/types';

export interface AccountPanelProps { }

export const AccountPanel = (): JSX.Element => {

    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [readOnly, setReadOnly] = useState<boolean>(true)

    const { getCookie } = useCookies();
    const userJson = getCookie('user');

    const user = JSON.parse(userJson) as unknown as UserInfo;
    useEffect(() => {
        setName(user.name);
        setEmail(user.email);
    }, []);

    const handleEdit = (e: MouseEvent<HTMLImageElement | HTMLButtonElement>) => {
        e.preventDefault();

        setReadOnly(false);
    }

    const handleOnlyShowInfo = (e: MouseEvent<HTMLImageElement | HTMLButtonElement>) => {
        e.preventDefault();

        setName(user.name);
        setEmail(user.email);

        setReadOnly(true);
    }


    const handleChangeField = (e: ChangeEvent<HTMLInputElement>, type: 'name' | 'email') => {
        e.preventDefault();
        if (type === 'name') setName(e.target.value);
        else setEmail(e.target.value);
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        console.log(name);
        console.log(email);
    }

    return (
        <SettingSection
            component={
                <>
                    <div className={style['fl-settings-account-mode']}>
                        <Image src="/images/edit.svg" alt='Edit icon' width={25} height={25} onClick={(e) => handleEdit(e)} />
                        <Image src="/images/eye.svg" alt='Only Show Info icon' width={25} height={25} onClick={(e) => handleOnlyShowInfo(e)} />
                        <span>- Modo {readOnly ? 'Visualização' : 'Edição'}</span>
                    </div>
                    <form className={style['fl-settings-account']} id="edit-account-info" onSubmit={(e) => handleSubmit(e)}>
                        <label htmlFor="name">Nome</label>
                        <Input
                            id='name'
                            name='name'
                            onChangeHandle={(e) => handleChangeField(e, 'name')}
                            placeholder='Nome'
                            value={name}
                            readonly={readOnly}
                        />
                        <label htmlFor="email">E-mail</label>
                        <Input
                            id='email'
                            name='email'
                            onChangeHandle={(e) => handleChangeField(e, 'email')}
                            placeholder='E-mail'
                            value={email}
                            readonly={readOnly}
                        />

                        {!readOnly && <div className={style['fl-settings-account-btn-group']}>
                            <Button
                                classType='success'
                                id='edit-account-info'
                                text='Salvar'
                                type='submit'
                            />
                            <Button
                                classType='normal'
                                id='edit-account-info'
                                text='Cancelar'
                                type='button'
                                onClick={(e) => handleOnlyShowInfo(e)}
                            />
                        </div>}
                    </form>
                </>
            }
            dropdownProps={{
                hasDropdown: false,
            }}
            title='Configurações de conta'
        />
    );
}