import { Component, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehicleDetailsComponent } from '../vehicle-details/vehicle-details.component';
import { RouteDetailsComponent } from '../route-details/route-details.component';
import { MainServiceService } from '../main-service.service';
import { ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PlateHelpComponent } from '../plate-help/plate-help.component';
@Component({
  selector: 'app-add-page',
  standalone: true,
  imports: [PlateHelpComponent, FormsModule, CommonModule, VehicleDetailsComponent, RouteDetailsComponent],
  templateUrl: './add-page.component.html',
  styleUrl: './add-page.component.css'
})
export class AddPageComponent {

  constructor(private mainservice: MainServiceService) {
    this.vehicle = new VehicleDetailsComponent(mainservice);
    this.routeComp = new RouteDetailsComponent(mainservice);
  }

  @ViewChild(VehicleDetailsComponent)
  private vehicle: VehicleDetailsComponent;

  @ViewChild(RouteDetailsComponent)
  private routeComp: RouteDetailsComponent

  allValid: boolean = false;
  @Output() isDisabled: boolean = false;
  isValid: Array<boolean> = [false, false, false];
  isShowHelp: boolean = false;
  isrouteShowHelp: boolean = false;
  RouteValid: Array<boolean> = [false, false, false, false, false, false];
  allRouteValid: boolean = false;
  isUpdate: boolean = false
  public isKeep = false;

  addRoute() {
    this.isDisabled = true;
  }

  editVehicle() { this.isDisabled = false }

  checkIfVehicleValid(input: any) {
    this.isValid = input.isValid
    if (!this.isValid.includes(false)) {
      this.allValid = true
    } else {
      this.allValid = false
      this.isDisabled = false;
    }
    this.isUpdate = input.isUpdate
  }

  checkIfRouteValid(isValid: any) {
    if (!isValid.includes(false)) {
      this.allRouteValid = true
    } else {
      this.allRouteValid = false
    }
    console.log('AllRouteValid', this.allRouteValid)
    this.RouteValid = isValid
  }

  showHelp() {
    console.log(this.isValid)
    this.isShowHelp = true
  }
  closeHelp() {
    this.isShowHelp = false
  }
  closeRouteHelp() {
    this.isrouteShowHelp = false
  }
  showRouteHelp() {
    console.log(this.isValid)
    this.isrouteShowHelp = true
  }

  recordVehicleAndRoute() {
    this.vehicle.addVehicle().then(() => {
      this.recordRoute()
    })
    // console.log("record")
  }

  async recordRoute() {
    // console.log(this.vehicle.vehicleRecord["mainID"])
    // console.log(this.routeComp.thisRoute)
    // console.log("record")
    await this.routeComp.recordRoute(this.vehicle.vehicleRecord["mainID"].toString()).then(() => {
      this.routeComp.clearFields()
      if (!this.isKeep) {
        this.vehicle.clearFields()
      }
      // console.log(this.isKeep)
    })

  }
}
