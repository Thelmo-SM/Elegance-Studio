export type appointmentsTypes = {
    branch: string
    haircut: string
    //BeardTrimming: string
    date: string
    hour: string
    barber: string
    //dyeHair: string
};

export type validateValueType = (form: appointmentsTypes) => Partial<appointmentsTypes>;