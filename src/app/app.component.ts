import { Component, OnInit } from '@angular/core';
import { RestapiService } from './restapi.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'AWS Cost Explorer';
  
  public timePeriods = []; // Labels
  public chartData = [];
  public stackedChartData = [];
  public servicesName = [];
  public chartType = 'bar';
  public chartLegend = true;
  public jsonObject : any;

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  public cost : any;

  constructor(private rest_get_usage: RestapiService) {}
  
  private extractJsonAttributes(jsonObject: any) {

  }

  ngOnInit() {
    this.rest_get_usage.getCostUsage().subscribe(
      (response) => {
        this.cost = response;
        this.jsonObject = JSON.stringify(this.cost);
        this.jsonObject = JSON.parse(this.jsonObject);
        let allTimeCode = this.jsonObject.ResultsByTime;
        let lengthOfPeriods = allTimeCode.length;
        let numberOfUsedServices = allTimeCode[0].Groups.length;

        for (let i = 0; i < numberOfUsedServices; i++) {
          this.servicesName.push(allTimeCode[0].Groups[i].Keys[0]);
        }

        for (let i = 0; i < lengthOfPeriods; i++) {
          this.timePeriods.push(allTimeCode[i].TimePeriod.Start);
        }

        for (let i = 0; i < numberOfUsedServices; i++) {
          let dataForEachService = {'data' : [], 'label' : this.servicesName[i]};
          let valueForEachService = [];
          for (let j = 0; j < lengthOfPeriods; j++) {
            // metric types harcode, need to fix this later
            if (typeof(allTimeCode[j].Groups[i]) != 'undefined') {
              valueForEachService.push(parseFloat(allTimeCode[j].Groups[i].Metrics.UnblendedCost.Amount));
            }
          }
          dataForEachService['data'] = valueForEachService;
          this.chartData.push(dataForEachService);
        }
        // handle for missing data in chartData

        for (let i = 0; i < this.chartData.length; i ++) {
          if (this.chartData[i].data.length < 30) {
            while (this.chartData[i].data.length < 30) {
              this.chartData[i].data.push(0);
            }
          }
        }

        // stacked chart

        // TODO

        // for (let i = 0; i < lengthOfPeriods; i++) {
        //   let dataForEachService = {'data' : [], 'label' : null, 'stack' : 'a'};
        //   let valueForEachService = [];
        //   for (let j = 0; j < lengthOfPeriods; j++) {
        //     // metric types harcode, need to fix this later
        //     if (typeof(allTimeCode[j].Groups[i]) != 'undefined') {
        //       valueForEachService.push(parseFloat(allTimeCode[j].Groups[i].Metrics.UnblendedCost.Amount));
        //     }
        //   }
        //   dataForEachService['data'] = valueForEachService;
        //   this.chartData.push(dataForEachService);
        // }
        // // handle for missing data in chartData

        // for (let i = 0; i < this.chartData.length; i ++) {
        //   if (this.chartData[i].data.length < 30) {
        //     while (this.chartData[i].data.length < 30) {
        //       this.chartData[i].data.push(0);
        //     }
        //   }
        // }

        console.log(this.chartData);
      },
      (error) => {
        console.log("No responsed data " + error);
      }
    )

    this.extractJsonAttributes(this.jsonObject);

  }
}
