import { Component, OnInit } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

@Component({
  selector: "avia",
  templateUrl: "./group_invoice.component.html",
  styleUrls: ["./group_invoice.component.css"]
})
export class GroupInvoiceComponent implements OnInit {
    ngOnInit(): void {
        console.log('Ng Init Method')
    }
  
  constructor() {}
}
