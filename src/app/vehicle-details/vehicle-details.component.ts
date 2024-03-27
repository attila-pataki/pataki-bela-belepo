import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MainServiceService } from '../main-service.service';
import { PlateHelpComponent } from '../plate-help/plate-help.component';


@Component({
  selector: 'app-vehicle-details',
  standalone: true,
  imports: [PlateHelpComponent, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './vehicle-details.component.html',
  styleUrl: './vehicle-details.component.css'
})
export class VehicleDetailsComponent {

  constructor(private mainService: MainServiceService) { }

  @Input() isQuery: boolean = false
  @Input() inputFields: { [keys: string]: string } = {};
  @Input() isDisabled: boolean = false;
  @Output() isAllValid = new EventEmitter<any>()

  predefPlates: Array<string> = []
  plate: string = "";
  model: string = "";
  consumption: number | null = null;
  activeData: { [keys: string]: string } = {}
  isUpdate: boolean = false
  isShowHelp: boolean = false;
  isVehilceValid: boolean = false;
  vehicleRecord: { [keys: string]: string | number } = { "mainID": "" }
  plateValidator: Array<RegExp> = [/^[A-Z]{3}-[0-9]{3,4}$/m, /^[A-Z]{4}-[0-9]{2,3}$/m, /^[A-Z]{1} [0-9]{5}$/m, /^[A-Z]{2} [0-9]{4,6}$/m, /^[A-Z]{5} [0-9]{1,2}$/m, /^[A-Z]{6} [0-9]{1}$/m, /^[I] [0-9]{2}[A-Z]{2}[0-9]{2}$/m, /^[I] [0-9]{3}[A-Z]{2}$/m]
  isValid: Array<boolean> = [false, false, false];


  originalOrder = (): number => {
    return 0;
  }

  clearFields(leavePlate: boolean = false) {
    if (!leavePlate) { this.plate = "" }
    this.model = ""
    this.consumption = null
    this.plateKeyup('keyup')
    this.checkAllValid()
  }

  checkChange() {
    const pattern = /[^a-zA-Z0-9]/gm
    const let1 = /^[A-Z][0-9]{1,5}/gm
    const let2 = /^[A-Z]{2}[0-9]{1,6}/gm
    const let3 = /^[A-Z]{3}[0-9]{1,4}/gm
    const let4 = /^[A-Z]{4}[0-9]{1,3}/gm
    const let5 = /^[A-Z]{5}[0-9]{1,2}/gm
    const let6 = /^[A-Z]{6}[0-9]{1}/gm
    const let7 = /^[I]{1}[0-9]{2}[A-Z]{2}[0-9]{2}/gm
    const let8 = /^[I]{1}[0-9]{3}[A-Z]{2}/gm
    if (pattern.test(this.plate[this.plate.length - 1])) { this.plate = this.plate.substring(0, this.plate.length - 1) }

    if (let1.test(this.plate)) { this.plate = this.plate.substring(0, 1) + " " + this.plate.substring(1, this.plate.length) }
    if (let2.test(this.plate)) { this.plate = this.plate.substring(0, 2) + " " + this.plate.substring(2, this.plate.length) }
    if (let3.test(this.plate)) { this.plate = this.plate.substring(0, 3) + "-" + this.plate.substring(3, this.plate.length) }
    if (let4.test(this.plate)) { this.plate = this.plate.substring(0, 4) + "-" + this.plate.substring(4, this.plate.length) }
    if (let5.test(this.plate)) { this.plate = this.plate.substring(0, 5) + " " + this.plate.substring(5, this.plate.length) }
    if (let6.test(this.plate)) { this.plate = this.plate.substring(0, 6) + " " + this.plate.substring(6, this.plate.length) }
    if (let7.test(this.plate)) { this.plate = this.plate.substring(0, 1) + " " + this.plate.substring(1, this.plate.length) }
    if (let8.test(this.plate)) { this.plate = this.plate.substring(0, 1) + " " + this.plate.substring(1, this.plate.length) }
    this.plate = this.plate.trim()
    this.isUpdate = (this.predefPlates.indexOf(this.plate) > -1)

    this.checkAllValid()

  }

  async checkAllValid() {
    this.vehicleRecord["plate"] = this.plate
    this.vehicleRecord["consumption"] = Number(this.consumption)
    this.vehicleRecord["model"] = this.model
    await this.isAllValid.emit({ isValid: this.isValid, isUpdate: this.isUpdate });
  }

  async setRecord() {
    await this.mainService.setID(this.plate).then((ret) => {
      console.log(ret)
      if (ret["mainID"]) {
        this.model = ret["model"];
        this.consumption = Number(ret["consumption"]);

        this.vehicleRecord = ret
        this.consumptoinKeyup()
        this.modelKeyup()
      } else {
        if (this.vehicleRecord["mainID"]) {
          this.clearFields(true)
        } else {

        }
        this.vehicleRecord = { "plate": this.plate, "consumption": Number(this.consumption), "model": this.model, "mainID": "" }
        this.consumptoinKeyup()
        this.modelKeyup()
      }
    }).then(() => { console.log(this.vehicleRecord) }).catch((err) => { console.log(err) })

  }

  async getPlates() {
    this.predefPlates = [];
    (await this.mainService.getRecords("recordedVehicles", null)).forEach((doc: any) => {
      this.predefPlates.push(doc.data()['plate'])
    })
    this.predefPlates = this.predefPlates.sort()
  }

  showHelp() {
    this.isShowHelp = true
  }

  closeHelp() {
    this.isShowHelp = false
  }


  modelKeyup() {
    if (this.model.length > 2) {
      this.isValid[1] = true
    } else {
      this.isValid[1] = false
    }
    this.checkAllValid()
  }

  consumptoinKeyup() {
    if (this.consumption && this.consumption > 0) {
      this.isValid[2] = true
    } else {
      this.isValid[2] = false
      if (this.consumption && this.consumption < 0) { this.consumption = 0 }
    }
    this.checkAllValid()
  }


  async plateKeyup($event: any) {
    this.checkChange()
    this.isValid[0] = false
    this.plateValidator.forEach(regexp => {
      if (regexp.test(this.plate.trim())) {
        this.isValid[0] = true
      }
    })
    this.setRecord().then(() => {
      this.checkAllValid()
    })
  }

  async addVehicle() {
    this.checkAllValid()
    await this.mainService.addRecord("recordedVehicles", this.vehicleRecord
    ).then((ret) => {
      this.vehicleRecord["mainID"] = ret
      this.getPlates().then(() => {
        this.plateKeyup('keyup')

        console.log(this.vehicleRecord["mainID"])
      })
    })
  }


  ngOnInit(): void {
    this.getPlates()
  }
}