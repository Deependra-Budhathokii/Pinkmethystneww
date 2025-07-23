import Link from 'next/link'
import React from 'react'

type SectionActionTypes = {
    label: string,
    link: string,
    styles?: string
}

const SectionAction = ({ action }: { action: SectionActionTypes }) => {
    return (
        <Link href={action.link} className={`${action.styles} bg-primary py-2 px-4 rounded-md flex gap-2 items-center justify-center sm:w-max ml-auto mt-5 sm:mt-10`}>
            {action.label}
            <svg width="25" height="18" viewBox="0 0 36 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 9.45898L35 9.45898" stroke="#4A1F6B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M28 1.95996L35 9.45921L28 16.9585" stroke="#4A1F6B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        </Link>
    )
}

export default SectionAction