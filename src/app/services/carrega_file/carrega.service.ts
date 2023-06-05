import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Papa } from 'ngx-papaparse';

@Injectable({
  providedIn: 'root'
})
export class CarregaService {

  constructor(private http: HttpClient, private papa: Papa) { }

  getFileContent(fileUrl: string): Promise<string> {
    return this.http.get(fileUrl, { responseType: 'text' })
      .toPromise()
      .then(response => response || '');
  }

  processData(fileContent: string): any[] {
    const parsedData = this.papa.parse(fileContent, { header: true }).data;
    const result = [];
    const seen = new Set();
    for (const row of parsedData) {
      const {
        'Process': Process,
        'Container Id': Container,
        ' Channel': Channel,
        'Old Supplier Number': oldSupplierNumber,
        'Clearance Place': ClearancePlace,
        'Step': Step,
        'Transp. Type':Transport,
        'Invoice Number': Invoice,
        'SLine':Liner,
        'ATA':ATA
        // Continuar com os ajustes para as demais propriedades
      } = row;

      if (!Container || Container.trim().length === 0 || Transport != 10 || ATA === '') {
        continue; // pula linhas vazias e com Supplier Number vazio
      }

      const key = `${Container},${Process}`;
      if (!seen.has(key)) {
        seen.add(key);
        result.push({
          Process,
          Container,
          Channel,
          ClearancePlace,
          Step,
          Transport,
          Invoice,
          Liner,
          ATA
          // Continuar com as demais propriedades que deseja extrair
        });
      }
    }

    return result;
  }

  async loadFile(fileUrl: string): Promise<any[]> {
    const fileContent = await this.getFileContent(fileUrl);
    const data = this.processData(fileContent);
    return data;
  }
}
