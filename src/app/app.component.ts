import { Component } from '@angular/core';
import { DataService } from '../shared/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  component;

  constructor (
      private dataService: DataService
  ) {
    this.dataService.getData().subscribe((data) => {
      this.component = data
    });
  }


}
