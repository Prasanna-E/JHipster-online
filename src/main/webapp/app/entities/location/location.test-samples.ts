import { ILocation, NewLocation } from './location.model';

export const sampleWithRequiredData: ILocation = {
  id: 25908,
};

export const sampleWithPartialData: ILocation = {
  id: 13950,
  city: 'West Korbin',
};

export const sampleWithFullData: ILocation = {
  id: 23590,
  streetAddress: 'corral',
  postalCode: 'machine',
  city: 'Fort Kayliville',
  stateProvince: 'ah besides scented',
};

export const sampleWithNewData: NewLocation = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
