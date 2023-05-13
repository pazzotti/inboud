import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CarregaService {

  constructor(private http: HttpClient) { }

  getFileContent(fileUrl: string): Promise<string> {
    return this.http.get(fileUrl, { responseType: 'text' })
      .toPromise()
      .then(response => response || '');
  }

  processData(fileContent: string): any[] {
    const lines = fileContent.split('\n');
    const result = [];
    const seen = new Set();
    for (const line of lines) {
      const [arg17, arg18, arg19,,,,Processo,,,,Transport,,Canal,,,,Status,Container] = line.split('|');
      if (line.trim().length === 0 || Container.trim().length === 0 || Container === " Container ") {
        continue; // pula linhas vazias e com Container vazio
      }
      const key = `${Container},${arg18}`;
      if (!seen.has(key)) {
        seen.add(key);
        result.push({ Processo, Container, Status, Transport, Canal });
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
