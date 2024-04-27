import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BarController, BarElement, CategoryScale, Chart, LinearScale } from 'chart.js';
import { StatisticDataService } from 'src/app/shared/service/statistic-data.service';

@Component({
  selector: 'app-patient-chart',
  templateUrl: './patient-chart.component.html',
  styleUrls: ['./patient-chart.component.css']
})
export class PatientChartComponent implements OnInit{

  form!: FormGroup;
  year!: number;
  chart!: Chart;

  constructor(private http: StatisticDataService, private fb: FormBuilder)
  {

  }

  data: number[] = [];
  names: string[] = [];

  ngOnInit(): void {

    this.form = this.fb.group({
      year:[this.year]
    });

    Chart.register(LinearScale);
    Chart.register(BarController);
    Chart.register(CategoryScale);
    Chart.register(BarElement);

    this.http.getStatByYear(2024).subscribe({
      next: (result) => {
        this.data = result.map(x => x.count);
        this.names = result.map(x => x.name);
        console.log(this.names);

        this.chart = new Chart('myChart', {
          type: 'bar',
          data: {
            labels: this.names,
            datasets: [{
              label: 'Condiotion count per year',
              data: this.data,
              borderWidth: 1
            }]
          },
          options: {
            scales: {
              y: {
                beginAtZero: true
              }
            },
            borderColor: 'Purple',
            color: 'Purple'
          }
        });
      }
  }); 

  }

  sendYear()
  {

    this.chart.destroy();

    this.http.getStatByYear(this.form.value.year as number).subscribe({
      next: (result) => {
        this.data = result.map(x => x.count);
        this.names = result.map(x => x.name);
        console.log(this.names);

        this.chart = new Chart('myChart', {
          type: 'bar',
          data: {
            labels: this.names,
            datasets: [{
              label: 'Condiotion count per year',
              data: this.data,
              borderWidth: 1
            }]
          },
          options: {
            scales: {
              y: {
                beginAtZero: true
              }
            },
            borderColor: 'Purple',
            color: 'Purple'
          }
        });
      }
  }); 
  }
}
