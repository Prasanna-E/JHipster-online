/**
 * Copyright 2017-2024 the original author or authors from the JHipster project.
 *
 * This file is part of the JHipster Online project, see https://github.com/jhipster/jhipster-online
 * for more information.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { ComponentFixture, TestBed, waitForAsync, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { Authority } from 'app/shared/constants/authority.constants';
import { JhonlineTestModule } from '../../../test.module';
import { UserManagementUpdateComponent } from 'app/admin/user-management/user-management-update.component';
import { UserService } from 'app/core/user/user.service';
import { User } from 'app/core/user/user.model';

describe('Component Tests', () => {
  describe('User Management Update Component', () => {
    let comp: UserManagementUpdateComponent;
    let fixture: ComponentFixture<UserManagementUpdateComponent>;
    let service: UserService;
    const route: ActivatedRoute = ({
      data: of({ user: new User(1, 'user', 'first', 'last', 'first@last.com', true, 'en', [Authority.USER], 'admin') })
    } as any) as ActivatedRoute;

    beforeEach(
      waitForAsync(() => {
        TestBed.configureTestingModule({
          imports: [JhonlineTestModule],
          declarations: [UserManagementUpdateComponent],
          providers: [
            FormBuilder,
            {
              provide: ActivatedRoute,
              useValue: route
            }
          ]
        })
          .overrideTemplate(UserManagementUpdateComponent, '')
          .compileComponents();
      })
    );

    beforeEach(() => {
      fixture = TestBed.createComponent(UserManagementUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(UserService);
    });

    describe('OnInit', () => {
      it('Should load authorities and language on init', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'authorities').and.returnValue(of(['USER']));

          // WHEN
          comp.ngOnInit();

          // THEN
          expect(service.authorities).toHaveBeenCalled();
          expect(comp.authorities).toEqual(['USER']);
        })
      ));
    });

    describe('save', () => {
      it('Should call update service on save for existing user', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          const entity = new User(123);
          spyOn(service, 'update').and.returnValue(
            of(
              new HttpResponse({
                body: entity
              })
            )
          );
          comp.user = entity;
          comp.editForm.patchValue({ id: entity.id });
          // WHEN
          comp.save();
          tick(); // simulate async

          // THEN
          expect(service.update).toHaveBeenCalledWith(entity);
          expect(comp.isSaving).toEqual(false);
        })
      ));

      it('Should call create service on save for new user', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          const entity = new User();
          spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
          comp.user = entity;
          // WHEN
          comp.save();
          tick(); // simulate async

          // THEN
          expect(service.create).toHaveBeenCalledWith(entity);
          expect(comp.isSaving).toEqual(false);
        })
      ));
    });
  });
});
