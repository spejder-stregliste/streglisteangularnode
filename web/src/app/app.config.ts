import { provideHttpClient, withInterceptorsFromDi, withFetch } from '@angular/common/http';
import { APP_ID, ApplicationConfig, importProvidersFrom } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatSortModule } from '@angular/material/sort';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideRouter, withPreloading, PreloadAllModules } from '@angular/router';

import { UserService } from './services/user.service';
import { GlobalService } from './services/global.service';
import { AdminService } from './services/admin.service';
import { HomeComponent } from './home/home.component';

export function getBaseUrl() {
    return document.getElementsByTagName('base')[0].href;
}

const providers = [
    { provide: 'BASE_URL', useFactory: getBaseUrl, deps: [] }
];

const appConfig: ApplicationConfig =
{
    providers: [
        importProvidersFrom(MatTableModule, MatButtonModule, MatInputModule, MatIconModule, MatDialogModule, MatSelectModule, FormsModule, MatSortModule, BrowserModule),
        UserService,
        GlobalService,
        AdminService,
        provideHttpClient(withInterceptorsFromDi(), withFetch()),
        { provide: APP_ID, useValue: 'ng-cli-universal' },
        provideRouter(
            [
                {
                    path: '',
                    component: HomeComponent,
                    pathMatch: 'full',
                },
                {
                    path: 'qr',
                    loadComponent: () => import('./qr/qr.component').then((m) => m.QRComponent),
                    pathMatch: 'full'
                },
                {
                    path: 'admin',
                    loadComponent: () => import('./admin/admin.component').then((m) => m.AdminComponent),
                    pathMatch: 'full'
                }
            ],
            withPreloading(PreloadAllModules)
        ),
        ...providers, provideClientHydration(withEventReplay())
    ]
};

export default appConfig;