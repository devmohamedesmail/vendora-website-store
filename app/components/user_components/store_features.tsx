import React from 'react'
import { TbTruckDelivery } from "react-icons/tb";
import { BiSolidOffer } from "react-icons/bi";
import { IoReturnDownBack } from "react-icons/io5";
import { MdOutlinePayment } from "react-icons/md";
import { useTranslation } from 'react-i18next';

export default function Store_Features() {
    const { t } = useTranslation();
    return (
        <div className='bg-black py-4'>
            <div className="container m-auto grid grid-cols-4">
                <div className="item flex flex-col items-center gap-2">
                    <TbTruckDelivery color='white' size={40} />
                    <p className='text-white text-sm'>{t('common.fastdelivery')}</p>
                </div>
                <div className="item flex flex-col items-center gap-2">
                    <BiSolidOffer color='white' size={40} />
                    <p className='text-white text-sm'>{t('common.bestoffer')}</p>
                </div>
                <div className="item flex flex-col items-center gap-2">
                    <IoReturnDownBack color='white' size={40} />
                    <p className='text-white text-sm'>{t('common.easyreturn')}</p>
                </div>
                <div className="item flex flex-col items-center gap-2">
                    <MdOutlinePayment color='white' size={40} />
                    <p className='text-white text-sm'>{t('common.securepayment')}</p>
                </div>

            </div>
        </div>
    )
}
