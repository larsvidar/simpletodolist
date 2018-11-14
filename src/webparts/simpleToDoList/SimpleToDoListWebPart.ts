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

const { loadTheme, DefaultButton, PrimaryButton, Toggle, TooltipHost } = Fabric;

loadTheme({
  palette: {
    themePrimary: '#6eb9ff',
    themeLighterAlt: '#04070a',
    themeLighter: '#121e29',
    themeLight: '#21374d',
    themeTertiary: '#426f99',
    themeSecondary: '#60a3e0',
    themeDarkAlt: '#7cc0ff',
    themeDark: '#91caff',
    themeDarker: '#aed8ff',
    neutralLighterAlt: '#272743',
    neutralLighter: '#2d2d4b',
    neutralLight: '#373757',
    neutralQuaternaryAlt: '#3e3e5f',
    neutralQuaternary: '#434365',
    neutralTertiaryAlt: '#5c5c7f',
    neutralTertiary: '#c8c8c8',
    neutralSecondary: '#d0d0d0',
    neutralPrimaryAlt: '#dadada',
    neutralPrimary: '#ffffff',
    neutralDark: '#f4f4f4',
    black: '#f8f8f8',
    white: '#21213a',
  }
});

export interface ISimpleToDoListWebPartProps {
  description: string;
}

export default class SimpleToDoListWebPart extends BaseClientSideWebPart<ISimpleToDoListWebPartProps> {

  public render(): void {
    const element: React.ReactElement<ISimpleToDoListProps > = React.createElement(
      SimpleToDoList,
      {
        description: this.properties.description
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
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
