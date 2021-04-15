import { Observable, of } from "rxjs";

export class AuthServiceStub {
    readonly user$: Observable<any> = of({
        name: "test_user",
        email: "testuser@test.com"
    });
  }
  