

interface Props extends React.OptionHTMLAttributes<HTMLOptionElement> {
    customClass?: string;
};

export const OptionlUi = ({children, ...props}: Props) => {
    return (
        <option 
        {...props}
        className="bg-p-basico text-caja3 text-[1rem] lg:text-[1.3rem] mt-[1.4rem] sm:text-left">
            {children}
        </option>
    );
};