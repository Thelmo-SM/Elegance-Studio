
interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    customClass?: string;
}

export const InputApointmets = (props: Props) => {
    return (
        <input
            className="bg-caja text-p-basico my-[0.5rem] h-[2rem] pl-8 rounded-[.2rem] py-[1rem] w-[40%]"
            {...props}
        />
    );
};
