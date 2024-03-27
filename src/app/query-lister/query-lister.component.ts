import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-query-lister',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './query-lister.component.html',
  styleUrl: './query-lister.component.css'
})
export class QueryListerComponent {

  loadedRecords: Array<any> = []
  displayRecords: Array<any> = []
  displayLength: number = 0
  loadedLength: number = 0
  isLoading: number = 0
  totalKm: number = 0
  totalFuel: number =0
  columns = [
    "Rendszám",
    "Típus",
    "Fogyasztás",
    "Dátum",
    "Idő",
    "Honnan",
    "Hová",
    "Partner",
    "Megtett km"]

  Datacolumns = [
    "plate",
    "model",
    "consumption",
    "date",
    "time",
    "from",
    "destination",
    "partner",
    "distance"]

  addRecords(record: any) {
    this.isLoading = 1
    if (record) {

      this.loadedLength += 1
      this.totalKm += record['distance']
      this.totalFuel += record['distance'] * record['consumption']
      this.loadedRecords.push(record)
      if (this.loadedLength == this.displayLength) {
        console.log(this.loadedRecords)
        console.log(this.loadedLength, " == ", this.displayLength)
        console.log("all loaded")
        this.isLoading = 2
       
      }
    }
  }


}
