import * as React from 'react';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import IListBoxesProps from './IListBoxesProps';
import styles from './ListBoxes.module.scss';

export default class ListBoxes extends React.Component<IListBoxesProps, {}> {

    /*** Class Constructor ***/
    constructor(props) {
        super(props);

        this.makingNewList = this.makingNewList.bind(this);
        this.handleCreateList = this.handleCreateList.bind(this);
        this.closeCreateList = this.closeCreateList.bind(this);
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
            <div className={styles.listboxes} >
                <Icon iconName="CirclePlus" className={styles.newlistbutton} title="Make new list" onClick={this.makingNewList} />
                
                <div className={styles.listbox} >
                    {this.props.listBoxes.map((item) => {
                        return (
                            <div className={styles.box} title={item[2]} onClick={() => this.handleOpenList(item[1], item[2])} key={item[1]} >
                                <div>
                                    <Icon iconName="Delete" className={styles.deletebutton} title="Delete this list!" onClick={(event) => this.props.showDeleteConfirmation(event, item[1])} />
                                    <h1 className={styles.title} >{item[2]}</h1>
                                    <p className={styles.description} >{item[3]}</p>
                                </div>
                            </div>
                        );
                    })}

                    { // Shows this create-list dialog if create list-button is clicked
                        this.state.isCreatingNewList &&          
                        <div className={styles.box}>
                            <form className={styles.newlistform}>
                                <Icon className={styles.cancelnewlist} iconName="ChromeClose" title="Cancel" onClick={this.closeCreateList} />
                                <input className={styles.newlistinputs} type="text" name="listName" value={this.state.listName} placeholder="List name..." onChange={(e) => this.handleInput(e)}></input>
                                <input className={styles.newlistinputs} type="text" name="listDescription" value={this.state.listDescription} placeholder="List description..."onChange={(e) => this.handleInput(e)}></input>
                                <button className={styles.newlistconfirm} type="button" onClick={this.handleCreateList}>Create list!</button>
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
        this.props.closeDeleteConfirmation(false);
        this.props.openList(id, title);
    }

    /**
     * Method for opening a create list dialog box.
     */
    private makingNewList(): void {
        this.props.closeDeleteConfirmation(false);
        this.setState({isCreatingNewList: true});
    }

    /**
     * Method for creating a new list.
     */
    private handleCreateList(): void {
        this.props.createNewList(this.state.listName, this.state.listDescription).then(() => {
            this.closeCreateList();
        });
    }

    private closeCreateList() {
        this.setState({
            isCreatingNewList: false,
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
