import { IDepartment, NewDepartment } from './department.model';

export const sampleWithRequiredData: IDepartment = {
  id: 18496,
  departmentName: 'fooey',
};

export const sampleWithPartialData: IDepartment = {
  id: 28575,
  departmentName: 'ouch babyish huzzah',
};

export const sampleWithFullData: IDepartment = {
  id: 11673,
  departmentName: 'even atop amongst',
};

export const sampleWithNewData: NewDepartment = {
  departmentName: 'vainly yum',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
