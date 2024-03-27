import { Component, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehicleDetailsComponent } from '../vehicle-details/vehicle-details.component';
import { PlateHelpComponent } from '../plate-help/plate-help.component';
import { MainServiceService } from '../main-service.service';
import { QueryListerComponent } from '../query-lister/query-lister.component';

@Component({
  selector: 'app-new-query',
  standalone: true,
  imports: [QueryListerComponent, PlateHelpComponent, VehicleDetailsComponent, CommonModule],
  templateUrl: './new-query.component.html',
  styleUrl: './new-query.component.css'
})
export class NewQueryComponent {

  constructor(private mainservice: MainServiceService) {
    this.queryLister = new QueryListerComponent();
    this.vehicle = new VehicleDetailsComponent(mainservice);
  }

  @ViewChild(VehicleDetailsComponent)
  private vehicle: VehicleDetailsComponent;
  @ViewChild(QueryListerComponent)
  private queryLister: QueryListerComponent;

  @Output() isUpdate: boolean = true
  @Output() isQuery: boolean = true
  @Output() isDisabled: boolean = false;

  allValid: boolean = false;
  isValid: Array<boolean> = [false, false, false];
  isShowHelp: boolean = false;
  vehicleRecords: any = {}
  routeRecords: any = {}

  checkIfVehicleValid(input: any) {
    this.isValid = input.isValid
    if (!this.isValid.includes(false)) {
      this.allValid = true
    } else {
      this.allValid = false
    }
  }


  async getRouteNEW(isFilterd: boolean) {
    this.queryLister.loadedRecords = []
    this.queryLister.loadedLength = 0
    console.log(this.routeRecords.docs.length)
    let index = 0
    index = 0
    await this.routeRecords.forEach((element: any) => {
      if (element.data()["mainId"] && ((element.data()["mainId"] == this.vehicle.vehicleRecord["mainID"]) || (!isFilterd))) {
        index += 1
        this.passID(element.data()).then((retAct) => {
          this.queryLister.displayLength = index
          this.queryLister.addRecords(retAct)
        })
      }
      if (index == this.routeRecords.docs.length) { this.queryLister.addRecords(null) }
    })
  }

  async passID(dat: any) {
    let actRecord: { [keys: string]: string } = {}
    await this.mainservice.getRecords("recordedVehicles", null).then(async (ret) => {
      await ret.forEach((element: any) => {
        if (dat["mainId"] == element.id) {
          actRecord = dat
          for (const elem in element.data()) {
            actRecord[elem] = element.data()[elem]
          };
        }
      });

    })
    return actRecord ? actRecord : null
  }

  showHelp() {
    console.log(this.isValid)
    this.isShowHelp = true
  }

  closeHelp() {
    this.isShowHelp = false
  }

  ngOnInit(): void {
    this.isQuery = true
    this.mainservice.getRecords("recordedRoutes", null).then((ret) => {
      this.routeRecords = ret
      console.log(this.routeRecords)
    })
  }

}
