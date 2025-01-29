
interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    customClass?: string;
};

export const ButtonForm = ({ children, customClass, ...props }: Props) => {
    return (
        <button 
        {...props}
        {...props}
        className={`lg:py-[1.5rem] py-[1rem] text-p-basico text-[2.2rem] md:py-[1rem] w-full h-[5rem] rounded-[.2rem] mt-auto ${customClass}`}
        >
            {children}
        </button>
    );
};