

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    customClass?: string;
};

/*export const ButtonApointments = ({ children, customClass, ...props }: Props) => {
    return (
        <button 
        {...props}
        className={`text-p-basico bg-btR py-3 px-8 rounded-[0.25rem] mt-[5rem] md:mt-[10rem] hover:bg-ct transition duration-[200ms] flex items-center justify-center mx-auto lg:mx-0
             ${customClass}`}
        >
            {children}
        </button>
    );
};*/

export const ButtonSubmitUi = ({ children, customClass, ...props }: Props) => {
    return (
        <button 
        {...props}
        className={` lg:py-[1.5rem] py-[1rem] text-p-basico text-[2.2rem] md:py-[1rem] w-[30%] h-[5rem] rounded-[.2rem] mt-auto bg-caja  mx-auto my-auto
             ${customClass}`}
        >
            {children}
        </button>
    );
};

export const ButtonForm = ({ children, customClass, ...props }: Props) => {
    return (
        <button 
        {...props}
        {...props}
        className={` lg:py-[1.5rem] py-[0rem] text-p-basico text-[1.5rem] lg:text-[2.2rem] md:py-[1rem] w-full h-[3rem] md:h-[5rem] mb-[.5rem] md:mb-0 rounded-[.2rem] mt-auto ${customClass}`}
        >
            {children}
        </button>
    );
};