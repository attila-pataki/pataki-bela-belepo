import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { enableProdMode } from '@angular/core';
import { MainServiceService } from '../main-service.service';

enableProdMode();

@Component({
  selector: 'app-route-details',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './route-details.component.html',
  styleUrl: './route-details.component.css'
})
export class RouteDetailsComponent {

  date: string = "";
  time: string = "";
  from: string = "";
  destination: string = "";
  partner: string = "";
  distance: number | null = null;
  activeData: { [key: string]: string } = {}
  thisRoute: any = {};
  todayDate = new Date();
  isValid: Array<boolean> = [false, false, false, false, false, false];

  @Output() isAllValid = new EventEmitter<any>()
  @Input() routeFields: { [keys: string]: string } = {}

  constructor(private mainService: MainServiceService) {

  }

  originalOrder = (): number => {
    return 0;
  }

  clearFields() {
    this.date = ""
    this.time = ""
    this.from = ""
    this.destination = ""
    this.partner = ""
    this.distance = null
  }

  checkDate(): void {
    console.log(new Date(this.date).getTime(), ">", this.todayDate.getTime(), "|", new Date(this.date).getFullYear())
    if (new Date(this.date) <= this.todayDate && new Date(this.date).getFullYear() >= 1980) {
      this.isValid[0] = true
    } else { this.isValid[0] = false }
    this.checkAllValid()
  }

  checkTime(): void {
    if (this.time) {
      this.isValid[1] = true
    } else { this.isValid[1] = false }
    this.checkAllValid()
  }

  checkFrom(): void {
    if (this.from.length > 2) {
      this.isValid[2] = true
    } else { this.isValid[2] = false }
    this.checkAllValid()
  }
  checkDest(): void {
    if (this.destination.length > 2) {
      this.isValid[3] = true
    } else { this.isValid[3] = false }
    this.checkAllValid()
  }
  checkPartner(): void {
    if (this.partner.length > 2) {
      this.isValid[4] = true
    } else { this.isValid[4] = false }
    this.checkAllValid()
  }
  checkDist(): void {
    if (this.distance && this.distance > 0) {
      this.isValid[5] = true
    } else {
      this.isValid[5] = false
      if (this.distance && this.distance < 0) {
        this.distance = 0
      }
    }
    this.checkAllValid()
  }

  async checkAllValid() {
    this.thisRoute["date"] = this.date
    this.thisRoute["time"] = this.time
    this.thisRoute["from"] = this.from
    this.thisRoute["destination"] = this.destination
    this.thisRoute["partner"] = this.partner
    this.thisRoute["distance"] = this.distance
    console.log(this.isValid)
    await this.isAllValid.emit(this.isValid);

  }
  async recordRoute(mainID: string) {
    await this.checkAllValid().then(() => {
      this.thisRoute["mainId"] = mainID
      this.mainService.addRecord("recordedRoutes", this.thisRoute
      )
    })
  }

}
