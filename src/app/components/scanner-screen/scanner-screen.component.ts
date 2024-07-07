import { Component, OnInit } from '@angular/core';
import { ScannerQRCodeConfig, ScannerQRCodeResult } from 'ngx-scanner-qrcode';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-scanner-screen',
  templateUrl: './scanner-screen.component.html',
  styleUrls: ['./scanner-screen.component.scss']
})
export class ScannerScreenComponent implements OnInit {
  scanElementArr:any = [];
  public config: ScannerQRCodeConfig = {
    constraints: {
      video: {
        width: window.innerWidth,
      },
    }
  };

  constructor() { }

  ngOnInit(): void {

  }

  public onEvent(e: ScannerQRCodeResult[], action?: any): void {
    // e && action && action.pause();
    if(!this.scanElementArr.includes(e[0].value)){
      this.scanElementArr.push(e[0].value);
    }
    // console.log(this.scanElementArr);

  }

  public handle(action: any, fn: string): void {
    const playDeviceFacingBack = (devices: any[]) => {
      // front camera or back camera check here!
      const device = devices.find(f => (/back|rear|environment/gi.test(f.label))); // Default Back Facing Camera
      action.playDevice(device ? device.deviceId : devices[0].deviceId);
    }

    if (fn === 'start') {
      action[fn](playDeviceFacingBack).subscribe((r: any) => console.log(fn, r), alert);
    } else {
      action[fn]().subscribe((r: any) => console.log(fn, r), alert);
    }
  }

  clearSession(){
    this.scanElementArr = [];
  }

  onDownloadClick() {
    const jsonData = this.convertArrayToJson(this.scanElementArr);

    const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const EXCEL_EXTENSION = '.xlsx';

    //create worksheet
    const worksheet = XLSX.utils.json_to_sheet(jsonData);
    const workbooks = {
      Sheets: {
        'testingSheets': worksheet
      },
      SheetNames: ['testingSheets']
    }
    const exelBuffer = XLSX.write(workbooks, { bookType: 'xlsx', type: 'array' });

    const blobData = new Blob([exelBuffer], { type: EXCEL_TYPE });
    
    //download logic
    let d = new Date();
    let formattedDate = d.getDate()  + "-" + (d.getMonth()+1) + "-" + d.getFullYear() + " " +
    d.getHours() + ":" + d.getMinutes();
    const fileName = 'Preetam_products_' + formattedDate 
    const link = document.createElement('a');
    link.setAttribute('href', URL.createObjectURL(blobData));
    link.setAttribute('download', fileName);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);


  }

  convertArrayToJson(arr:any){
    let JsonData:any = [];
    arr.forEach((ele:any) => {
      let obj = {
        sku:ele
      }
      JsonData.push(obj);
    });

    return JsonData;

  }


}
