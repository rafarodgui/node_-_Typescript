import { startOfHour, isBefore } from 'date-fns';
import Appointment from '../models/Appointment';

import AppointmentsRepository from '../repositories/AppointmentsRepositoryu';

/**
 * [x]Recebimento das informacões
 * [x]Tratativa de erros e excessões
 * [x]Acesso ao Reposiório
 */

interface Request {
  date: Date;
  provider: string;
}

/**
 * Dependency Inversion (SOLD)
 */

class CreateAppointmentService {
  private appointmentsRepository: AppointmentsRepository;

  constructor(appointmentsRepository: AppointmentsRepository) {
    this.appointmentsRepository = appointmentsRepository;
  }

  public execute({ date, provider }: Request): Appointment {
    const appointimetDate = startOfHour(date);

    const findAppointmentsInSameDate = this.appointmentsRepository.findByDate(
      appointimetDate,
    );

    if (findAppointmentsInSameDate) {
      throw Error('This date is occuped');
    }

    if (isBefore(startOfHour(date), startOfHour(new Date()))) {
      throw Error('past dates are not permitted');
    }

    const appointment = this.appointmentsRepository.create({
      provider,
      date: appointimetDate,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
