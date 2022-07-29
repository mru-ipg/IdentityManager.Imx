/*
 * ONE IDENTITY LLC. PROPRIETARY INFORMATION
 *
 * This software is confidential.  One Identity, LLC. or one of its affiliates or
 * subsidiaries, has supplied this software to you under terms of a
 * license agreement, nondisclosure agreement or both.
 *
 * You may not copy, disclose, or use this software except in accordance with
 * those terms.
 *
 *
 * Copyright 2022 One Identity LLC.
 * ALL RIGHTS RESERVED.
 *
 * ONE IDENTITY LLC. MAKES NO REPRESENTATIONS OR
 * WARRANTIES ABOUT THE SUITABILITY OF THE SOFTWARE,
 * EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED
 * TO THE IMPLIED WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE, OR
 * NON-INFRINGEMENT.  ONE IDENTITY LLC. SHALL NOT BE
 * LIABLE FOR ANY DAMAGES SUFFERED BY LICENSEE
 * AS A RESULT OF USING, MODIFYING OR DISTRIBUTING
 * THIS SOFTWARE OR ITS DERIVATIVES.
 *
 */

import { TestBed } from '@angular/core/testing';
import { configureTestSuite } from 'ng-bullet';

import { UserModelService } from 'qer';
import { AobPermissionsService } from './aob-permissions.service';

describe('AobPermissionsService', () => {
  let service: AobPermissionsService;

  const userModel = new class {
    userGroups = [];
    readonly getGroups = () => Promise.resolve(this.userGroups);
  }();

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: UserModelService,
          useValue: userModel
        }
      ]
    });
    service = TestBed.inject(AobPermissionsService);
  });

  for (const testcase of [
    { userGroups: [], canSee: false },
    { userGroups: [{ Name: 'AOB_4_AOBAPP_OWNER' }], canSee: true },
  ]) {
    it('checks permissions for AOB_4_AOBAPP_OWNER', async () => {
      userModel.userGroups = testcase.userGroups;

      expect(await service.isAobApplicationOwner()).toEqual(testcase.canSee);
    });
  };

  for (const testcase of [
    { userGroups: [], canSee: false },
    { userGroups: [{ Name: 'AOB_4_AOB_ADMIN' }], canSee: true },
  ]) {
    it('checks permissions for AOB_4_AOB_ADMIN', async () => {
      userModel.userGroups = testcase.userGroups;

      expect(await service.isAobApplicationAdmin()).toEqual(testcase.canSee);
    });
  };
});
