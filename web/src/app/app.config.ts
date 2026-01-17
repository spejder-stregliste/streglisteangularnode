import { provideHttpClient, withInterceptorsFromDi, withFetch } from '@angular/common/http';
import { APP_ID, ApplicationConfig, importProvidersFrom } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { provideAnimations } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MatSortModule } from '@angular/material/sort';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';

import { UserService } from './services/user.service';
import { GlobalService } from './services/global.service';
import { AdminService } from './services/admin.service';
import { HomeComponent } from './home/home.component';
import { QRComponent } from './qr/qr.component';
import { AdminComponent } from './admin/admin.component';

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
        provideAnimations(),
        provideRouter([
            { path: '', component: HomeComponent, pathMatch: 'full' },
            { path: 'qr', component: QRComponent, pathMatch: 'full' },
            { path: 'admin', component: AdminComponent, pathMatch: 'full' }
        ]),
        ...providers, provideClientHydration(withEventReplay())
    ]

};

export default appConfig;