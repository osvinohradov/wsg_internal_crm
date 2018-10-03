import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import { ServiceTypeService } from '../../services';

import { ServiceTypeReference } from '../../models';

@Component({
  selector: 'service-popup-ref',
  templateUrl: './servicePopup.component.html',
  styleUrls: ['./servicePopup.component.css', './../service/service.component.css']

  //  styleUrls: ['./invoicePopup.component.css', './../invoice/invoice.component.css']

})
export class ServicePopupReferencesComponent implements OnInit {
  public is_saved: Boolean = false;

  constructor(
    public dialogRef: MatDialogRef<ServiceTypeReference>,
    @Inject(MAT_DIALOG_DATA) public service_type: ServiceTypeReference,
    public ServiceTypeService: ServiceTypeService
  ) {
    if (!this.service_type) {
      this.service_type = new ServiceTypeReference();
    }
  }

  ngOnInit() {}

  update_service_type(service_type: ServiceTypeReference) {
    this.ServiceTypeService.update_service_type(service_type).subscribe(data => {
      this.service_type = data as ServiceTypeReference;
    });
  }

  save_service_type(service_type: ServiceTypeReference) {
    this.ServiceTypeService.save_service_type(service_type).subscribe(data => {
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

    this.ServiceTypeService.remove_service_type(service_type_id).subscribe(() => {
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

}
