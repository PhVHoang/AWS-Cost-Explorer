import { Component, OnInit } from '@angular/core';
import { RestapiService } from './rest_service/restapi.service';
import { ExtractJsonService } from './extract_json/extract-json.service';
 
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'AWS Cost Explorer';
  public jsonObject : any;

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  public cost : any;

  constructor(private rest_get_usage: RestapiService) {}
  
  ngOnInit() {
    this.get_json_object();
  }
  
  public get_json_object() {
    this.rest_get_usage.getCostUsage().subscribe(
      (response) => {
        this.cost = response;
        this.jsonObject = JSON.stringify(this.cost);
        this.jsonObject = JSON.parse(this.jsonObject);
        console.log(this.jsonObject);
      },
      (error) => {
        console.log("No responsed data " + error);
      }
    )
  }

}
