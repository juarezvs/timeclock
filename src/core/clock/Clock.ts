import { ClockProps } from "./ClockProps";

export class Clock {
    private props: Required<ClockProps>;

    private constructor(props: Required<ClockProps>){
        this.props = props;
    }

    static create(props: ClockProps){
        if (!props.serial?.trim()) throw new Error('Serial é obrigatório');
        if (!props.location?.trim()) throw new Error('Localização é obrigatório');

        return new Clock({
            id: props.id ?? crypto.randomUUID(),
            serial: props.serial.trim(),
            location: props.location.trim(),
            isActive: props.isActive ?? true,
        });
    }

    toJSON() { return {...this.props }}




}