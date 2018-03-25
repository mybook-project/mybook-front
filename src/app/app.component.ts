import {Component, OnInit} from '@angular/core';
import {DemoService} from './demo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public books;
  interval: any;

  constructor(private _demoService: DemoService) {}

  ngOnInit() {
    this.getBooks();
    this.interval = setInterval(() => {
      this.getBooks();
    }, 60000);
  }

  getBooks() {
    this._demoService.getBooks().subscribe(
      data => { this.books = data},
      err => console.error(err),
      () => console.log('done loading foods')
    );
  }
}

