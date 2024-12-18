import { ICountry, NewCountry } from './country.model';

export const sampleWithRequiredData: ICountry = {
  id: 14013,
};

export const sampleWithPartialData: ICountry = {
  id: 13105,
};

export const sampleWithFullData: ICountry = {
  id: 19228,
  countryName: 'quintuple reporter ack',
};

export const sampleWithNewData: NewCountry = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
