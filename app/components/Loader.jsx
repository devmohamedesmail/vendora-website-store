import React from 'react'

'use client'
import React from 'react'
import { useTranslation } from 'react-i18next'

export default function Loader() {
    const { t } = useTranslation();
    
    return (
        <div className='flex justify-center items-center h-screen bg-gray-900'>
            <div className="relative">
                {/* Smoke Animation Container */}
                <div className="smoke-container">
                    {/* Vape Device */}
                    <div className="vape-device">
                        <div className="device-body bg-gradient-to-b from-gray-600 to-gray-800 rounded-lg"></div>
                        <div className="device-tip bg-gray-400 rounded-full"></div>
                        <div className="led-light bg-blue-400 rounded-full animate-pulse"></div>
                    </div>
                    
                    {/* Smoke Particles */}
                    <div className="smoke-particle smoke-1"></div>
                    <div className="smoke-particle smoke-2"></div>
                    <div className="smoke-particle smoke-3"></div>
                    <div className="smoke-particle smoke-4"></div>
                    <div className="smoke-particle smoke-5"></div>
                </div>
                
                {/* Loading Text */}
                <div className="mt-8 text-center">
                    <p className="text-white text-lg font-semibold animate-pulse">{t('common.loading', 'Loading...')}</p>
                </div>
            </div>
            
            <style jsx>{`
                .smoke-container {
                    position: relative;
                    width: 200px;
                    height: 300px;
                }
                
                .vape-device {
                    position: absolute;
                    bottom: 0;
                    left: 50%;
                    transform: translateX(-50%);
                    z-index: 10;
                }
                
                .device-body {
                    width: 20px;
                    height: 80px;
                    position: relative;
                }
                
                .device-tip {
                    width: 8px;
                    height: 8px;
                    position: absolute;
                    top: -4px;
                    left: 50%;
                    transform: translateX(-50%);
                }
                
                .led-light {
                    width: 4px;
                    height: 4px;
                    position: absolute;
                    bottom: 10px;
                    left: 50%;
                    transform: translateX(-50%);
                }
                
                .smoke-particle {
                    position: absolute;
                    border-radius: 50%;
                    opacity: 0;
                    background: linear-gradient(45deg, rgba(255,255,255,0.6), rgba(200,200,200,0.3));
                    filter: blur(2px);
                }
                
                .smoke-1 {
                    width: 15px;
                    height: 15px;
                    bottom: 90px;
                    left: 92px;
                    animation: smoke-rise-1 3s infinite;
                }
                
                .smoke-2 {
                    width: 20px;
                    height: 20px;
                    bottom: 85px;
                    left: 88px;
                    animation: smoke-rise-2 3.5s infinite 0.5s;
                }
                
                .smoke-3 {
                    width: 18px;
                    height: 18px;
                    bottom: 80px;
                    left: 95px;
                    animation: smoke-rise-3 4s infinite 1s;
                }
                
                .smoke-4 {
                    width: 12px;
                    height: 12px;
                    bottom: 75px;
                    left: 85px;
                    animation: smoke-rise-4 3.2s infinite 1.5s;
                }
                
                .smoke-5 {
                    width: 25px;
                    height: 25px;
                    bottom: 70px;
                    left: 90px;
                    animation: smoke-rise-5 4.5s infinite 2s;
                }
                
                @keyframes smoke-rise-1 {
                    0% {
                        opacity: 0;
                        transform: translateY(0) translateX(0) scale(0.5);
                    }
                    10% {
                        opacity: 0.8;
                    }
                    50% {
                        opacity: 0.6;
                        transform: translateY(-80px) translateX(-10px) scale(1.2);
                    }
                    100% {
                        opacity: 0;
                        transform: translateY(-150px) translateX(-25px) scale(2);
                    }
                }
                
                @keyframes smoke-rise-2 {
                    0% {
                        opacity: 0;
                        transform: translateY(0) translateX(0) scale(0.5);
                    }
                    10% {
                        opacity: 0.9;
                    }
                    50% {
                        opacity: 0.7;
                        transform: translateY(-90px) translateX(15px) scale(1.3);
                    }
                    100% {
                        opacity: 0;
                        transform: translateY(-160px) translateX(30px) scale(2.2);
                    }
                }
                
                @keyframes smoke-rise-3 {
                    0% {
                        opacity: 0;
                        transform: translateY(0) translateX(0) scale(0.5);
                    }
                    10% {
                        opacity: 0.7;
                    }
                    50% {
                        opacity: 0.5;
                        transform: translateY(-100px) translateX(-20px) scale(1.4);
                    }
                    100% {
                        opacity: 0;
                        transform: translateY(-180px) translateX(-40px) scale(2.5);
                    }
                }
                
                @keyframes smoke-rise-4 {
                    0% {
                        opacity: 0;
                        transform: translateY(0) translateX(0) scale(0.5);
                    }
                    10% {
                        opacity: 0.6;
                    }
                    50% {
                        opacity: 0.4;
                        transform: translateY(-70px) translateX(25px) scale(1.1);
                    }
                    100% {
                        opacity: 0;
                        transform: translateY(-140px) translateX(45px) scale(1.8);
                    }
                }
                
                @keyframes smoke-rise-5 {
                    0% {
                        opacity: 0;
                        transform: translateY(0) translateX(0) scale(0.5);
                    }
                    10% {
                        opacity: 0.8;
                    }
                    50% {
                        opacity: 0.6;
                        transform: translateY(-110px) translateX(5px) scale(1.5);
                    }
                    100% {
                        opacity: 0;
                        transform: translateY(-200px) translateX(10px) scale(3);
                    }
                }
            `}</style>
        </div>
    )
}
