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
