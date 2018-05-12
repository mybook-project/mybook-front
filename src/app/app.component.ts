import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {DemoService} from './demo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public books;
  public booksCopy;
  public user;
  interval: any;
  public page = 'bookList';
  public loggedUser = '';
  error = '';
  currentBook;
  currentUserStats;
  statEdit;
  currentBookComments;
  currComment;
  @ViewChild('nameInput') nameInputRef: ElementRef;
  @ViewChild('passInput') passInputRef: ElementRef;

  @ViewChild('nameRegInput') nameRegInputRef: ElementRef;
  @ViewChild('passRegInput') passRegInputRef: ElementRef;
  @ViewChild('mailInput') mailInputRef: ElementRef;
  @ViewChild('genderInput') genderInputRef: ElementRef;
  @ViewChild('ageInput') ageInputRef: ElementRef;

  @ViewChild('searchInput') searchInputRef: ElementRef;

  @ViewChild('scoreInput') scoreInputRef: ElementRef;
  @ViewChild('statusInput') statusInputRef: ElementRef;
  @ViewChild('typeInput') typeInputRef: ElementRef;
  @ViewChild('timeInput') timeInputRef: ElementRef;
  @ViewChild('currentPageInput') currentPageInputRef: ElementRef;

  @ViewChild('searchUserInput') searchUserInputRef: ElementRef;

  @ViewChild('nameUpInput') nameUpInputRef: ElementRef;
  @ViewChild('passUpInput') passUpInputRef: ElementRef;
  @ViewChild('mailUpInput') mailUpInputRef: ElementRef;
  @ViewChild('genderUpInput') genderUpInputRef: ElementRef;
  @ViewChild('ageUpInput') ageUpInputRef: ElementRef;

  @ViewChild('scoreEditInput') scoreEditInputRef: ElementRef;
  @ViewChild('statusEditInput') statusEditInputRef: ElementRef;
  @ViewChild('typeEditInput') typeEditInputRef: ElementRef;
  @ViewChild('timeEditInput') timeEditInputRef: ElementRef;
  @ViewChild('currentPageEditInput') currentPageEditInputRef: ElementRef;

  @ViewChild('commentInput') commentInputRef: ElementRef;

  constructor(private _demoService: DemoService) {
  }

  ngOnInit() {
    this.getBooks();
  }

  getBooks() {
    this._demoService.getBooks().subscribe(
      data => {
        this.books = data;
      },
      err => console.error(err),
      () => this.booksCopy = this.books.slice()
    );
  }

  getUser(name: string) {
    this._demoService.getUser(name).subscribe(
      data => {
        if (data !== null && data !== undefined) {
          this.user = data;
        }
      },
      err => console.error(err),
      () => this.currentUserStats = this.user.statistics.slice()
    );
  }

  postStats(score: number, status: string, type: string, time: number, currentPage: number) {
    const stat = {
      status: status,
      score: score,
      type: type,
      time: time,
      currentPage: currentPage,
      user: this.user,
      book: this.currentBook
    };

    this._demoService.postStats(stat).subscribe(
      (response: Response) => {
        console.log(response);
      },
      err => console.error(err),
      () => this.getUser(this.user.name)
    );
  }

  postComment(comment) {
    const comm = {
      content: comment,
      book: this.currentBookComments
    };

    this._demoService.postComment(comm).subscribe(
      (response: Response) => {
        console.log(response);
      },
      err => console.error(err),
      () => {
        this.getBooks();
      }
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

  saveUser(name, password, mail, gender, age) {
    const user = {
      name: name,
      password: password,
      email: mail,
      gender: gender,
      age: age,
      statistics: []
    };

    this._demoService.postUser(user).subscribe(
      (response: Response) => {
        console.log(response);
      },
      err => console.error(err),
      () => console.log('successfully created user')
    );
  }

  updateUser(name, password, mail, gender, age) {
    this.user.name = name;
    this.user.password = password;
    this.user.mail = mail;
    this.user.gender = gender;
    this.user.age = age;

    this._demoService.putUser(this.user).subscribe(
      (response: Response) => {
        console.log(response);
      },
      err => console.error(err),
      () => console.log('successfully updated user')
    );

  }

  putStat(score, status, type, time, currentPage) {
    this.statEdit.score = score;
    this.statEdit.status = status;
    this.statEdit.type = type;
    this.statEdit.time = time;
    this.statEdit.currentPage = currentPage;

    this._demoService.putStat(this.statEdit).subscribe(
      (response: Response) => {
        console.log(response);
      },
      err => console.error(err),
      () => console.log('successfully updated stat')
    );
  }

  doRegister() {
    const name = this.nameRegInputRef.nativeElement.value;
    const password = this.passRegInputRef.nativeElement.value;
    const mail = this.mailInputRef.nativeElement.value;
    const gender = this.genderInputRef.nativeElement.value;
    const age = this.ageInputRef.nativeElement.value;

    if (name !== undefined && name !== null && name !== '' &&
      password !== undefined && password !== null && password !== '' &&
      mail !== undefined && mail !== null && mail !== '' &&
      gender !== undefined && gender !== null && gender !== '' &&
      age !== undefined && age !== null && age !== ''
    ) {
      this.page = 'bookList';
      this.error = '';
      this.saveUser(name, password, mail, gender, age);
    } else {
      this.error = 'Proszę uzupełnić wszystkie pola!';
    }
  }

  doUpdateUser() {
    const name = this.nameUpInputRef.nativeElement.value;
    const password = this.passUpInputRef.nativeElement.value;
    const mail = this.mailUpInputRef.nativeElement.value;
    const gender = this.genderUpInputRef.nativeElement.value;
    const age = this.ageUpInputRef.nativeElement.value;

    if (name !== undefined && name !== null && name !== '' &&
      password !== undefined && password !== null && password !== '' &&
      mail !== undefined && mail !== null && mail !== '' &&
      gender !== undefined && gender !== null && gender !== '' &&
      age !== undefined && age !== null && age !== ''
    ) {
      this.page = 'profilePage';
      this.error = '';
      this.updateUser(name, password, mail, gender, age);
    } else {
      this.error = 'Proszę uzupełnić wszystkie pola!';
    }
  }

  doSearch() {
    const search = this.searchInputRef.nativeElement.value;
    const regex = new RegExp(search, 'i');
    this.booksCopy = [];
    for (const book of this.books) {
      if (regex.test(book.title)) {
        this.booksCopy.push(book);
      }
    }
    this.page = 'bookList';
  }

  doUserStatsSearch() {
    const search = this.searchUserInputRef.nativeElement.value;
    const regex = new RegExp(search, 'i');
    this.currentUserStats = [];
    for (const stat of this.user.statistics) {
      if (regex.test(stat.book.title)) {
        this.currentUserStats.push(stat);
      }
    }
  }

  doWszystkieSort() {
    this.currentUserStats = this.user.statistics.slice();
  }

  doPrzeczytaneSort() {
    this.currentUserStats = [];
    for (const stat of this.user.statistics) {
      if (stat.status === 'Przeczytane') {
        this.currentUserStats.push(stat);
      }
    }
  }

  doWtrakcieSort() {
    this.currentUserStats = [];
    for (const stat of this.user.statistics) {
      if (stat.status === 'W trakcie') {
        this.currentUserStats.push(stat);
      }
    }
  }

  doNapotemSort() {
    this.currentUserStats = [];
    for (const stat of this.user.statistics) {
      if (stat.status === 'Na potem') {
        this.currentUserStats.push(stat);
      }
    }
  }

  addBook(index: number) {
    let hasbook = false;
    for (const statistic of this.user.statistics) {
      if (statistic.book.bookID === this.booksCopy[index].bookID) {
        hasbook = true;
      }
    }

    if (hasbook) {
      alert('You already got this book in your collection!!');
    } else {
      this.page = 'addBookPage';
      this.currentBook = this.booksCopy[index];
    }
  }

  editStat(index: number) {
    this.page = 'EditStat';
    this.statEdit = this.currentUserStats[index];
  }

  saveEditStat() {
    const score = this.scoreEditInputRef.nativeElement.value;
    const status = this.statusEditInputRef.nativeElement.value;
    const type = this.typeEditInputRef.nativeElement.value;
    const time = this.timeEditInputRef.nativeElement.value;
    const currentPage = this.currentPageEditInputRef.nativeElement.value;

    if (score !== undefined && score !== null && score !== '' &&
      status !== undefined && status !== null && status !== '' &&
      type !== undefined && type !== null && type !== '' &&
      time !== undefined && time !== null && time !== '' &&
      currentPage !== undefined && currentPage !== null && currentPage !== ''
    ) {
      this.page = 'profilePage';
      this.error = '';
      this.putStat(score, status, type, time, currentPage);
    } else {
      this.error = 'Proszę uzupełnić wszystkie pola!';
    }
  }

  saveBook() {
    const score = this.scoreInputRef.nativeElement.value;
    const status = this.statusInputRef.nativeElement.value;
    const type = this.typeInputRef.nativeElement.value;
    const time = this.timeInputRef.nativeElement.value;
    const currentPage = this.currentPageInputRef.nativeElement.value;

    if (score !== undefined && score !== null && score !== '' &&
      status !== undefined && status !== null && status !== '' &&
      type !== undefined && type !== null && type !== '' &&
      time !== undefined && time !== null && time !== '' &&
      currentPage !== undefined && currentPage !== null && currentPage !== ''
    ) {
      this.page = 'bookList';
      this.error = '';
      this.postStats(score, status, type, time, currentPage);
    } else {
      this.error = 'Proszę uzupełnić wszystkie pola!';
    }

  }

  goBookComment(index: number) {
    this.page = 'bookComments';
    this.currentBookComments = this.booksCopy[index];
  }

  AddComment() {
    const comment = this.commentInputRef.nativeElement.value;

    if (comment !== undefined && comment !== null && comment !== '') {
      this.error = '';
      this.currComment = comment;
      console.log(comment);
      this.currentBookComments.comments.push({content: comment});
      this.postComment(comment);
      this.commentInputRef.nativeElement.value = '';
    } else {
      this.error = 'Proszę napisać coś w komentarzu!';
    }
  }
}

