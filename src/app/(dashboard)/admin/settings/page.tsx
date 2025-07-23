import Link from 'next/link'
import React from 'react'

const SettingPage = () => {
    return (
        <>
            <h2 className='text-3xl font-bold font-playfairdisplay mb-10'>Settings</h2>
            <div className="bg-white">
                <div className='flex flex-col gap-4' >
                    <Link href={"/admin/settings/manage-profile"} className="flex gap-4 items-center border border-black p-3 rounded-md">
                        <div>
                            <svg width="35" height="36" viewBox="0 0 35 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5.83325 26.6497C5.83325 25.1026 6.44783 23.6189 7.5418 22.5249C8.63576 21.431 10.1195 20.8164 11.6666 20.8164H23.3333C24.8803 20.8164 26.3641 21.431 27.458 22.5249C28.552 23.6189 29.1666 25.1026 29.1666 26.6497C29.1666 27.4233 28.8593 28.1652 28.3123 28.7121C27.7653 29.2591 27.0235 29.5664 26.2499 29.5664H8.74992C7.97637 29.5664 7.2345 29.2591 6.68752 28.7121C6.14054 28.1652 5.83325 27.4233 5.83325 26.6497Z" stroke="#805387" strokeWidth="3" strokeLinejoin="round" />
                                <path d="M17.5 14.9824C19.9162 14.9824 21.875 13.0237 21.875 10.6074C21.875 8.19118 19.9162 6.23242 17.5 6.23242C15.0838 6.23242 13.125 8.19118 13.125 10.6074C13.125 13.0237 15.0838 14.9824 17.5 14.9824Z" stroke="#805387" strokeWidth="3" />
                            </svg>
                        </div>
                        <span>
                            <h4 className='font-playfairdisplay text-xl font-bold' >Manage Profile</h4>
                            <p className='font-playfairdisplay' >Change your personal details</p>
                        </span>
                    </Link>
                    <Link href={"/admin/settings/manage-password"} className="flex gap-4 items-center border border-black p-3 rounded-md">
                        <div>
                            <svg width="24" height="32" viewBox="0 0 24 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M11.6667 23.9193C10.8931 23.9193 10.1513 23.612 9.60427 23.065C9.05729 22.518 8.75 21.7762 8.75 21.0026C8.75 19.3839 10.0479 18.0859 11.6667 18.0859C12.4402 18.0859 13.1821 18.3932 13.7291 18.9402C14.276 19.4872 14.5833 20.2291 14.5833 21.0026C14.5833 21.7762 14.276 22.518 13.7291 23.065C13.1821 23.612 12.4402 23.9193 11.6667 23.9193ZM20.4167 28.2943V13.7109H2.91667V28.2943H20.4167ZM20.4167 10.7943C21.1902 10.7943 21.9321 11.1016 22.4791 11.6485C23.026 12.1955 23.3333 12.9374 23.3333 13.7109V28.2943C23.3333 29.0678 23.026 29.8097 22.4791 30.3567C21.9321 30.9036 21.1902 31.2109 20.4167 31.2109H2.91667C2.14312 31.2109 1.40125 30.9036 0.854272 30.3567C0.307291 29.8097 0 29.0678 0 28.2943V13.7109C0 12.0922 1.29792 10.7943 2.91667 10.7943H4.375V7.8776C4.375 5.94373 5.14323 4.08907 6.51068 2.72162C7.87813 1.35416 9.7328 0.585938 11.6667 0.585938C12.6242 0.585937 13.5724 0.774542 14.4571 1.14098C15.3417 1.50742 16.1456 2.04452 16.8227 2.72162C17.4997 3.39871 18.0368 4.20254 18.4033 5.0872C18.7697 5.97187 18.9583 6.92005 18.9583 7.8776V10.7943H20.4167ZM11.6667 3.5026C10.5063 3.5026 9.39355 3.96354 8.57307 4.78401C7.7526 5.60448 7.29167 6.71728 7.29167 7.8776V10.7943H16.0417V7.8776C16.0417 6.71728 15.5807 5.60448 14.7603 4.78401C13.9398 3.96354 12.827 3.5026 11.6667 3.5026Z" fill="#805387" />
                            </svg>

                        </div>
                        <span>
                            <h4 className='font-playfairdisplay text-xl font-bold' >Manage Password</h4>
                            <p className='font-playfairdisplay' >Change your password</p>
                        </span>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default SettingPage