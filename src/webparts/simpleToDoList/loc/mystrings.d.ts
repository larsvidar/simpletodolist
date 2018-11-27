declare interface ISimpleToDoListWebPartStrings {
  PropertyPaneNumberOfItems: number;
  BasicGroupName: string;
  NumberOfItemsLabel: string;
}

declare module 'SimpleToDoListWebPartStrings' {
  const strings: ISimpleToDoListWebPartStrings;
  export = strings;
}
