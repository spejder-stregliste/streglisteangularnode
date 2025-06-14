import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';


import { UserService } from './app/services/user.service';
import { GlobalService } from './app/services/global.service';
import { AdminService } from './app/services/admin.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { APP_ID, importProvidersFrom } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { provideAnimations } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MatSortModule } from '@angular/material/sort';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { HomeComponent } from './app/home/home.component';
import { QRComponent } from './app/qr/qr.component';
import { AdminComponent } from './app/admin/admin.component';
import { AppComponent } from './app/app.component';


export function getBaseUrl() {
  return document.getElementsByTagName('base')[0].href;
}

const providers = [
  { provide: 'BASE_URL', useFactory: getBaseUrl, deps: [] }
];

bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(MatTableModule, MatButtonModule, MatInputModule, MatIconModule, MatDialogModule, MatSelectModule, FormsModule, MatSortModule, BrowserModule),
        UserService,
        GlobalService,
        AdminService,
        provideHttpClient(withInterceptorsFromDi()),
        { provide: APP_ID, useValue: 'ng-cli-universal' },
        provideAnimations(),
        provideRouter([
            { path: '', component: HomeComponent, pathMatch: 'full' },
            { path: 'qr', component: QRComponent, pathMatch: 'full' },
            { path: 'admin', component: AdminComponent, pathMatch: 'full' }
        ]),
        ...providers
    ]
})
  .catch(err => console.log(err));
