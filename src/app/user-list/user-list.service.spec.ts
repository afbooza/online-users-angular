import { TestBed } from '@angular/core/testing';

import { UserListService } from './user-list.service';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { fail } from 'assert';
import { defer } from 'rxjs';

function asyncData<T>(data: T) {
  return defer(() => Promise.resolve(data));
};

function asyncError<T>(errorObject: any) {
  return defer(() => Promise.reject(errorObject));
}

describe('UserListService (with spies)', () => {
  let httpClientSpy: { get: jasmine.Spy };
  let userListService: UserListService;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    userListService = new UserListService(<any> httpClientSpy);
  });

  it('should return expected heroes (HttpClient called once)', () => {
    const expectedUsers: any =
      {"data": [{ "name": "Roberto Alomar", "icon": "folder" }]};

    httpClientSpy.get.and.returnValue(asyncData(expectedUsers));

    userListService.getMockUsers().subscribe(
      users => expect(users).toEqual(expectedUsers, 'expected users'),
      fail
    );
    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  });

  it('should return an error when the server returns a 404', () => {
    const errorResponse = new HttpErrorResponse({
      error: 'test 404 error',
      status: 404, statusText: 'Not Found'
    });

    httpClientSpy.get.and.returnValue(asyncError(errorResponse));

    userListService.getMockUsers().subscribe(
      heroes => fail('expected an error, not heroes'),
      error  => expect(error.message).toContain('test 404 error')
    );
  });

});
