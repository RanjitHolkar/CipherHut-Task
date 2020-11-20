import { Component, OnInit } from '@angular/core';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnInit {
public spinner = false;
item ={
  borderColor:'blue',
  message:'Loading'
}
  constructor(private sharedService:SharedService) {
    this.sharedService.spinner.subscribe((res:any) =>{
        this.spinner = res.status;
        if(res.borderColor && res.message) {
          this.item.borderColor = res.borderColor;
          this.item.message = res.message;
        }
    })
  }

  ngOnInit(): void {

  }

}
