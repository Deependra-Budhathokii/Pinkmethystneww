type SectionTopTypes = {
    primary: string,
    secondary: string,
    description: string
}

const SectionTop = ({ title }: { title: SectionTopTypes }) => {
    return (
        <div className="mb-8 sm:mb-16" >
            <h2 className="text-[40px] mb-4 max-w-fit relative before:absolute before:content-[''] before:h-[1px] before:bg-[#2F2F2F] before:w-full before:bottom-1">{title.primary} <span className="text-[28px]">{title.secondary}</span></h2>
            <p>{title.description}</p>
        </div>
    )
}

export default SectionTop