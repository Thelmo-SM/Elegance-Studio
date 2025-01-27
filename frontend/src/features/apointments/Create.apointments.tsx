import Style from '@/styles/modal.apointments.module.css'
import { SelectApointmets, OptionlApointmets,LabelApointmets, InputApointmets, ButtonSubmit } from './ui';

interface ModalApointmentsProps {
    isOpens: boolean;
    closeModal: () => void;
  }
  
  export const CreateApointments: React.FC<ModalApointmentsProps> = ({ isOpens, closeModal}) => {
    return (
      <article className={`${Style.modal} ${isOpens && Style.isOpen}`}>
        <div className={`${Style.modalContainer}`}>
        <button 
        onClick={closeModal}
        className='bg-caja py-[.3rem] px-[1rem] text-[1.5rem] text-p-basico rounded-[.2rem]'
        >
        Cerrar
        </button>
            <div className='flex justify-between'>
        <div className='w-[95%]'>
        <h3 className="text-[1.5rem] font-bold text-center mt-[2rem]">Agenda tu cita</h3>
        <div className='flex flex-col'>
            <LabelApointmets htmlFor='sucursal'>Selecsione una Sucursal: </LabelApointmets>
            <SelectApointmets id='sucursal'>
                <OptionlApointmets>
                    sucursal 1
                </OptionlApointmets>
                <OptionlApointmets>
                    sucursal 2
                </OptionlApointmets>
                <OptionlApointmets>
                    sucursal 3
                </OptionlApointmets>
                <OptionlApointmets>
                    sucursal 4
                </OptionlApointmets>
            </SelectApointmets>
        </div>

        <div className='flex flex-col'>
            <LabelApointmets>Corte de cabello</LabelApointmets>
            <SelectApointmets>
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

        <div className='w-[95%] flex flex-col ml-[5rem]'>

        <div className='flex flex-col'>
            
            <LabelApointmets>Seleccione el barbero:</LabelApointmets>
            <SelectApointmets>
                <OptionlApointmets>
                    barbero 1
                </OptionlApointmets>
                <OptionlApointmets>
                    barbero 2
                </OptionlApointmets>
                <OptionlApointmets>
                    barbero 3
                </OptionlApointmets>
            </SelectApointmets>
        </div>

        <div className='flex flex-col'>
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
            <h3 className='text-[1.8rem] mt-[1.4rem]'>
            Precio total de la cita
            </h3>
            <h4 className='text-p-basico font-bold text-[3rem]'>
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