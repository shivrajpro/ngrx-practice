import { Component, OnInit } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { jsPDF } from 'jspdf';
import domtoimage from 'dom-to-image';
import html2canvas from 'html2canvas';
@Component({
  selector: 'app-html-to-pdf',
  templateUrl: './html-to-pdf.component.html',
  styleUrls: ['./html-to-pdf.component.scss'],
})
export class HtmlToPdfComponent implements OnInit {
  // Doughnut
  public doughnutChartLabels: string[] = [
    'Download Sales',
    'In-Store Sales',
    'Mail-Order Sales',
  ];
  public doughnutChartDatasets: ChartConfiguration<'doughnut'>['data']['datasets'] =
    [{ data: [350, 450, 100], label: 'Series A' }];

  public doughnutChartOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: false,
  };
  constructor() {}

  ngOnInit(): void {}

  toPdf() {
    const dashboard = document.getElementById('donutChart');

    const dashboardHeight = dashboard.clientHeight;
    const dashboardWidth = dashboard.clientWidth;
    const options = {
      background: 'white',
      width: dashboardWidth,
      height: dashboardHeight,
    };

    domtoimage.toPng(dashboard, options).then((imgData) => {
      const doc = new jsPDF(
        dashboardWidth > dashboardHeight ? 'l' : 'p',
        'mm',
        [dashboardWidth, dashboardHeight]
      );
      const imgProps = doc.getImageProperties(imgData);
      const pdfWidth = doc.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      doc.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      doc.save('Dashboard for hyperpanels.pdf');
    });
  }

  convetToPDF()
  {
    var data = document.getElementById('donutChart');
    html2canvas(data).then(canvas => {
    // Few necessary setting options
    var imgWidth = 208;
    var pageHeight = 295;
    var imgHeight = canvas.height * imgWidth / canvas.width;
    var heightLeft = imgHeight;
     
    const contentDataURL = canvas.toDataURL('image/png')
    let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF
    var position = 0;
    pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
    pdf.save('new-file.pdf'); // Generated PDF
    });
  }  
}
