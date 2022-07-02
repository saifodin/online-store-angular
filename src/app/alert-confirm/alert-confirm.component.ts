import { Component, Input, OnInit } from '@angular/core';
import { AlertService } from './alert-confirm.service';

@Component({
  selector: 'app-alert-confirm',
  templateUrl: './alert-confirm.component.html',
  styleUrls: ['./alert-confirm.component.scss']
})
export class AlertConfirmComponent implements OnInit {

  @Input() show: boolean = false

  constructor(private alertService: AlertService) { }

  ngOnInit(): void {
    this.alertService.showChanged.subscribe(value => {
      this.show = value;
    })
  }

  closeAlert(isConfirm: boolean) {
    console.log("isConfirm", isConfirm);
    this.alertService.setShow(false);
    this.alertService.setConfirm(isConfirm);
  }

}
