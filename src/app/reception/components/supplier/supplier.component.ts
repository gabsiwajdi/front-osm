import { Component, ViewChild, TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Supplier } from '../../models/supplier';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SupplierService } from '../../services/supplier.service';
import { GenericTypeService } from '../../services/generic-type.service';
import { BaseType } from '../../models/baseType';
import { MatOption, MatSelect } from '@angular/material/select';

@Component({
  selector: 'app-supplier',
  imports: [
    MatIconModule,
    MatButtonModule,
    CommonModule,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatSelect,
    MatOption
  ],
  standalone: true,
  templateUrl: './supplier.component.html',
  styleUrl: './supplier.component.scss'
})
export class SupplierComponent {
  supplierForm: FormGroup;
  supplierTypes: BaseType[] = [];
  @ViewChild('dialogTemplate') dialogTemplate!: TemplateRef<any>;
  displayedColumns: string[] = ['id', 'name', 'lastname', 'phone', 'email', 'address', 'suppliertype', 'actions'];
  suppliers: Supplier[] = [];
  dialogTitle: string = '';
  currentSupplier: Supplier | null = null;

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private supplierService: SupplierService,
    private genericService: GenericTypeService
  ) {
    this.supplierForm = this.fb.group({
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.email],
      address: ['', Validators.required],
      suppliertype: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadSupplierTypes();
    this.loadSupplier();
  }

  openEditDialog(supplier: Supplier): void {
    // Préparer le formulaire pour la modification
    this.supplierForm.setValue({
      id: supplier.id,
      name: supplier.name,
      lastname: supplier.lastname,
      phone: supplier.phone,
      email: supplier.email || '',
      address: supplier.address,
      suppliertype: supplier.suppliertype || ''
    });
    this.dialogTitle = 'Modifier le fournisseur';
    this.currentSupplier = supplier;
  }

  closeDialog(): void {
    this.dialog.closeAll();
  }

  loadSupplierTypes(): void {
    this.genericService.getAllTypes('SUPPLIERTYPE').subscribe({
      next: (response) => {
        console.log("Réponse complète de l'API :", response);
        if (response && 'data' in response && Array.isArray(response.data)) {
          this.supplierTypes = response.data; // Récupère la liste réelle des types
        } else {
          this.supplierTypes = []; // Assigne un tableau vide pour éviter une erreur
          console.warn("Structure inattendue des données, vérifiez l'API");
        }
      },
      error: (err) => {
        console.error('Erreur lors du chargement des types de fournisseurs :', err);
      }
    });
  }

  loadSupplier(): void {
    this.supplierService.getAllTypes().subscribe({
      next: (response) => {
        console.log("Réponse complète de l'API :", response);
        if (response && 'data' in response && Array.isArray(response.data)) {
          this.suppliers = response.data; // Récupère la liste réelle des types
        } else {
          this.suppliers = []; // Assigne un tableau vide pour éviter une erreur
          console.warn("Structure inattendue des données, vérifiez l'API");
        }
      },
      error: (err) => {
        console.error('Erreur lors du chargement des types de fournisseurs :', err);
      }
    });
  }

  deleteSupplier(supplier: Supplier): void {
    Swal.fire({
      title: 'Êtes-vous sûr ?',
      text: `Vous voulez supprimer ${supplier.name} ${supplier.lastname} ?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, supprimer',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.suppliers = this.suppliers.filter((s) => s.id !== supplier.id);
        Swal.fire('Supprimé!', `${supplier.name} a été supprimé`, 'success');
      }
    });
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(this.dialogTemplate, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.suppliers.push(result); // Ajouter le fournisseur à la liste après la fermeture du modal
      }
    });
  }

  save(): void {
    if (this.supplierForm.valid) {
      const formValue = this.supplierForm.value;

      if (this.currentSupplier) {
        // Mode édition : Mettre à jour le fournisseur existant
        // this.updateSupplier(formValue);
      } else {
        // Mode ajout : Ajouter un nouveau fournisseur
        this.addNewSupplier(formValue);
      }
    } else {
      console.error('Le formulaire est invalide.');
    }
  }

  /**
   * Ajoute un nouveau fournisseur via le service.
   * @param supplierData - Les données du fournisseur à ajouter.
   */
  addNewSupplier(supplierData: Supplier): void {
    this.supplierService.addSupplier(supplierData).subscribe({
      next: (newSupplier) => {
        this.suppliers.push(newSupplier);
        this.closeDialog();
        Swal.fire({
          title: 'Succès !',
          text: 'Le fournisseur a été ajouté avec succès.',
          icon: 'success',
          confirmButtonText: 'OK'
        });
        console.log('Fournisseur ajouté avec succès :', newSupplier);
      },
      error: (err) => {
        console.error("Erreur lors de l'ajout du fournisseur :", err);
        Swal.fire({
          title: 'Erreur !',
          text: "Une erreur est survenue lors de l'ajout du fournisseur.",
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    });
  }

  // updateSupplier(supplierData: any): void {
  //   this.supplierService.updateSupplier(supplierData).subscribe({
  //     next: (updatedSupplier) => {
  //       const index = this.suppliers.findIndex((s) => s.id === updatedSupplier.id);
  //       if (index !== -1) {
  //         this.suppliers[index] = updatedSupplier; // Met à jour la liste locale
  //       }
  //       this.closeDialog(); // Ferme la boîte de dialogue
  //       Swal.fire({
  //         title: 'Succès !',
  //         text: 'Le fournisseur a été mis à jour avec succès.',
  //         icon: 'success',
  //         confirmButtonText: 'OK'
  //       });
  //     },
  //     error: (err) => {
  //       console.error('Erreur lors de la mise à jour du fournisseur :', err);
  //       Swal.fire({
  //         title: 'Erreur !',
  //         text: 'Une erreur est survenue lors de la mise à jour du fournisseur.',
  //         icon: 'error',
  //         confirmButtonText: 'OK'
  //       });
  //     }
  //   });
  // }
}
