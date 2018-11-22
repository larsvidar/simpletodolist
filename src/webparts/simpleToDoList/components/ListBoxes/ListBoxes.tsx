import * as React from 'react';
import { Web, sp } from '@pnp/sp';
import IListBoxesProps from './IListBoxesProps';

import styles from './ListBoxes.module.scss';

export default class ListBoxes extends React.Component<IListBoxesProps, {}> {

    constructor(props) {
        super(props);

        this.makingNewList = this.makingNewList.bind(this);
    }

    public state = {
        isCreatingNewList: false,
        listName: "",
        listDescription: "",
    };

    public render(): React.ReactElement<IListBoxesProps> {
        return (
            <div>
                <button onClick={this.makingNewList}>New list</button>
                
                <div className={styles.listboxes}>
                    {this.props.listBoxes.map((item) => {
                        return (
                            <div className={styles.box} onClick={() => {this.handleOpenList(item[3]);}} key={item[3]}>
                                <div>
                                    <h1 className={styles.title}>{item[1]}</h1>
                                    <p className={styles.description}>{item[2]}</p>
                                </div>
                            </div>
                        );
                    })}

                    { this.state.isCreatingNewList &&
                                  
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
    private handleOpenList(id): void {
        this.props.openList(id);
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
        this.setState({isCreatingNewList: false});
        this.props.createNewList(this.state.listName, this.state.listDescription);
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
