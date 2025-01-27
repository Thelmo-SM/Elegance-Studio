

interface Props extends React.LabelHTMLAttributes<HTMLLabelElement> {
    customClass?: string;
};

export const LabelApointmets = ({children, ...props}: Props) => {
    return (
        <label 
        htmlFor="" 
        {...props}
        className="text-p-basico text-[1.3rem] lg:text-[1.3rem] mt-[1.4rem] sm:text-left text-center">
            {children}
        </label>
    );
};