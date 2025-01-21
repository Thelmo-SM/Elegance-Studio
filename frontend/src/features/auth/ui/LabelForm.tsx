

interface Props extends React.LabelHTMLAttributes<HTMLLabelElement> {};

export const LabelForm = ({children, ...props}: Props) => {
    return (
        <label 
        htmlFor="" 
        {...props}
        className="text-p-basico text-[2rem] mt-[1.4rem]">
            {children}
        </label>
    );
};