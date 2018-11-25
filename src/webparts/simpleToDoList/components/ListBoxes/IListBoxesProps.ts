export default interface IListBoxes {
    updateBoxes: Function;
    listBoxes: Array<any>;
    createNewList: Function;
    openList: Function;
    showDeleteConfirmation: Function;
    closeDeleteConfirmation: Function;
    isDeleteConfirmation: any;
    loadingIndicator: Function;
}