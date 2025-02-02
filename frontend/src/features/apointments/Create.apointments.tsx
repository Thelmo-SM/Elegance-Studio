'use client';

import Style from '@/styles/modal.apointments.module.css';
import { SelectApointmets, OptionlApointmets,LabelApointmets, InputApointmets, ButtonSubmit } from './ui';
import { barbers } from './helpers/barbers';
import useGetServices from './services/get.services';
import { BranchesService } from '@/services/branchesService';
import { useFormAppointments } from './hooks/useForm.appointments';
import { initialValue } from './helpers/initialValues';
import { validateFormAppointments } from './helpers/validateForm.appointments';
import Landing from '@/components/Functional/Home/Landing';

interface ModalApointmentsProps {
    isOpens: boolean;
    closeModal: () => void;
  }
  //
  export const CreateApointments: React.FC<ModalApointmentsProps> = ({ isOpens, closeModal}) => {
    const {
        form,
        errors,
        loading,
        handleChange,
        handleBlur,
        handleSubmit
    } = useFormAppointments(initialValue, validateFormAppointments);
    const {    
        haircut,
        beard,
        dye,
    } = useGetServices()

    const { branch } = BranchesService();

    return (
      <article className={`${Style.modal} ${isOpens && Style.isOpen}`}>
        
        <div className={`${Style.modalContainer}`}>
        <button 
        onClick={closeModal}
        className='bg-caja py-[.3rem] px-[1rem] text-[1.5rem] text-p-basico rounded-[.2rem]'
        >
        Cancelar
        </button>
{/*       <div className=''>
        <div className=''>*/}
        <h3 className="text-[2.5rem] font-bold  my-[2rem]">Agenda tu cita</h3>
        <form action="" onSubmit={handleSubmit} className='w-[100%] mx-auto  flex justify-between'>
        <div className='w-full'>
        <div className='flex flex-col'>
        <LabelApointmets htmlFor="sucursal">Seleccione una Sucursal:</LabelApointmets>
            <SelectApointmets
            id="sucursal"
            name="branch"
            onChange={handleChange}
            value={form.branch}
            onBlur={handleBlur}
            >
            <OptionlApointmets value="">Seleccionar</OptionlApointmets>
            {branch.map((b) => (
                <OptionlApointmets key={b.id}>
                    {b.name}
                </OptionlApointmets>
            ))}
            </SelectApointmets>
            {errors.branch && <p className='bg-red-600 text-p-basico w-[70%] pl-[2rem] py-[.2rem] my-[.2rem] rounded'>Este campo es obligatorio.</p>}
        </div>

        <div className='flex flex-col'>
            <LabelApointmets htmlFor='corteCabello'>Corte de cabello</LabelApointmets>
            <SelectApointmets
            id='corteCabello'
            name='haircut'
            onChange={handleChange}
            value={form.haircut}
            onBlur={handleBlur}
            >
                <OptionlApointmets value=''>Seleccionar</OptionlApointmets>
                {haircut.map((cut) => (
                <OptionlApointmets key={cut.id}>
                    {cut.name} - {cut.price}
                </OptionlApointmets>
                ))}
            </SelectApointmets>
        </div>

        <div className='flex flex-col'>
            <LabelApointmets htmlFor='corteBarba'>Corte de barba</LabelApointmets>
            <SelectApointmets
            id='corteBarba'
            name='BeardTrimming'
            onChange={handleChange}
            value={form.BeardTrimming}
            onBlur={handleBlur}
            >
                <OptionlApointmets value=''>Seleccionar</OptionlApointmets>
                {beard.map((beard) => (
                <OptionlApointmets key={beard.id}>
                    {beard.name} - {beard.price}
                </OptionlApointmets>
                ))}
            </SelectApointmets>
        </div>

        <div className='flex flex-col'>
            <LabelApointmets htmlFor='fecha'>Seleccione la fecha a la que asistirá :</LabelApointmets>
            <InputApointmets
            id='fecha'
            name='date'
            onChange={handleChange}
            value={form.date}
            onBlur={handleBlur}
            type='date' 
            />
        </div>

        <div className='flex flex-col'>
            <LabelApointmets htmlFor='hour'>Seleccione la hora a la que asistirá :</LabelApointmets>
            <InputApointmets
            type='time'
            id='hour'
            name='hour'
            onChange={(e) => handleChange(e)}
            value={form.hour}
            onBlur={handleBlur} 
            />
        </div>
        </div>

        <div className='w-[95%]'>

        <div className='flex flex-col'>
            
            <LabelApointmets>Seleccione el barbero:</LabelApointmets>
            <SelectApointmets
                id="barbers"
                name="barber"
                onChange={handleChange}
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
            <LabelApointmets htmlFor='dyeHair'>¿Desea pintarse el cabello?</LabelApointmets>
            <SelectApointmets
            id="dyeHair"
            name="dyeHair"
            onChange={handleChange}
            value={form.dyeHair}
            onBlur={handleBlur}
            >
                <OptionlApointmets>Seleccionar</OptionlApointmets>
                {dye.map((hair) => (
                <OptionlApointmets key={hair.id}>
                    {hair.name}
                </OptionlApointmets>
                ))}
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
            {loading ? <Landing /> : 'Agendar Cita'}
            </ButtonSubmit>
        </div>
 </div>
 </form>
        </div>
{ /*       </div>

        </div>*/}
      </article>
    );
  };
  
  export default CreateApointments;