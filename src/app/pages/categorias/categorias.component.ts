import { Categoria } from './../../models/Categoria';
import { Component, OnInit, signal, ViewChild } from '@angular/core';
import { Table, TableModule } from 'primeng/table';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { RatingModule } from 'primeng/rating';
import { TagModule } from 'primeng/tag';
import { DialogModule } from 'primeng/dialog';
import { SelectModule } from 'primeng/select';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { CategoriaService } from '../../services/categoria.service';

interface Column {
    field: string;
    header: string;
    customExportHeader?: string;
}

interface ExportColumn {
    title: string;
    dataKey: string;
}

@Component({
  selector: 'app-categorias',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    FormsModule,
    ButtonModule,
    RippleModule,
    ToastModule,
    ToolbarModule,
    RatingModule,
    InputTextModule,
    TextareaModule,
    SelectModule,
    RadioButtonModule,
    InputNumberModule,
    DialogModule,
    TagModule,
    InputIconModule,
    IconFieldModule,
    ConfirmDialogModule,
    ReactiveFormsModule
  ],
  templateUrl: './categorias.component.html',
  providers:[MessageService, CategoriaService, ConfirmationService]
})
export class CategoriasComponent implements OnInit{
    categoriaDialog: boolean = false;

    categorias = signal<Categoria[]>([]);

    categoria!: Categoria;

    selectedCategorias!: Categoria[] | null;

    submitted: boolean = false;

    statuses!: any[];

    @ViewChild('dt') dt!: Table;

    formulario: FormGroup;

    accion: string= "";

    exportColumns!: ExportColumn[];

    cols!: Column[];

    constructor(
        private categoriaService: CategoriaService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService
    ) {
        this.formulario = new FormGroup({
            descripcion: new FormControl('',[Validators.required])
        });
    }

    exportCSV() {
        this.dt.exportCSV();
    }

    ngOnInit() {
        this.fcategorias();
    }

    fcategorias() {
        this.categoriaService.obtenerCategorias().subscribe( dato =>{
            this.categorias.set(dato.content);
        })

        this.exportColumns = this.cols.map((col) => ({ title: col.header, dataKey: col.field }));
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    abridModal() {
        this.accion = "Añadir"
        this.submitted = false;
        this.categoriaDialog = true;
    }

    editCategoria(categoria: Categoria) {
        this.categoria = { ...categoria };
        this.categoriaDialog = true;
    }

    hideDialog() {
        this.categoriaDialog = false;
        this.submitted = false;
        this.formulario.reset();
    }

    eliminarCategoria(categoria: Categoria) {
        console.log(categoria);

        this.confirmationService.confirm({
            message: 'Esta seguro de eliminar ' + categoria.descripcion + '?',
            header: 'Confirmacion',
            icon: 'pi pi-exclamation-triangle',
            acceptButtonProps: {
                label: 'Eliminar',
                severity: 'danger',
            },
            accept: () => {
                this.categoriaService.eliminarCategoria(categoria.id).subscribe( dato=>{
                    this.fcategorias();
                })
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Categoria Deleted',
                    life: 3000
                });
            }
        });
    }

    guardar() {
        this.submitted = true;
        if(this.accion == "Actualizar"){
            this.categoria.descripcion = this.formulario.value.descripcion;
            this.categoriaService.editarCategoria(this.categoria).subscribe(dato=>{
                this.fcategorias();
            })
        } else{
            this.categoria = new Categoria;

            this.categoria.descripcion = this.formulario.value.descripcion;

            this.categoriaService.guardarCategoria(this.categoria).subscribe( dato =>{
                this.fcategorias();
            })
        }

        this.messageService.add({ severity: 'success', summary: 'Correcto', detail: 'Guardado exitoso', life: 2000 });
        this.categoriaDialog = false;
        this.formulario.reset();
    }

    actualizar(categoria: Categoria){
        this.accion = "Actualizar";
        this.submitted = false;
        this.categoriaDialog = true;
        this.categoria = categoria;
        this.formulario.get('descripcion')?.setValue(categoria.descripcion);

    }
}
