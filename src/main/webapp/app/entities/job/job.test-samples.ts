import { IJob, NewJob } from './job.model';

export const sampleWithRequiredData: IJob = {
  id: 13698,
};

export const sampleWithPartialData: IJob = {
  id: 8804,
  jobTitle: 'Investor Integration Associate',
};

export const sampleWithFullData: IJob = {
  id: 1170,
  jobTitle: 'Central Integration Orchestrator',
  minSalary: 925,
  maxSalary: 14964,
};

export const sampleWithNewData: NewJob = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
