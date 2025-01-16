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
import { FormsModule } from '@angular/forms';
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
    ConfirmDialogModule
  ],
  templateUrl: './categorias.component.html',
  providers:[MessageService, ConfirmationService]
})
export class CategoriasComponent implements OnInit{
    categoriaDialog: boolean = false;

    categorias = signal<Categoria[]>([]);

    categoria!: Categoria;

    selectedCategorias!: Categoria[] | null;

    submitted: boolean = false;

    statuses!: any[];

    @ViewChild('dt') dt!: Table;

    exportColumns!: ExportColumn[];

    cols!: Column[];

    constructor(
        private categoriaService: CategoriaService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService
    ) {}

    exportCSV() {
        this.dt.exportCSV();
    }

    ngOnInit() {
        this.loadDemoData();
    }

    loadDemoData() {
        this.categoriaService.obtenerCategorias().subscribe( dato =>{
            console.log(dato.content);
            this.categorias = dato.content;
            console.log(this.categorias);

        })

        this.statuses = [
            { label: 'INSTOCK', value: 'instock' },
            { label: 'LOWSTOCK', value: 'lowstock' },
            { label: 'OUTOFSTOCK', value: 'outofstock' }
        ];

        this.cols = [
            { field: 'code', header: 'Code', customExportHeader: 'Categoria Code' },
            { field: 'name', header: 'Name' },
            { field: 'image', header: 'Image' },
            { field: 'price', header: 'Price' },
            { field: 'category', header: 'Category' }
        ];

        this.exportColumns = this.cols.map((col) => ({ title: col.header, dataKey: col.field }));
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    openNew() {
        this.submitted = false;
        this.categoriaDialog = true;
    }

    editCategoria(categoria: Categoria) {
        this.categoria = { ...categoria };
        this.categoriaDialog = true;
    }

    deleteSelectedCategorias() {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete the selected categorias?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.categorias.set(this.categorias().filter((val) => !this.selectedCategorias?.includes(val)));
                this.selectedCategorias = null;
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Categorias Deleted',
                    life: 3000
                });
            }
        });
    }

    hideDialog() {
        this.categoriaDialog = false;
        this.submitted = false;
    }

    deleteCategoria(categoria: Categoria) {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete ' + categoria.descripcion + '?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.categorias.set(this.categorias().filter((val) => val.id !== categoria.id));
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Categoria Deleted',
                    life: 3000
                });
            }
        });
    }

/*     findIndexById(id: string): number {
        let index = -1;
        for (let i = 0; i < this.categorias().length; i++) {
            if (this.categorias()[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    } */

    createId(): string {
        let id = '';
        var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (var i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }

    getSeverity(status: string) {
        switch (status) {
            case 'INSTOCK':
                return 'success';
            case 'LOWSTOCK':
                return 'warn';
            case 'OUTOFSTOCK':
                return 'danger';
            default:
                return 'info';
        }
    }

/*     saveCategoria() {
        this.submitted = true;
        let _categorias = this.categorias();
        if (this.categoria.name?.trim()) {
            if (this.categoria.id) {
                _categorias[this.findIndexById(this.categoria.id)] = this.categoria;
                this.categorias.set([..._categorias]);
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Categoria Updated',
                    life: 3000
                });
            } else {
                this.categoria.id = this.createId();
                this.categoria.image = 'categoria-placeholder.svg';
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Categoria Created',
                    life: 3000
                });
                this.categorias.set([..._categorias, this.categoria]);
            }

            this.categoriaDialog = false;
            this.categoria = {};
        }
    } */
}
