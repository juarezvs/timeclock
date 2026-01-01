import { Clock } from '../clock/Clock';

export interface ClockRepository {
  create(clock: Clock): Promise<void>;
  findBySerial(serial: string): Promise<Clock | null>;
  list(): Promise<Clock[]>;
}
