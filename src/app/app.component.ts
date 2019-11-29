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

  public chartData  = [];
  public timePeriods = [];
  public chartType =  ["bar", "line", "stack"];
  public charLegend: boolean = true;
  public numServices: number = 0;
  public barChartOptions:any = {
    scales: {
      xAxes: [{
        stacked: true,
        type: "time",
        ticks: {
          autoSkip: true,
        maxTicksLimit: 10
        }
        
      }],
      yAxes: [{
        stacked: true
      }]
    },
    responsive: true,
    maintainAspectRatio: true,
    legend: {position: 'bottom'}
  };

  public cost : any;

  public typeSelection = [
    {id: 1, name: "Bar"},
    {id: 2, name: "Stack"},
    {id: 3, name: "Line"}
  ];

  constructor(private rest_get_usage: RestapiService,
              private extract_json: ExtractJsonService) {}
  
  ngOnInit() {    
    this.extracted_json_data();
  }
  
  public extracted_json_data() {
    this.rest_get_usage.getCostUsage().subscribe(
      (response) => {
        this.cost = response;
        this.jsonObject = JSON.stringify(this.cost);
        this.jsonObject = JSON.parse(this.jsonObject);
        console.log(this.jsonObject);
        this.extract_json.extract_json_data(this.jsonObject);
        this.chartData = this.extract_json.chartData;
        this.timePeriods = this.extract_json.timePeriods;
        this.numServices = this.extract_json.servicesName.length;
        console.log(this.numServices);
      },
      (error) => {
        console.log("No responsed data " + error);
        return;
      }
    )
    

  }

}
