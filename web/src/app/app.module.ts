import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { UserService } from './services/user.service';
import { MatIconModule } from '@angular/material/icon';
import { QRComponent } from './qr/qr.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    QRComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    MatTableModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    BrowserModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'qr', component: QRComponent, pathMatch: 'full' }
    ])
  ],
  providers: [UserService],
  bootstrap: [AppComponent],
})
export class AppModule { }
