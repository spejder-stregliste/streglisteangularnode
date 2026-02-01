import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { StreglisteComponent } from "../stregliste/stregliste.component";
import { UserService } from '../services/user.service';
import { GlobalService } from '../services/global.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [RouterLink, FormsModule, StreglisteComponent]
})
export class HomeComponent {
  constructor(private _: UserService, private __: GlobalService) {
    // intentionally empty
    // Create the user- and globalService to force preload of data for stregliste
  }
}