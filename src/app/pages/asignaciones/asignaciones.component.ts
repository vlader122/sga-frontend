import { ActivoService } from './../../services/activo.service';
import { CategoriaService } from '../../services/categoria.service';
import { Asignacion } from '../../models/Asignacion';
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
import { AsignacionService } from '../../services/asignacion.service';
import { DatePickerModule } from 'primeng/datepicker';
import { Persona } from '../../models/Persona';
import { PersonaService } from '../../services/persona.service';
import { Activo } from '../../models/Activo';

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
  selector: 'app-asignaciones',
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
    ReactiveFormsModule,
    DatePickerModule
  ],
  templateUrl: './asignaciones.component.html',
  providers:[MessageService, AsignacionService, ConfirmationService]
})
export class AsignacionesComponent implements OnInit{
    asignacionDialog: boolean = false;

    asignaciones = signal<Asignacion[]>([]);
    personas: Persona[] =[];
    activos: Activo[] =[];

    totalRegistros: number = 0;

    asignacion!: Asignacion;

    selectedAsignaciones!: Asignacion[] | null;

    submitted: boolean = false;

    statuses!: any[];

    @ViewChild('dt') dt!: Table;

    formulario: FormGroup;

    accion: string= "";

    exportColumns!: ExportColumn[];

    cols!: Column[];

    constructor(
        private asignacionService: AsignacionService,
        private personaService: PersonaService,
        private activoService: ActivoService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService
    ) {
        this.formulario = new FormGroup({
            fechaAsignacion: new FormControl('',[Validators.required]),
            idusuario: new FormControl('',[Validators.required]),
            idpersona: new FormControl('',[Validators.required]),
            observacion: new FormControl('',[Validators.required]),
            activo: new FormControl('',[Validators.required]),
        });
    }

    exportCSV() {
        this.dt.exportCSV();
    }

    ngOnInit() {
        this.fpersonas();
        this.fasignaciones();
    }

    factivos(){
        this.activoService.obtenerActivos().subscribe(dato =>{
            this.activos = dato.content;
        })
    }

    fpersonas(){
        this.personaService.obtenerPersonas().subscribe( dato =>{
            this.personas = dato.content.map((persona: { nombre: any; apellido: any; }) => ({
                ...persona,
                nombreCompleto: `${persona.nombre} ${persona.apellido}`
              }));
        })
    }

    fasignaciones() {
        this.asignacionService.obtenerAsignaciones().subscribe( dato =>{
                this.asignaciones.set(dato.content);
        })

        this.exportColumns = this.cols.map((col) => ({ title: col.header, dataKey: col.field }));
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    abridModal() {
        this.accion = "Añadir"
        this.submitted = false;
        this.asignacionDialog = true;
        this.factivos();
    }

    editAsignacion(asignacion: Asignacion) {
        this.asignacion = { ...asignacion };
        this.asignacionDialog = true;
    }

    hideDialog() {
        this.asignacionDialog = false;
        this.submitted = false;
        this.formulario.reset();
    }

    eliminarAsignacion(asignacion: Asignacion) {
        console.log(asignacion);

        this.confirmationService.confirm({
            message: 'Esta seguro de eliminar ' + asignacion.id + '?',
            header: 'Confirmacion',
            icon: 'pi pi-exclamation-triangle',
            acceptButtonProps: {
                label: 'Eliminar',
                severity: 'danger',
            },
            accept: () => {
                this.asignacionService.eliminarAsignacion(asignacion.id).subscribe( dato=>{
                    this.fasignaciones();
                })
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Asignacion Deleted',
                    life: 3000
                });
            }
        });
    }

    guardar() {
        this.submitted = true;
        if(this.accion == "Actualizar"){
            this.asignacion.fechaAsignacion = this.formulario.value.fechaAsignacion;
            this.asignacion.idusuario = this.formulario.value.idusuario;
            this.asignacion.idpersona = this.formulario.value.idpersona;
            this.asignacion.observacion = this.formulario.value.observacion;
            this.asignacionService.editarAsignacion(this.asignacion).subscribe(dato=>{
                this.fasignaciones();
            })
        } else{
            this.asignacion = new Asignacion;

            this.asignacion.fechaAsignacion = this.formulario.value.fechaAsignacion;
            this.asignacion.idusuario = this.formulario.value.idusuario;
            this.asignacion.idpersona = this.formulario.value.idpersona;
            this.asignacion.observacion = this.formulario.value.observacion;
            this.asignacionService.guardarAsignacion(this.asignacion).subscribe( dato =>{
                this.fasignaciones();
            })
        }

        this.messageService.add({ severity: 'success', summary: 'Correcto', detail: 'Guardado exitoso', life: 2000 });
        this.asignacionDialog = false;
        this.formulario.reset();
    }

    actualizar(asignacion: Asignacion){
        this.accion = "Actualizar";
        this.submitted = false;
        this.asignacionDialog = true;
        this.asignacion = asignacion;
    }

    agregar(){
        console.log(this.formulario.value.activo);
    }
}
