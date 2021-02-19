import * as React from 'react';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { Query } from '@syncfusion/ej2-data';
import { SampleBase } from '../common/sample-base';
// import './filtering.css';
import * as data from './dataSource.json';
export class Filtering extends SampleBase {
  constructor() {
    // eslint-disable-next-line prefer-rest-params
    super(...arguments);
    // define the filtering data
    this.temp = 'countries';
    this.searchData = data[this.temp];
    // maps the appropriate column to fields property
    this.fields = { text: 'Name', value: 'Code' };
    // filtering event handler to filter a Country
    this.onFiltering = (e) => {
      let query = new Query();
      // frame the query based on search string with filter type.
      query = e.text !== '' ? query.where('Name', 'startswith', e.text, true) : query;
      // pass the filter data source, filter query to updateData method.
      e.updateData(this.searchData, query);
    };
  }
  render() {
    return (
      <div className="control-pane">
        <div className="control-section">
          <div id="filtering">
            <DropDownListComponent
              id="country"
              ref={(dropdownlist) => {
                this.listObj = dropdownlist;
              }}
              dataSource={this.searchData}
              filtering={this.onFiltering.bind(this)}
              filterBarPlaceholder="Search a country"
              allowFiltering={true}
              fields={this.fields}
              placeholder="Select a country"
              popupHeight="220px"
            />
          </div>
        </div>
      </div>
    );
  }
}
