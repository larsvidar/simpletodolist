export default interface IListProps {
    taskItems: Array<string>;
    drawList: Function;
    closeList: Function;
    listId: string;
    showDeleteConfirmation: Function;
    closeDeleteConfirmation: Function;
    isDeleteConfirmation: any;
    loadingIndicator: Function;
  }