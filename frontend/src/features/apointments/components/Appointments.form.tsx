// app/appointments/page.tsx
'use client';
import { useFormAppointments } from "../hooks/useForm.appointments";
import { initialValue } from "../helpers/initialValues";
import { validateFormAppointments } from "../helpers/validateForm.appointments";
import Style from '@/styles/modal.apointments.module.css';
import {ButtonSubmitUi, InputUi, LabelUi, OptionlUi, SelectUi} from '@/components/Ui';
import { BranchesService } from "@/services/branchesService";
import useGetServices from "../services/get.services";
import Loading from "@/components/Ui/Loading/loading";
import { useEffect } from "react";
import { appointmentsTypes } from "@/types/appointmentsTypes";

interface ModalApointmentsProps {
    isOpens: boolean;
    closeModal: () => void;
    onCreate: (newAppointment: appointmentsTypes) => void;
  }
////////////////////////////////////////////////
export default function AppointmentsForm({ isOpens, closeModal, onCreate}: ModalApointmentsProps) {
    const {
        errors,
        form,
        barbers,
        loading,
        resSuccess,
        resError,
        filteredBarbers,
       // fecha,
        hora,
        //currentTime,
        currentDate,
        handleSubmit,
        register,
        setFilteredBarbers,
        //handleFechaChange,
        //handleHoraChange
    } = useFormAppointments(initialValue, validateFormAppointments);
    const { branch } = BranchesService()
    const { haircut } = useGetServices();

    useEffect(() => {
        if (form.branch) {
            const filtered = barbers.filter((barber) => barber.location === form.branch);
            setFilteredBarbers(filtered);
        }
    }, [form.branch, barbers]);

    const onSubmit = async (formData: typeof form) => {
        onCreate(formData);
        setTimeout(() => closeModal(), 3000);
      };

    return (
        <article className={`${Style.modal} ${isOpens && Style.isOpen}`}>
        <div className={`${Style.modalContainer} flex flex-col items-center`}>
        { resSuccess && 
        <h3 className="bg-green-600 text-p-basico lg:w-[50%] rounded text-[1rem] lg:text-[1.8rem] text-center p-4 lg:p-[2rem]">
            ¡Cita agendada exitosamente!
        </h3>
    }
    { resError && 
        <h3 className="bg-red-600 text-p-basico lg:w-[50%] rounded text-[1rem] lg:text-[1.8rem] text-center p-4 lg:p-[2rem]">
            Error al registrar cita
        </h3>
    }
        <button 
        onClick={closeModal}
        className='bg-caja py-[.3rem] mb-6 lg:mb-0 px-[1rem] lg:text-[1.5rem] text-p-basico rounded-[.2rem] self-end'
        >
        Cerrar
        </button>
            <h1 className="text-2xl font-bold text-center mb-4">Agenda tu cita en Elegance Studio</h1>
            <form onSubmit={(e) => { handleSubmit(e); onSubmit(form); }} 
    className="grid grid-cols-1 sm:grid-cols-2 lg:gap-4  border-p-basico rounded-[.3rem] w-full lg:p-4"
>
    <div className="flex flex-col items-center lg:items-start w-[100%]">
        <LabelUi>Sucursal</LabelUi>
    <SelectUi {...register('branch')} className="p-3 rounded-md focus:outline-none focus:ring-2">
                            <OptionlUi value="" className="">Selecciona una sucursal</OptionlUi>
                            {branch.map((branch) => (
                                <OptionlUi key={branch.id} value={branch.name} className="]">
                                    {branch.name}
                                </OptionlUi>
                            ))}
                        </SelectUi>
        {errors.branch && <p className='bg-red-600 text-p-basico w-full lg:w-[70%] pl-[2rem] py-[.2rem] my-[.2rem] rounded'>{errors.branch}</p>}
    </div>

    <div className="flex flex-col items-center lg:items-start w-[100%]">
        <LabelUi>Corte de cabello</LabelUi>
        <SelectUi {...register('haircut')} className="p-2 border rounded-md w-full">
                            <OptionlUi value="">Selecciona una sucursal</OptionlUi>
                            {haircut.map((haircut) => (
                                <OptionlUi key={haircut.id} value={haircut.name}>
                                    {haircut.name}
                                </OptionlUi>
                            ))}
                        </SelectUi>
        {errors.haircut && <p className='bg-red-600 text-p-basico w-full lg:w-[70%] pl-[2rem] py-[.2rem] my-[.2rem] rounded'>{errors.haircut}</p>}
    </div>

    <div className="flex flex-col items-center lg:items-start w-full">
        <LabelUi>Fecha</LabelUi>
        <InputUi 
        type="date"
        min={currentDate}
        //disabled={false}
        //onChange={handleFechaChange}
       {...register('date')} 
        className="p-2 border rounded-md bg-caja w-full lg:w-[70%] text-p-basico ocus:ring-2 disabled:bg-gray-200 disabled:text-gray-500 disabled:cursor-not-allowed" 
        />
        {errors.date && <p className='bg-red-600 text-p-basico w-full lg:w-[70%] pl-[2rem] py-[.2rem] my-[.2rem] rounded'>{errors.date}</p>}
    </div>

    <div className="flex flex-col items-center lg:items-start w-[100%]">
        <LabelUi>Hora</LabelUi>
        <SelectUi {...register('hour')} >
            <OptionlUi value=''>Selecciona una hora</OptionlUi>
            {hora.map((hora) => (
                <OptionlUi key={hora} value={hora}>
                    {hora}
                </OptionlUi>
            ))}
        </SelectUi>
        {errors.hour && <p className='bg-red-600 text-p-basico w-full lg:w-[70%] pl-[2rem] py-[.2rem] my-[.2rem] rounded'>{errors.hour}</p>}
    </div>

    <div className="flex flex-col items-center lg:items-start w-[100%]">
                        <LabelUi>Barbero</LabelUi>
                        <SelectUi {...register('barber')} className="p-2 border rounded-md">
                            <OptionlUi value="">Selecciona un barbero</OptionlUi>
                            {filteredBarbers.length > 0 ? (
                              filteredBarbers.map((barber) => (
                                <OptionlUi key={barber.id} value={barber.id}>
                                  {barber.name}
                                </OptionlUi>
                              ))
                             ) : (
                               <OptionlUi disabled>No hay barberos disponibles</OptionlUi>
                             )}
                            </SelectUi>
                        {errors.barber && <p className='bg-red-600 text-p-basico w-full lg:w-[70%] pl-[2rem] py-[.2rem] my-[.2rem] rounded'>{errors.barber}</p>}
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
