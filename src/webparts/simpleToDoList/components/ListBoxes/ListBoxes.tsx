import * as React from 'react';
import IListBoxesProps from './IListBoxesProps';
import styles from './ListBoxes.module.scss';

import DeleteConfirmation from '../sitecomponents/DeleteConfirmation';

export default class ListBoxes extends React.Component<IListBoxesProps, {}> {

    /*** Class Constructor ***/
    constructor(props) {
        super(props);

        this.makingNewList = this.makingNewList.bind(this);
        this.handleCreateList = this.handleCreateList.bind(this);
    }

    /*** Component state ***/
    public state = {
        isCreatingNewList: false,
        listName: "",
        listDescription: "",
        showDeleteConfirmation: false,
    };

    /********** Render Method **********/
    public render(): React.ReactElement<IListBoxesProps> {
        return (
            <div>
                <button onClick={this.makingNewList}>New list</button>
                
                <div className={styles.listboxes}>
                    {this.props.listBoxes.map((item) => {
                        return (
                            <div className={styles.box} onClick={() => {this.handleOpenList(item[1], item[2]);}} key={item[1]}>
                                <div>
                                    <p className={styles.deletebutton} onClick={(event) => this.props.showDeleteConfirmation(event, item[1])}>X</p>
                                    <h1 className={styles.title}>{item[2]}</h1>
                                    <p className={styles.description}>{item[3]}</p>
                                </div>
                            </div>
                        );
                    })}

                    { // Shows this create-list dialog if create list-button is clicked
                        this.state.isCreatingNewList &&          
                        <div className={styles.box}>
                            <form>
                                <input type="text" name="listName" value={this.state.listName} placeholder="List name..." onChange={(e) => this.handleInput(e)}></input>
                                <input type="text" name="listDescription" value={this.state.listDescription} placeholder="List description..."onChange={(e) => this.handleInput(e)}></input>
                                <button type="button" onClick={this.handleCreateList}>Make list!</button>
                            </form>
                        </div>
                    }

                </div>
            </div>
        );
    }

    /**
     * Runs when component has been mounted
     */
    public componentDidMount(): void {
        this.props.updateBoxes();
    }

    /**
     * Method for opening the clicked list-box.
     * @param id Thi UUID of the clicked list.
     */
    private handleOpenList(id, title): void {
        this.props.openList(id, title);
    }

    /**
     * Method for opening a create list dialog box.
     */
    private makingNewList(): void {
        this.setState({isCreatingNewList: true});
    }

    /**
     * Method for creating a new list.
     */
    private handleCreateList(): void {
        //Making sure the create list dialog box isn't displayed any more.
        this.setState({isCreatingNewList: false});
        this.props.createNewList(this.state.listName, this.state.listDescription);
        //Resetting the content of the input fields.
        this.setState({
            listName: "",
            listDescription: "",
        });
    }

    /**
     * Method for handeling input fields.
     * @param event object.
     */
    private handleInput(event): void {
        this.setState({[event.target.name]: event.target.value});
    }
}
