// app/appointments/page.tsx
'use client';
import { useFormAppointments } from "../hooks/useForm.appointments";
import { initialValue } from "../helpers/initialValues";
import { validateFormAppointments } from "../helpers/validateForm.appointments";
import Style from '@/styles/modal.apointments.module.css';
import {ButtonSubmitUi, InputUi, LabelUi, OptionlUi, SelectUi} from '@/components/Ui';
import { barbers } from "../helpers/barbers";
import { BranchesService } from "@/services/branchesService";
import useGetServices from "../services/get.services";
import Loading from "@/components/Ui/Loading/loading";

interface ModalApointmentsProps {
    isOpens: boolean;
    closeModal: () => void;
  }

export default function AppointmentsForm({ isOpens, closeModal}: ModalApointmentsProps) {
    const {
        errors,
        form,
        //handleBlur,
        //handleChange,
        handleSubmit,
        loading,
        register
    } = useFormAppointments(initialValue, validateFormAppointments);
    const { branch } = BranchesService()
    const {haircut} = useGetServices();

    // Definición de onSubmit si es necesario:
    const onSubmit = async (formData: typeof form) => {
        console.log("Formulario enviado:", formData);
    };

    return (
        <article className={`${Style.modal} ${isOpens && Style.isOpen}`}>
        <div className={`${Style.modalContainer} flex flex-col items-center p-8`}>
        <button 
        onClick={closeModal}
        className='bg-caja py-[.3rem] px-[1rem] text-[1.5rem] text-p-basico rounded-[.2rem] self-end'
        >
        Cerrar
        </button>
            <h1 className="text-2xl font-bold mb-4">Agenda tu cita en Elegance Studio</h1>
            <form onSubmit={(e) => { handleSubmit(e); onSubmit(form); }} 
    className="grid grid-cols-1 sm:grid-cols-2 gap-4 border border-p-basico rounded-[.3rem] w-full p-4"
>
    <div className="flex flex-col">
        <LabelUi>Sucursal</LabelUi>
    <SelectUi {...register('branch')} className="p-2 border rounded-md">
                            <OptionlUi value="">Selecciona una sucursal</OptionlUi>
                            {branch.map((branch) => (
                                <OptionlUi key={branch.id} value={branch.id}>
                                    {branch.name}
                                </OptionlUi>
                            ))}
                        </SelectUi>
        {errors.branch && <p className='bg-red-600 text-p-basico w-[70%] pl-[2rem] py-[.2rem] my-[.2rem] rounded'>{errors.branch}</p>}
    </div>

    <div className="flex flex-col">
        <LabelUi>Corte de cabello</LabelUi>
        <SelectUi {...register('haircut')} className="p-2 border rounded-md">
                            <OptionlUi value="">Selecciona una sucursal</OptionlUi>
                            {haircut.map((haircut) => (
                                <OptionlUi key={haircut.id} value={haircut.id}>
                                    {haircut.name}
                                </OptionlUi>
                            ))}
                        </SelectUi>
        {errors.haircut && <p className='bg-red-600 text-p-basico w-[70%] pl-[2rem] py-[.2rem] my-[.2rem] rounded'>{errors.haircut}</p>}
    </div>

    <div className="flex flex-col">
        <LabelUi>Fecha</LabelUi>
        <InputUi type="date" {...register('date')} className="p-2 border rounded-md bg-caja w-[70%] text-p-basico" />
        {errors.date && <p className='bg-red-600 text-p-basico w-[70%] pl-[2rem] py-[.2rem] my-[.2rem] rounded'>{errors.date}</p>}
    </div>

    <div className="flex flex-col">
        <LabelUi>Hora</LabelUi>
        <InputUi type="time" {...register('hour')} className="p-2 border rounded-md bg-caja w-[70%] text-p-basico" />
        {errors.hour && <p className='bg-red-600 text-p-basico w-[70%] pl-[2rem] py-[.2rem] my-[.2rem] rounded'>{errors.hour}</p>}
    </div>

    <div className="flex flex-col">
                        <LabelUi>Barbero</LabelUi>
                        <SelectUi {...register('barber')} className="p-2 border rounded-md">
                            <OptionlUi value="">Selecciona un barbero</OptionlUi>
                            {barbers.map((barber) => (
                                <OptionlUi key={barber.id} value={barber.id}>
                                    {barber.name}
                                </OptionlUi>
                            ))}
                        </SelectUi>
                        {errors.barber && <p className='bg-red-600 text-p-basico w-[70%] pl-[2rem] py-[.2rem] my-[.2rem] rounded'>{errors.barber}</p>}
                    </div>

    {/* Botón de envío ocupa toda la fila */}
    <div className="col-span-1 sm:col-span-2 flex justify-center mt-4">
        <ButtonSubmitUi type="submit">
            {loading ? <Loading /> : "Agendar Cita"}
        </ButtonSubmitUi>
    </div>
</form>

        </div>
        </article>
    );
}
