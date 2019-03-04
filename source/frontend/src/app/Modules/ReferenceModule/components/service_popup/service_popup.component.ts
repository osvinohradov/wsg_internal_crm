import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import { RefServiceTypeService, RefCounterpartyService } from '../../services';
import { ServiceTypeReference } from '../../models';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'service-popup-ref',
  templateUrl: './service_popup.component.html',
  styleUrls: ['./service_popup.component.css', './../service/service.component.css']
})
export class ServicePopupReferencesComponent implements OnInit {
  public input_autocomplete = new FormControl();
  public is_saved: Boolean = false;
  public counterparties_names_ids: any[] = [];

  constructor(
    public dialogRef: MatDialogRef<ServiceTypeReference>,
    @Inject(MAT_DIALOG_DATA) public service_type: ServiceTypeReference,
    public RefServiceTypeService: RefServiceTypeService, public RefCounterpartyService: RefCounterpartyService
  ) {
    this.get_counterparties_names_ids(null);
    if (!this.service_type) {
      this.service_type = new ServiceTypeReference();
    }
  }

  ngOnInit() {}

  update_service_type(service_type: ServiceTypeReference) {
    this.RefServiceTypeService.update_service_type(service_type).subscribe(data => {
      this.service_type = data as ServiceTypeReference;
    });
  }

  save_service_type(service_type: ServiceTypeReference) {
    this.RefServiceTypeService.save_service_type(service_type).subscribe(data => {
      let tmp = data as ServiceTypeReference;
      if (!tmp._id) {
        this.is_saved = false;
      } else {
        console.log('Service type:', service_type)
        this.service_type = tmp;
        this.is_saved = true;
      }
    });
  }

  remove_service_type(service_type_id: string) {
    if (!service_type_id) {
      console.log(`service_type_id не передано.`);
      // Show error dialog
      return;
    }

    this.RefServiceTypeService.remove_service_type(service_type_id).subscribe(() => {
      this.dialogRef.close({ action: "remove", id: service_type_id, element: null });
    });
  }

  save_and_close(service_type: ServiceTypeReference) {
    // Save ticket
    this.save_update_service_type(service_type);
    this.close_dialog(service_type);
  }

  save_update_service_type(service_type: ServiceTypeReference) {
    if (!service_type._id) {
      this.save_service_type(service_type);
    } else {
      this.update_service_type(service_type);
      this.is_saved = true;
    }
  }
  /**
   *
   * data = {
   * action: "" (create, update, remove),
   * id: "",
   * element: Object
   * }
   *
   * @param data
   */
  close_dialog(data): void {
    console.log("Close dialog:", data);
    if (!this.is_saved) {
      this.dialogRef.close(null);
    } else {
      this.dialogRef.close(data);
    }
  }

  get_counterparties_names_ids(pattern: string){
    console.log(pattern)
    // this.RefCounterpartyService.get_counterparties_names_ids(pattern).subscribe((data) => {
    //   console.log('Data:', data)
    //   this.counterparties_names_ids = data;
    //   console.log(this.counterparties_names_ids)
    // });
  }
}
