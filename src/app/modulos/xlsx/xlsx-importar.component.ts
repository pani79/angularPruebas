import { Component } from '@angular/core';
import { XlsxServiceService } from './xlsx-service.service';
import { Transaction } from 'src/app/modelos/transaction';

@Component({
  selector: 'xlsx-importar',
  templateUrl: './xlsx-importar.component.html',
  styleUrls: ['./xlsx-importar.component.css']
})
export class XlsxImportarComponent {

  
  public importedData:Array<any> = [];
  public imported:Array<any> = [];

  constructor(private _csvService: XlsxServiceService) { }

  onFileChange(event: any) {

    try {
      const file = event.target.files[0];
      if (!file) {
        console.error('No file selected');
        return;
      }
      /* 
      if (!file.name.endsWith('.xlsx') && !file.name.endsWith('.xls')) {
        console.error('Only Excel files are supported');
        return;
      } 
      */
  
      const reader = new FileReader();
      reader.onload = (e: any) => {
        

        try {
          
          console.log('Excel data:', e); 
          let csv: string = reader.result as string;
          console.log(csv);
          /* 
          const workbook = XLSX.read(e.target.result, { type: 'binary' });
          const firstSheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[firstSheetName];
          this.excelData = XLSX.utils.sheet_to_json(worksheet, { raw: true });
          console.log('Excel data:', this.excelData); 
          */
        } catch (error) {
          console.error('Error parsing Excel file:', error);
        }
      };
  
      reader.onerror = (error) => {
        console.error('Error reading file:', error);
      };
  
      reader.readAsArrayBuffer(file);
    } catch (error) {
      console.error('Error handling file change event:', error);
    }
  }

  public async importDataFromCSVByType(event: any) {
    let fileContent = await this.getTextFromFile(event);
    console.log('fileContent:' + fileContent);
    this.importedData = this._csvService.importDataFromCSVByType(
      fileContent,
      new Transaction()
    );
    console.log(this.importedData[127]);
    console.log(this.importedData[128]);
    console.log(this.importedData[129]);
    this.importedData.forEach((item) => {
      if (item.record_id !== undefined) {
        this.imported.push(item);
      }
    })
  }

  private async getTextFromFile(event:any){
    const file: File = event.target.files[0];
    let fileContent = await file.text();

    return fileContent;
  }

  /* 
  public changeListener(files: FileList){
    console.log(files);
    if(files && files.length > 0) {
       let archi: File = files.item(0); 
         console.log(archi.name);
         console.log(archi.size);
         console.log(archi.type);
         let reader: FileReader = new FileReader();
         reader.readAsText(archi);
         reader.onload = (e) => {
            let csv: string = reader.result as string;
            console.log(csv);
         }
      }
  }
  */

}
