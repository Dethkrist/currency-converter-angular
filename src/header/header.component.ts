import { Component, OnInit } from "@angular/core"


@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit {
  firstRate: number;
  secondRate: number;
  currentDate: Date = new Date()
  
  ngOnInit() {
    this.getCourse();
}

  roundValue(value: number) {
    return Math.round(value * 100) / 100
  }

  getCourse() {
    this.getFirstRate()
    this.getSecondRate()
  }

  async getFirstRate() {
    const url: string = 'https://api.exchangerate.host/convert?from=USD&to=UAH';
    const headers = {"content-type": "application/json"};

    const options = {
      "headers" : headers,
      "method" : "GET",
    };

    const response = await fetch(url, options);
    const result = await response.json()
    this.firstRate = result.info.rate
  }
  
  async getSecondRate() {
    const url: string = 'https://api.exchangerate.host/convert?from=EUR&to=UAH';
    const headers = {"content-type": "application/json"};

    const options = {
      "headers" : headers,
      "method" : "GET",
    };

    const response = await fetch(url, options);
    const result = await response.json()
    this.secondRate = result.info.rate
  }
  }
