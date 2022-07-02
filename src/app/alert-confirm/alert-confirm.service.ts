import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  showChanged = new Subject<boolean>();
  confirmAlertChange = new Subject<boolean>();

  private show: boolean = false;
  private confirm: boolean = false;

  setShow(value: boolean): void {
    this.show = value;
    this.showChanged.next(this.show);
  }

  setConfirm(value:boolean):void{
    this.confirm = value;
    this.confirmAlertChange.next(this.confirm);
  }










}