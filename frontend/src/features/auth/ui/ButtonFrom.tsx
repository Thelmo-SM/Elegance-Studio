
interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    customClass?: string;
};

export const ButtonForm = ({ children, customClass, ...props }: Props) => {
    return (
        <button 
        {...props}
        {...props}
        className={`text-p-basico text-[2.2rem] py-[1rem] w-full rounded-[.2rem] mt-auto ${customClass}`}
        >
            {children}
        </button>
    );
};