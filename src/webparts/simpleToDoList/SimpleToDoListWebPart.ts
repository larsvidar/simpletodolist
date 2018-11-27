import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'SimpleToDoListWebPartStrings';
import SimpleToDoList from './components/SimpleToDoList';
import { ISimpleToDoListProps } from './components/ISimpleToDoListProps';

export interface ISimpleToDoListWebPartProps {
  numberOfItems: number;
}

export default class SimpleToDoListWebPart extends BaseClientSideWebPart<ISimpleToDoListWebPartProps> {

  public render(): void {
    const element: React.ReactElement<ISimpleToDoListProps > = React.createElement(
      SimpleToDoList,
      {
        numberOfItems: this.properties.numberOfItems
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneNumberOfItems
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('numberOfItems', {
                  label: strings.NumberOfItemsLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
