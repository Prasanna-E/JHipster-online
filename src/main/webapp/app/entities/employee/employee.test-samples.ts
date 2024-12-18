import dayjs from 'dayjs/esm';

import { IEmployee, NewEmployee } from './employee.model';

export const sampleWithRequiredData: IEmployee = {
  id: 1783,
};

export const sampleWithPartialData: IEmployee = {
  id: 23730,
  email: 'Rashad_Leuschke23@gmail.com',
  phoneNumber: 'once',
  hireDate: dayjs('2024-12-17T10:14'),
  salary: 30165,
};

export const sampleWithFullData: IEmployee = {
  id: 24834,
  firstName: 'Eileen',
  lastName: 'Parker-Baumbach',
  email: 'Clotilde_Zboncak2@yahoo.com',
  phoneNumber: 'function jealous',
  hireDate: dayjs('2024-12-18T00:34'),
  salary: 18734,
  commissionPct: 27990,
};

export const sampleWithNewData: NewEmployee = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
