

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    customClass?: string;
};

export const ButtonApointments = ({ children, customClass, ...props }: Props) => {
    return (
        <button 
        {...props}
        className={`text-p-basico bg-btR py-3 px-8 rounded-[0.25rem] mt-[5rem] md:mt-[10rem] hover:bg-ct transition duration-[200ms] flex items-center justify-center mx-auto lg:mx-0
             ${customClass}`}
        >
            {children}
        </button>
    );
};

export const ButtonSubmit = ({ children, customClass, ...props }: Props) => {
    return (
        <button 
        {...props}
        className={`text-p-basico text-[2rem] bg-caja py-[1rem] px-8  mt-[1rem] w-[80%]
             ${customClass}`}
        >
            {children}
        </button>
    );
};