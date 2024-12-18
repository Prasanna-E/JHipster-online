import dayjs from 'dayjs/esm';

import { IJobHistory, NewJobHistory } from './job-history.model';

export const sampleWithRequiredData: IJobHistory = {
  id: 1679,
};

export const sampleWithPartialData: IJobHistory = {
  id: 22880,
  startDate: dayjs('2024-12-17T20:04'),
};

export const sampleWithFullData: IJobHistory = {
  id: 10151,
  startDate: dayjs('2024-12-18T03:29'),
  endDate: dayjs('2024-12-17T13:24'),
  language: 'ENGLISH',
};

export const sampleWithNewData: NewJobHistory = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
