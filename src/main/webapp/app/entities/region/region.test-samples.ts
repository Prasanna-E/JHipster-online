import { IRegion, NewRegion } from './region.model';

export const sampleWithRequiredData: IRegion = {
  id: 26545,
};

export const sampleWithPartialData: IRegion = {
  id: 19512,
  regionName: 'requirement confused',
};

export const sampleWithFullData: IRegion = {
  id: 22134,
  regionName: 'lest er',
};

export const sampleWithNewData: NewRegion = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
