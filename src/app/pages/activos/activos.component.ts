import { CategoriaService } from './../../services/categoria.service';
import { Activo } from './../../models/Activo';
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
import { ActivoService } from '../../services/activo.service';
import { Categoria } from '../../models/Categoria';

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
  selector: 'app-activos',
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
  templateUrl: './activos.component.html',
  providers:[MessageService, ActivoService, ConfirmationService]
})
export class ActivosComponent implements OnInit{
    activoDialog: boolean = false;

    activos = signal<Activo[]>([]);
    categorias: Categoria[] =[];


    totalRegistros: number = 0;

    activo!: Activo;

    selectedActivos!: Activo[] | null;

    submitted: boolean = false;

    statuses!: any[];

    @ViewChild('dt') dt!: Table;

    formulario: FormGroup;

    accion: string= "";

    exportColumns!: ExportColumn[];

    cols!: Column[];

    constructor(
        private activoService: ActivoService,
        private categoriaService: CategoriaService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService
    ) {
        this.formulario = new FormGroup({
            descripcion: new FormControl('',[Validators.required]),
            codigoInventario: new FormControl('',[Validators.required]),
            nombre: new FormControl('',[Validators.required]),
            categoria: new FormControl('',[Validators.required]),
            marca: new FormControl('',[Validators.required]),
            modelo: new FormControl('',[Validators.required]),
            serie: new FormControl('',[Validators.required]),
            estadoAsignacion: new FormControl('',[Validators.required]),
        });
    }

    exportCSV() {
        this.dt.exportCSV();
    }

    ngOnInit() {
        this.fcategorias();
        this.factivos();
    }

    fcategorias(){
        this.categoriaService.obtenerCategorias().subscribe( dato =>{
            this.categorias = dato.content;
        })
    }

    factivos() {
        this.activoService.obtenerActivos().subscribe( dato =>{
                this.activos.set(dato.content);
        })

        this.exportColumns = this.cols.map((col) => ({ title: col.header, dataKey: col.field }));
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    abridModal() {
        this.accion = "Añadir"
        this.submitted = false;
        this.activoDialog = true;
    }

    editActivo(activo: Activo) {
        this.activo = { ...activo };
        this.activoDialog = true;
    }

    hideDialog() {
        this.activoDialog = false;
        this.submitted = false;
        this.formulario.reset();
    }

    eliminarActivo(activo: Activo) {
        console.log(activo);

        this.confirmationService.confirm({
            message: 'Esta seguro de eliminar ' + activo.descripcion + '?',
            header: 'Confirmacion',
            icon: 'pi pi-exclamation-triangle',
            acceptButtonProps: {
                label: 'Eliminar',
                severity: 'danger',
            },
            accept: () => {
                this.activoService.eliminarActivo(activo.id).subscribe( dato=>{
                    this.factivos();
                })
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Activo Deleted',
                    life: 3000
                });
            }
        });
    }

    guardar() {
        console.log(this.formulario.value);

        this.submitted = true;
        if(this.accion == "Actualizar"){
            this.activo.descripcion = this.formulario.value.descripcion;
            this.activoService.editarActivo(this.activo).subscribe(dato=>{
                this.factivos();
            })
        } else{
            this.activo = new Activo;

            this.activo.codigoInventario = this.formulario.value.codigoInventario;
            this.activo.nombre = this.formulario.value.nombre;
            this.activo.idcategoria = this.formulario.value.categoria.id;
            this.activo.marca = this.formulario.value.marca;
            this.activo.modelo = this.formulario.value.modelo;
            this.activo.serie = this.formulario.value.serie;
            this.activo.descripcion = this.formulario.value.descripcion;
            this.activo.estadoAsignacion = this.formulario.value.estadoAsignacion;

            this.activoService.guardarActivo(this.activo).subscribe( dato =>{
                this.factivos();
            })
        }

        this.messageService.add({ severity: 'success', summary: 'Correcto', detail: 'Guardado exitoso', life: 2000 });
        this.activoDialog = false;
        this.formulario.reset();
    }

    actualizar(activo: Activo){
        this.accion = "Actualizar";
        this.submitted = false;
        this.activoDialog = true;
        this.activo = activo;
        this.formulario.get('descripcion')?.setValue(activo.descripcion);

    }
}
