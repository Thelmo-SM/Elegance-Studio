
interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    customClass?: string;
}

export const InputForm = (props: Props) => {
    return (
        <input
            className="bg-p-basico w-full my-[0.5rem] h-[2rem] pl-8 rounded-[.2rem] py-[1.5rem] md:py-[1rem]"
            {...props}
        />
    );
};
