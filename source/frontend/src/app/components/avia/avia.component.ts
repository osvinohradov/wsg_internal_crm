import { Component, OnInit } from "@angular/core";

@Component({
  selector: "avia",
  templateUrl: "./avia.component.html",
  styleUrls: ["./avia.component.css"]
})
export class AviaInvoiceComponent implements OnInit {
    ngOnInit(): void {
        console.log('Ng Init Method')
    }
  
  constructor() {}
}
