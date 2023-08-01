import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  options = ['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5'];
  dropdowns: Dropdown[] = [];
  optionarray = [];

  onAdd() {
    const selectedOptionsSet = new Set(
      this.dropdowns.map((dropdown) => dropdown.selectedOptions)
    );

    this.optionarray = this.options.filter(
      (optioned) => !selectedOptionsSet.has(optioned)
    );
    console.log(this.optionarray);
    const dropdown = new Dropdown(this.optionarray);
    this.dropdowns.push(dropdown);
  }

  onSelect(option: any, dropdown: Dropdown) {
    console.log(option, this.dropdowns);

    console.log('he');
    dropdown.selectedOptions = option;

    const selectedOptionsSet = new Set(
      this.dropdowns.map((dropdown) => dropdown.selectedOptions)
    );

    this.optionarray = this.options.filter(
      (optioned) => !selectedOptionsSet.has(optioned)
    );
    // this.optionarray=options.filter((element) => !array2.includes(element));

    this.updateAvailableOptions(dropdown, option);
  }

  updateAvailableOptions(currentDropdown?: Dropdown, myoption: any) {
    console.log('hey');
    this.dropdowns.forEach((dropdown) => {
      if (dropdown !== currentDropdown) {
        dropdown.availableOptions = this.optionarray.filter(
          (option) => !this.dropdowns.flatMap((d) => myoption).includes(option)
        );
        if (dropdown.selectedOptions != '') {
          dropdown.availableOptions.push(dropdown.selectedOptions);
        }
        console.log(dropdown);
      }
    });
  }
}

class Dropdown {
  selectedOptions: string[] = [];
  availableOptions: string[] = [];

  constructor(public options: string[]) {
    this.availableOptions = this.options.slice();
  }
}
