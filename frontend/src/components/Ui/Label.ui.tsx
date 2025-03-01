

interface Props extends React.LabelHTMLAttributes<HTMLLabelElement> {
    customClass?: string;
};

export const LabelUi = ({children, ...props}: Props) => {
    return (
        <label  
        {...props}
        className="text-p-basico text-[1.3rem] lg:text-[2rem] mt-[.5rem] sm:text-left text-center">
            {children}
        </label>
    );
};