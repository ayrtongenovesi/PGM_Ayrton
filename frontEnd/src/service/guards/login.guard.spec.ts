import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { LoginGuard } from './login.guard';
import { UserService } from '../services/user.service';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { ProtectedComponent } from '../../app/components/ProtectedComponent'; 

describe('LoginGuard', () => {
  let guard: LoginGuard;
  let userService: jasmine.SpyObj<UserService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const userServiceSpy = jasmine.createSpyObj('UserService', ['checkLoginStatus']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        LoginGuard,
        { provide: UserService, useValue: userServiceSpy },
        { provide: Router, useValue: routerSpy }
      ],
      imports: [RouterTestingModule]
    });

    guard = TestBed.inject(LoginGuard);
    userService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should allow the activation if user is logged in', () => {
    userService.checkLoginStatus.and.returnValue(true); 

    const canActivate = guard.canActivate();

    expect(canActivate).toBe(true);
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('should not allow the activation and redirect if user is not logged in', () => {
    userService.checkLoginStatus.and.returnValue(false); 

    const canActivate = guard.canActivate();

    expect(canActivate).toBe(false);
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });
});
