import { Component, OnInit } from '@angular/core';
import { ScannerQRCodeConfig, ScannerQRCodeResult } from 'ngx-scanner-qrcode';
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
    console.log(this.scanElementArr);

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



}
