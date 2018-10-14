import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';

export interface NavSub {
  id: number;
  name: string;
  title: string;
  icon: string;
  href: string;
  thumb: string;
  postcard: string;
}

export interface NavMenu {
  id: number;
  name: string;
  title: string;
  icon: string;
  sub: NavSub[];
}

export interface NavMain {
  main: number[];
  menu: NavMenu[];
}

@Injectable()
export class NavigationService {
  private menudata: NavMain;
  private _menuState: [boolean, boolean, NavMenu] = [false, false, null];
  private curretMenuSubject = new Subject<NavMain>();
  private selectedMenuSubject = new Subject<NavMenu>();
  private menuStateSubject = new Subject<[boolean, boolean, NavMenu]>();

  curretMenuSubject$ = this.curretMenuSubject.asObservable();
  selectedMenuId$ = this.selectedMenuSubject.asObservable();
  menuStateSubject$ = this.menuStateSubject.asObservable();

  constructor(private http: HttpClient) { }

  public getMainMenu(path: string) {
    return this.http.get<NavMain>(path).pipe(
      map(res => {
        this.menudata = res;
        this.curretMenuSubject.next(res);
      })
    );
  }

  public getSubMenu(id: number): NavSub[] {
    return this.menudata.menu.find(x => x.id === id).sub;
  }

  public setSelectedMenu(item: NavMenu) {
    this.selectedMenuSubject.next(item);
  }

  get menuState(): [boolean, boolean, NavMenu] {
    return this._menuState;
  }

  set menuState(state: [boolean, boolean, NavMenu]) {
    this._menuState = state;
    this.menuStateSubject.next(state);
  }
}
