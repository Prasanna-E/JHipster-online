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
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ConfigurationService, ConfigProps, Env, Bean, PropertySource } from 'app/admin/configuration/configuration.service';

describe('Service Tests', () => {
  describe('Logs Service', () => {
    let service: ConfigurationService;
    let httpMock: HttpTestingController;
    let expectedResult: Bean[] | PropertySource[] | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });

      expectedResult = null;
      service = TestBed.inject(ConfigurationService);
      httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
      httpMock.verify();
    });

    describe('Service methods', () => {
      it('should call correct URL', () => {
        service.getBeans().subscribe();

        const req = httpMock.expectOne({ method: 'GET' });
        const resourceUrl = SERVER_API_URL + 'management/configprops';
        expect(req.request.url).toEqual(resourceUrl);
      });

      it('should get the config', () => {
        const bean: Bean = {
          prefix: 'jhipster',
          properties: {
            clientApp: {
              name: 'jhipsterApp'
            }
          }
        };
        const configProps: ConfigProps = {
          contexts: {
            jhipster: {
              beans: {
                'io.github.jhipster.config.JHipsterProperties': bean
              }
            }
          }
        };
        service.getBeans().subscribe(received => (expectedResult = received));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(configProps);
        expect(expectedResult).toEqual([bean]);
      });

      it('should get the env', () => {
        const propertySources: PropertySource[] = [
          {
            name: 'server.ports',
            properties: {
              'local.server.port': {
                value: '8080'
              }
            }
          }
        ];
        const env: Env = { propertySources };
        service.getPropertySources().subscribe(received => (expectedResult = received));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(env);
        expect(expectedResult).toEqual(propertySources);
      });
    });
  });
});
