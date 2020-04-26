import { Component, OnInit } from '@angular/core';
import { HttpsupportService } from 'src/app/shared/httpsupport.service';
import { environment } from 'src/environments/environment';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-covid19-graph',
  templateUrl: './covid19-graph.component.html',
  styleUrls: ['./covid19-graph.component.scss']
})
export class Covid19GraphComponent implements OnInit {
  countries = []
  dates = []
  reportFormGroup = new FormGroup({
    country: new FormControl(''),
    date: new FormControl('')
  })
  confirmedCases = [];
  deathCases = [];
  totalConfirmed: number = 0;
  totalDeath: number = 0
  constructor(private httpClient: HttpsupportService, private spinner: NgxSpinnerService) {
    this.addDates();
    this.getCountries();
    this.reportFormGroup.patchValue({
      country: "All",
      date: "Latest"
    });
    this.getData();
  }
  barChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      xAxes: [{
        ticks: {
          steps: 10
        }
      }], yAxes: [{
        id: 'y-axis-0',
        position: 'left',
        scaleLabel: {
          display: true,
          labelString: 'Death Cases'
        }
      },
      {
        id: 'y-axis-1',
        position: 'right',
        scaleLabel: {
          display: true,
          labelString: 'Confirmed Cases'
        }
      }]
    },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  barChartLabels = [];
  barChartType = 'bar';
  barChartLegend = true;

  barChartData = [
    { data: [], label: 'Death Cases', yAxisID: 'y-axis-0' },
    { data: [], label: 'Confirmed Cases', yAxisID: 'y-axis-1', type: 'line' },
  ];

  getData = () => {
    try {


      this.spinner.show();
      this.totalConfirmed = 0
      let payload = {
        date: this.reportFormGroup.value.date == 'Latest' ? moment().format('M/D/YY') : moment(this.reportFormGroup.value.date).format('M/D/YY'),
        country: this.reportFormGroup.value.country
      }
      this.httpClient.putData(environment.confirmedCases, payload).subscribe((res: any) => {
        this.confirmedCases = res.data;
        this.barChartData[1].data = Object.values(this.confirmedCases);
        this.totalConfirmed = this.confirmedCases[Object.keys(this.confirmedCases)[Object.keys(this.confirmedCases).length - 1]]
      });
      this.httpClient.putData(environment.deathCases, payload).subscribe((res: any) => {
        this.deathCases = res.data;
        let temDates = Object.keys(this.deathCases);
        temDates = temDates.map(ele => {
          return moment(ele).format('MMM D')
        })
        this.barChartLabels = temDates;
        this.barChartData[0].data = Object.values(this.deathCases);
        this.totalDeath = this.deathCases[Object.keys(this.deathCases)[Object.keys(this.deathCases).length - 1]]
        this.spinner.hide();
      });
    } catch (error) {
      alert('Something went wrong' + error)
    }
  }

  ngOnInit() {
  }

  addDates = () => {
    let startDate = 'Jan 22,2020';
    let date,
      i = 1;
    do {
      date = moment().subtract(i, "days").format('MMM DD,YYYY');
      i++;
      this.dates.push(date);
    } while (date != startDate);
  }

  getCountries = () => {
    this.httpClient.getData(environment.Countries).subscribe((res: any) => {
      this.countries = res.data;
    })
  }

}
