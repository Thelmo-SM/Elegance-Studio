

interface Props extends React.LabelHTMLAttributes<HTMLLabelElement> {
    customClass?: string;
};

export const LabelForm = ({children, ...props}: Props) => {
    return (
        <label 
        htmlFor="" 
        {...props}
        className="text-p-basico text-[1.5rem] lg:text-[2rem] mt-[1.4rem] sm:text-left text-center">
            {children}
        </label>
    );
};