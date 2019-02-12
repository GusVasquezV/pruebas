import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';
import { PersonService } from 'src/app/services/person.service';
import { PersonInterface } from 'src/app/models/person-interface';
import * as XLSX from 'xlsx';



@Component({
  selector: 'app-inscritos',
  templateUrl: './inscritos.component.html',
  styleUrls: ['./inscritos.component.css']
})
export class InscritosComponent implements OnInit {

  displayedColumns: string[] = ['select', 'rut', 'name', 'email', 'age', 'university', 'faculty', 'created_at', 'career', 'current_year', 'profile', 'status', 'eve_name'];

  dataSource = new MatTableDataSource<PersonInterface>();

  selection = new SelectionModel<PersonInterface>(true, []);

  @ViewChild('TABLE') table: ElementRef;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  constructor(private personApi: PersonService) { }

  ngOnInit() {
    this.personApi.getAllInscription().subscribe(result => {
      this.dataSource.data = result
    });
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  deleteInscrito(relation_id:string){
    this.personApi.deleteInscription(relation_id).subscribe();
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  ExportTOExcel(){
    const ws: XLSX.WorkSheet=XLSX.utils.table_to_sheet(this.table.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    
    /* save to file */
    XLSX.writeFile(wb, 'SheetJS.xlsx');
    
  }

  

}
