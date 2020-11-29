import { Injectable, Injector } from '@angular/core';
import { OAuthService, AuthConfig, JwksValidationHandler } from 'angular-oauth2-oidc';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class InitialAuthService {
    constructor(
        private oauthService: OAuthService,
        private authConfig: AuthConfig,
        private injector: Injector
    ) { }

    public async initAuth(): Promise<any> {
        return new Promise((resolveFn, rejectFn) => {
            this.oauthService.configure(this.authConfig);
            this.oauthService.tokenValidationHandler = new JwksValidationHandler();

            this.oauthService.loadDiscoveryDocument().then(() => {
                if (this.oauthService.hasValidIdToken()) {
                    this.oauthService.setupAutomaticSilentRefresh();
                    resolveFn();
                    return;
                }

                this.oauthService.tryLogin().then(isLoggedIn => {
                    if (isLoggedIn) {
                        this.oauthService.setupAutomaticSilentRefresh();

                        const router = this.injector.get(Router);
                        router.navigateByUrl(this.oauthService.state).finally(resolveFn);
                    } else {
                        this.oauthService.initImplicitFlow(escape(window.location.pathname + window.location.search));
                        rejectFn('User is not logged in.');
                    }
                });
            });
        });
    }
}
