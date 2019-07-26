import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { UserListComponent } from './user-list.component';
import { MatListModule, MatIconModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { UserListService } from './user-list.service';
import { Constants } from '../../common/Constants';
import { of, Observable } from 'rxjs';

const mockUserData = { "data": [{ "name": "Roberto Alomar", "icon": "folder" }] };
class MockUserListService {
  public getMockUsers(): Observable<object> {
    return of(mockUserData);
  }
}

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;
  let userListService: MockUserListService;
  let headerElement: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatListModule,
        MatIconModule,
        HttpClientModule],
      declarations: [UserListComponent],
      providers:[
        {provide: UserListService, useClass: MockUserListService}
      ]
    })
      .compileComponents();
      userListService = TestBed.get(UserListService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    headerElement = fixture.nativeElement.querySelector('.online-users__header');
  });

  it('should create', () => {
    component.ngOnInit();
    expect(component.title).toBe(Constants.EXPAND_TITLE);
  });

  it('should call the userListService and check updated components', (done) => {
    userListService.getMockUsers().subscribe(response => {
      expect(response).toBe(mockUserData);
      if(response) {
        setTimeout(() =>{
          expect(component.users).toBe(mockUserData.data);
          expect(component.iconModifier).toBe('online-users__header-icon--enabled');
          expect(component.usersLoaded).toBeTruthy();
          done();
        }, 3500)
      }
    });
  });

  it('should test the expandUsers method gets triggered on click of the HTML element', () => {
    spyOn(component, "expandUsers");
    console.log(headerElement);
    headerElement.click();
    fixture.whenStable().then(() => {
      expect(component.expandUsers).toHaveBeenCalled();
      expect(component.title).toBe(Constants.MIN_TITLE);
    });
  });
});
