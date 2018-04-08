import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {DemoService} from './demo.service';
import {User} from './user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public books;
  public user;
  interval: any;
  public page = 'bookList';
  public loggedUser = '';
  error = '';
  @ViewChild('nameInput') nameInputRef: ElementRef;
  @ViewChild('passInput') passInputRef: ElementRef;

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

  getUser(name: string) {
    this._demoService.getUser(name).subscribe(
      data => {
        if (data !== null && data !== undefined) {
          this.user = new User((<User>data).name, (<User>data).password,
            (<User>data).email, (<User>data).gender, (<User>data).age);
        }
       },
      err => console.error(err),
      () => console.log('done loading user')
    );
  }

  doLogin() {
    const name = this.nameInputRef.nativeElement.value;
    const password = this.passInputRef.nativeElement.value;
    this.getUser(name);
    setTimeout(() => {
      if (this.user !== undefined && this.user !== null) {
        if (this.user.name === name && this.user.password === password) {
          this.loggedUser = this.user.name;
          this.page = 'bookList';
          this.error = '';
        }
      } else {
        this.error = 'Niepoprawne dane logowania';
      }
      }, 300);
  }
}

