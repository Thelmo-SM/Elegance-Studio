
interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    customClass?: string;
}

export const InputUi = (props: Props) => {
    return (
        <input
        className="bg-caja2 w-full my-[0.5rem] h-[2rem] pl-8 rounded-[.2rem] py-[1rem] text-p-basico placeholder-center"
        {...props}
    />
    );
};
