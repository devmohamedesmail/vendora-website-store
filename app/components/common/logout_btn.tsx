import React, { useContext } from 'react'
import { FiLogOut } from 'react-icons/fi';
import { AuthContext } from '../../context/auth_context';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import { useRouter } from 'next/navigation'
export default function Logout_Btn() {
    const { auth, handle_logout } = useContext(AuthContext);
    const {t}=useTranslation();
     const router = useRouter()



    const handle_logout_user = async () => {
        try {
            await handle_logout();
            toast.success(t('auth.logout_success'))
            router.push('/'); // Redirect to home page after logout
        } catch (error) {
            toast.error(t('auth.logout_error'));
        }
    };
    return (
        <button
             onClick={()=>handle_logout_user()}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-50 text-red-600 font-medium border border-red-100 hover:bg-red-100 transition-all duration-200"
        >
            <FiLogOut className="w-4 h-4" />
            <span className="hidden sm:inline">{t('auth.logout')}</span>
        </button>
    )
}
