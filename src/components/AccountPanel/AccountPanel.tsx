import { useState, MouseEvent } from 'react';
import { SettingSection } from '../Settings/SettingSection';
import { Button, Input } from '../UI';
import style from './AccountPanel.module.css';
import Image from 'next/image';

export interface AccountPanelProps { }

export const AccountPanel = (): JSX.Element => {
    const [name, setName] = useState<string>('Gustavo');
    const [email, setEmail] = useState<string>('email@email.com');
    const [readOnly, setReadOnly] = useState<boolean>(true)

    const handleEdit = (e: MouseEvent<HTMLImageElement | HTMLButtonElement>) => {
        e.preventDefault();

        setReadOnly(false);
    }

    const handleOnlyShowInfo = (e: MouseEvent<HTMLImageElement | HTMLButtonElement>) => {
        e.preventDefault();

        setReadOnly(true);
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
                    <form className={style['fl-settings-account']} id="edit-account-info">
                        <label htmlFor="name">Nome</label>
                        <Input
                            id='name'
                            name='name'
                            onChangeHandle={() => { }}
                            placeholder='Nome'
                            value={name}
                            readonly={readOnly}
                        />
                        <label htmlFor="email">E-mail</label>
                        <Input
                            id='email'
                            name='email'
                            onChangeHandle={() => { }}
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