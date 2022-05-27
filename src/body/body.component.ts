import { Component, OnInit } from "@angular/core";



@Component({
  selector: "app-body",
  templateUrl: "./body.component.html",
  styleUrls: ["./body.component.scss"]
})

export class BodyComponent implements OnInit {
  firstCurrency: string = 'USD';
  secondCurrency: string = 'UAH';
  currentRate: number;
  firstInputValue: any;
  secondInputValue: any;
  
  ngOnInit() {
    this.getCurrencies()
  }

  selectFirstCurr(event: any) {
    this.firstCurrency = event.target.value
    this.getCurrencies()
  }

  selectSecondCurr(event: any) {
    this.secondCurrency = event.target.value
    this.getCurrencies()
  }


  async getCurrencies() {
    const url: string = `https://api.exchangerate.host/convert?from=${this.firstCurrency}&to=${this.secondCurrency}`;
    const headers = {"content-type": "application/json"};

    const options = {
      "headers" : headers,
      "method" : "GET",
    };

    const response = await fetch(url, options);
    const result = await response.json()
    this.currentRate = result.info.rate
  }

  countCurrency(value: number) {
    const result: number = value * this.currentRate;
    this.secondInputValue = Math.round(result * 100) / 100;
  }

  reverseCount(value: number) {
    const result: number =  value / this.currentRate;
    this.firstInputValue = Math.round(result * 100) / 100;
  }

  firstInput() {
    if(isNaN(this.firstInputValue)) {
      this.secondInputValue = 'Пожалуйста, введите число'
    } else {
      this.countCurrency(this.firstInputValue)
    }
    
  }

  secondInput() {
    if(isNaN(this.secondInputValue)) {
      this.firstInputValue = 'Пожалуйста, введите число'
    } else {
      this.reverseCount(this.secondInputValue)
    }
  }
}

