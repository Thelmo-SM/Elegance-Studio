
interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {};

export const ButtonForm = ({children, ...props}: Props) => {
    return (
        <button 
        {...props}
        className="bg-caja2 text-p-basico text-[2.2rem] py-[1rem] w-full rounded-[.2rem]  mt-auto">
            {children}
        </button>
    );
};