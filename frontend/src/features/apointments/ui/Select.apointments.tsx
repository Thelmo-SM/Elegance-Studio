

interface Props extends React.SelectHTMLAttributes<HTMLSelectElement> {
    customClass?: string;
};

export const SelectApointmets = ({children, ...props}: Props) => {
    return (
        <select 
        {...props}
        className="text-p-basico pl-[2rem] text-[1rem] lg:text-[1.3rem] mt-[.3rem] sm:text-left text-center bg-caja w-[70%] p-[.5rem] rounded">
            {children}
        </select>
    );
};