'use client';

import Style from '@/styles/modal.apointments.module.css'
import { SelectApointmets, OptionlApointmets,LabelApointmets, InputApointmets, ButtonSubmit } from './ui';
import { barbers } from './helpers/barbers';
import { branchesData } from '@/services/branchesData';
import { useFormAppointments } from './hooks/useForm.appointments';
import { initialValue } from './helpers/initialValues';
import { validateFormAppointments } from './helpers/validateForm.appointments';

interface ModalApointmentsProps {
    isOpens: boolean;
    closeModal: () => void;
  }
  
  export const CreateApointments: React.FC<ModalApointmentsProps> = ({ isOpens, closeModal}) => {
    const {
        form,
        errors,
        handleChange,
        handleBlur
    } = useFormAppointments(initialValue, validateFormAppointments);

    return (
      <article className={`${Style.modal} ${isOpens && Style.isOpen}`}>
        <div className={`${Style.modalContainer}`}>
        <button 
        onClick={closeModal}
        className='bg-caja py-[.3rem] px-[1rem] text-[1.5rem] text-p-basico rounded-[.2rem]'
        >
        Cancelar
        </button>
            <div className='flex'>
        <div className='w-[95%]'>
        <h3 className="text-[2.5rem] font-bold  my-[2rem]">Agenda tu cita</h3>
        <div className='flex flex-col'>
        <LabelApointmets htmlFor="sucursal">Seleccione una Sucursal:</LabelApointmets>
            <SelectApointmets
            id="sucursal"
            name="branch"
            onChange={(e) => handleChange(e)}
            value={form.branch}
            onBlur={handleBlur}
            >
            <OptionlApointmets value="">Seleccionar</OptionlApointmets>
            {branchesData.map((branch) => (
                <OptionlApointmets key={branch.id} value={branch.id}>
                {branch.name}
                </OptionlApointmets>
            ))}
            </SelectApointmets>
            {errors.branch && <p className='bg-red-600 text-p-basico w-[70%] pl-[2rem] py-[.2rem] my-[.2rem] rounded'>Este campo es obligatorio.</p>}
        </div>

        <div className='flex flex-col'>
            <LabelApointmets>Corte de cabello</LabelApointmets>
            <SelectApointmets>
                <OptionlApointmets>
                    Seleccionar
                </OptionlApointmets>
                <OptionlApointmets>
                    Corte 1
                </OptionlApointmets>
                <OptionlApointmets>
                    Corte 2
                </OptionlApointmets>
                <OptionlApointmets>
                    Corte 3
                </OptionlApointmets>
            </SelectApointmets>
        </div>

        <div className='flex flex-col'>
            <LabelApointmets>Corte de barba</LabelApointmets>
            <SelectApointmets>
                <OptionlApointmets>
                    Seleccionar
                </OptionlApointmets>
            <OptionlApointmets>
                    Barba 1
                </OptionlApointmets>
                <OptionlApointmets>
                    Barba 2
                </OptionlApointmets>
                <OptionlApointmets>
                    Barba 3
                </OptionlApointmets>
            </SelectApointmets>
        </div>

        <div className='flex flex-col'>
            <LabelApointmets>Seleccione la fecha a la que asistirá :</LabelApointmets>
            <InputApointmets
                type='date' />
        </div>

        <div className='flex flex-col'>
            <LabelApointmets>Seleccione la hora a la que asistirá :</LabelApointmets>
            <InputApointmets
                type='time' />
        </div>
        </div>

        <div className='w-[95%]'>

        <div className='flex flex-col'>
            
            <LabelApointmets>Seleccione el barbero:</LabelApointmets>
            <SelectApointmets
                id="barbers"
                name="barber"
                onChange={(e) => handleChange(e)}
                value={form.barber}
                onBlur={handleBlur}
            >
            <OptionlApointmets value=''>
                    Seleccionar
                </OptionlApointmets>
            {barbers.map((barber) => (
                <OptionlApointmets key={barber.id} value={barber.id}>
                    {barber.name}
                </OptionlApointmets>
                ))}
            </SelectApointmets>
            {errors.barber && <p className='bg-red-600 text-p-basico w-[70%] pl-[2rem] py-[.2rem] my-[.2rem] rounded'>Este campo es obligatorio.</p>}
        </div>

        <div className='flex flex-col mx-auto'>
            <LabelApointmets>¿Desea pintarse el cabello?</LabelApointmets>
            <SelectApointmets>
                <OptionlApointmets>
                    NO
                </OptionlApointmets>
                <OptionlApointmets>
                    SI
                </OptionlApointmets>
            </SelectApointmets>
        </div>

        <p className='bg-caja leading-6 text-p-basico p-[1.5rem] w-[70%]  mt-[1.4rem]'>
            Si el color que desea no está disponible, se lo comunicaremos a tiempo
        </p>

        <div className='w-[70%] flex flex-col items-center'>
            <h3 className='text-[1.8rem] mt-[1.4rem] w-[70%]'>
            Precio total de la cita
            </h3>
            <h4 className='text-p-basico font-bold text-[3rem] w-[70%]'>
                $50.00
            </h4>

            <p className='bg-caja leading-6 text-p-basico p-[1.5rem] w-[100%]  mt-[1.4rem] text-center'>
            Deberá pagar en efectivo al momento de realizarse el corte.
            </p>

            <ButtonSubmit>
            Agendar Cita
            </ButtonSubmit>
        </div>
        </div>
        </div>

        </div>
      </article>
    );
  };
  
  export default CreateApointments;