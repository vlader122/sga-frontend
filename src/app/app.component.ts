import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TitleComponent } from "./title/title.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TitleComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'sga';
}
