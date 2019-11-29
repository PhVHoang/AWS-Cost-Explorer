import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExtractJsonService {

  // Is it good setting jsonObject as any type?
  public jsonObject : any; 
  public chartLabels = [];
  public chartData  = [];
  public stackedChartData = [];
  public servicesName  = [];
  public timePeriods = [];

  constructor(jsonObject : any) { 
    this.jsonObject = jsonObject;
  }

  public extract_json_data() {
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
        // Metric type is set default as UnblendedCost
        if (typeof(allTimeCode[j].Groups[i]) != 'undefined') {
          valueForEachService.push(parseFloat(allTimeCode[j].Groups[i].Metrics.UnblendedCost.Amount));
        }
      }
      dataForEachService['data'] = valueForEachService;
      this.chartData.push(dataForEachService);
    }

    // handle missing data in chartData

    for (let i = 0; i < this.chartData.length; i ++) {
      if (this.chartData[i].data.length < 30) {
        while (this.chartData[i].data.length < 30) {
          this.chartData[i].data.push(0);
        }
      }
    }
  }


}
