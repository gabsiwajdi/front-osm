import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-configuration',
  standalone:true ,
  imports: [ MatTabsModule ,ReactiveFormsModule,MatButtonModule,MatTableModule,MatSelectModule,CommonModule],
  templateUrl: './configuration.component.html',
  styleUrl: './configuration.component.scss'
})
export class ConfigurationComponent {

  infoMoulainForm: FormGroup;

  types = ['Region', 'Supplier Type', 'Waste Type', 'Olive Variety Type'];

  addForm: FormGroup;
  displayedColumns: string[] = ['id', 'name', 'description', 'createdAt', 'updatedAt', 'actions'];
  dataSource: any[] = [];
  selectedType: string = '';



  constructor(private fb: FormBuilder) {
    this.infoMoulainForm = this.fb.group({
      logo: [''], // Vous pouvez gérer le fichier ici
      libelle: ['', Validators.required],
      tel1: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      tel2: [''],
      mail: ['', [Validators.required, Validators.email]],
      adresse: ['', Validators.required],
      rne: ['', Validators.required],
      patente: ['', Validators.required]
    });

    this.addForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  // Méthode pour gérer la sélection du type
  onTypeChange(type: string) {
    this.selectedType = type;
    this.loadTableData(type); // Chargez les données en fonction du type sélectionné
  }

  // Simuler le chargement des données pour la table
  loadTableData(type: string) {
    // Remplacez cela par un appel API pour charger les données réelles
    this.dataSource = [
      { id: 1, name: `${type} 1`, description: `Description for ${type} 1`, createdAt: new Date(), updatedAt: new Date() },
      { id: 2, name: `${type} 2`, description: `Description for ${type} 2`, createdAt: new Date(), updatedAt: new Date() }
    ];
  }

  // Méthode pour ajouter un nouvel élément
  onSubmit() {
    if (this.addForm.valid && this.selectedType) {
      const newItem = {
        id: this.dataSource.length + 1,
        name: this.addForm.value.name,
        description: this.addForm.value.description,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      this.dataSource.push(newItem);
      this.dataSource = [...this.dataSource]; // Mettez à jour la table
      this.addForm.reset(); // Réinitialisez le formulaire
    }
  }

  // Méthode pour supprimer un élément (exemple d'action)
  deleteItem(id: number) {
    this.dataSource = this.dataSource.filter(item => item.id !== id);
  }

  // Méthode pour soumettre le formulaire
  onSubmitType() {
    if (this.infoMoulainForm.valid) {
      console.log('Données du formulaire :', this.infoMoulainForm.value);
      // Envoyez les données au backend ou effectuez d'autres actions
    } else {
      console.log('Formulaire invalide');
    }
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      console.log('Fichier sélectionné :', file);
      // Vous pouvez stocker le fichier dans une variable ou l'envoyer directement au backend
    }
  }

}
