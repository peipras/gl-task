import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, map } from 'rxjs/operators';
import { Observable, BehaviorSubject, Subject } from 'rxjs';

interface NavSub {
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
export class NavMenuService {
  private menudata: NavMain;

  private curretMenuSubject = new Subject<NavMain>();
  private selectedMenuSubject = new Subject<NavMenu>();

  curretMenuSubject$ = this.curretMenuSubject.asObservable();
  selectedMenuId$ = this.selectedMenuSubject.asObservable();

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

}
