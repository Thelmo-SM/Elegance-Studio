

interface Props extends React.SelectHTMLAttributes<HTMLSelectElement> {
    customClass?: string;
};

export const SelectApointmets = ({children, ...props}: Props) => {
    return (
        <select 
        {...props}
        className="text-black text-[1rem] lg:text-[1.3rem] mt-[.3rem] sm:text-left text-center">
            {children}
        </select>
    );
};