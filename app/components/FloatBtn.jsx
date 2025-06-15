import React, { useState } from "react";
import { FiShoppingCart, FiUser, FiHeart, FiHome, FiSettings, FiPlus } from "react-icons/fi";



function FloatBtn() {
    const [open, setOpen] = useState(false);
    const radius = 110;
    const menuItems = [
        {
            href: "/",
            icon: <FiHome size={22} />,
            color: "bg-indigo-600 text-white border-indigo-200",
            label: "Shop",
            angle: 180,
        },
        {
            href: "/cart",
            icon: <FiShoppingCart size={22} />,
            color: "bg-indigo-500 text-white border-indigo-200",
            label: "Cart",
            angle: 135,
        },
        {
            href: "/wishlist",
            icon: <FiHeart size={22} />,
            color: "bg-pink-500 text-white border-pink-200",
            label: "Wishlist",
            angle: 90,
        },
        {
            href: "/account",
            icon: <FiUser size={22} />,
            color: "bg-gray-700 text-white border-gray-200",
            label: "Account",
            angle: 45,
        },
        {
            href: "/settings",
            icon: <FiSettings size={22} />,
            color: "bg-yellow-400 text-white border-yellow-200",
            label: "Settings",
            angle: 0,
        },
    ];
    return (
        <div className="fixed bottom-0  left-1/2 z-50 flex flex-col items-center justify-center" style={{ transform: "translateX(-50%)" }}>
            {/* Main Floating Button */}
            <button
                onClick={() => setOpen((v) => !v)}
                className="bg-gradient-to-tr from-indigo-500 to-indigo-700 hover:from-indigo-600 hover:to-indigo-800 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-2xl transition-all duration-300 focus:outline-none border-4 border-white fixed left-1/2 bottom-8 transform -translate-x-1/2"
                aria-label="Open menu"
                style={{ zIndex: 2 }}
            >
                <FiPlus size={32} className={`transform transition-transform duration-300 ${open ? "rotate-45" : ""}`} />
            </button>

            {/* Animated Half Circle Menu */}
            <div className="relative w-[260px] h-[140px] pointer-events-none">
                {menuItems.map((item, idx) => {
                    // Calculate position in half-circle (in radians)
                    const angle = (item.angle * Math.PI) / 180;
                    const x = radius * Math.cos(angle);
                    const y = radius * Math.sin(angle);

                    return (
                        <a
                            key={item.label}
                            href={item.href}
                            className={`pointer-events-auto absolute transition-all duration-500 ease-out
                ${open ? "opacity-100 scale-100" : "opacity-0 scale-0"}
                ${item.color}
                border-4 shadow-xl flex items-center justify-center
                hover:scale-110`}
                            style={{
                                left: `calc(50% + ${x}px - 32px)`,
                                bottom: `${y + 8}px`,
                                width: 64,
                                height: 64,
                                borderRadius: "50%",
                                transitionDelay: open ? `${idx * 60}ms` : "0ms",
                            }}
                            title={item.label}
                        >
                            {item.icon}
                        </a>
                    );
                })}
            </div>
        </div>

    )
}

export default FloatBtn