import React, { useEffect, useState } from 'react'
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { LocalUserType } from '@/app/(dashboard)/admin/settings/manage-profile/page';
const Topbar = () => {

    const [user, setuser] = useState<LocalUserType | null>()

    useEffect(() => {
        const userFromLocal = localStorage.getItem("user");
        if (userFromLocal) {
            setuser(JSON.parse(userFromLocal));
        }
    }, [])

    return (
        <div>
            <div className="flex justify-between items-center p-3 border-b">
                <span className="font-playfairdisplay font-medium text-2xl" >Pink Amethyst</span>
                <div className="flex items-center gap-3">
                    <div className="">
                        <Avatar>
                            <AvatarImage src={user && user.image ? user.image : "https://github.com/shadcn.png"} alt="User Profile" />
                            <AvatarFallback>PK</AvatarFallback>
                        </Avatar>
                    </div>
                    <div className="text-sm">
                        <span className="font-semibold">{user && user.name ? user.name : ""}</span>
                        <p className='capitalize' >{user && user.role ? user.role : ""}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Topbar