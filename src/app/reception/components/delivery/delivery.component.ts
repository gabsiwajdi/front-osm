import { Component, OnInit, ViewChild, TemplateRef, inject } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {Delivery} from "../../models/delivery";

@Component({
  selector: 'app-delivery',
  standalone:true,
  imports: [  CommonModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule],
  templateUrl: './delivery.component.html',
  styleUrl: './delivery.component.scss'
})
export class DeliveryComponent {

  deliveries: Delivery[] = [];
  displayedColumns: string[] = ['receiptNumber', 'lotNumber','fournisseur', 'deliveryDate', 'oliveQuantity', 'status', 'actions'];
  @ViewChild('dialogTemplate') dialogTemplate!: TemplateRef<any>;
  currentDelivery: Delivery | null = null;
  deliveryForm!: FormGroup;



  constructor(public dialog: MatDialog ,private fb:FormBuilder ) {}

  ngOnInit() {
    this.loadDeliveries();
  }
  loadDeliveries() {
    const data = sessionStorage.getItem('deliveries');
    this.deliveries = data ? JSON.parse(data) : [];
  }

  saveDeliveries() {
    sessionStorage.setItem('deliveries', JSON.stringify(this.deliveries));
  }

  openDialog(delivery?: Delivery) {
    this.currentDelivery = delivery || this.getEmptyDelivery();
    this.initForm(this.currentDelivery);

    this.dialog.open(this.dialogTemplate, {
      width: '600px',
    });
  }

  initForm(delivery: Delivery) {
    this.deliveryForm = this.fb.group({
      receiptNumber: [delivery.receiptNumber, Validators.required],
      lotNumber: [delivery.lotNumber, Validators.required],
      fournisseur:[delivery.fournisseur,Validators.required],
      deliveryDate: [delivery.deliveryDate, Validators.required],
      status: [delivery.status, Validators.required],
      oliveQuantity: [delivery.oliveQuantity, [Validators.required, Validators.min(1)]],
    });
  }

  onSubmit() {
    if (this.deliveryForm.valid) {
      const formData = this.deliveryForm.value;

      if (this.currentDelivery?.id) {
        // Modification
        this.deliveries = this.deliveries.map(d =>
          d.id === this.currentDelivery!.id ? { ...this.currentDelivery, ...formData } : d
        );
      } else {
        // Ajout
        const newDelivery = { ...formData, id: this.deliveries.length + 1 };
        this.deliveries.push(newDelivery);
      }

      this.saveDeliveries();
      this.dialog.closeAll();
    }
  }

  deleteDelivery(id?: number) {
    if (id) {
      this.deliveries = this.deliveries.filter(d => d.id !== id);
      this.saveDeliveries();
    }
  }

  getEmptyDelivery(): Delivery {
    return {
      receiptNumber: '',
      lotNumber: '',
      fournisseur:'',
      deliveryDate: '',
      status: 'En attente',
      globalLotNumber: '',
      oliveQuantity: 0,
      oilQuantity: 0,
      region: null,
      oliveVariety: null,
      storageUnit: '',
      supplier: null,
      unitPrice: 0,
      price: 0,
      paidAmount: 0,
      unpaidAmount: 0,
      qualityControlResults: [],
    };
  }
}
