import { ITask, NewTask } from './task.model';

export const sampleWithRequiredData: ITask = {
  id: 26867,
};

export const sampleWithPartialData: ITask = {
  id: 17694,
  title: 'antique criminal',
};

export const sampleWithFullData: ITask = {
  id: 1260,
  title: 'thick',
  description: 'kosher outbid topsail',
};

export const sampleWithNewData: NewTask = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
