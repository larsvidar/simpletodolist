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
                            <div className={styles.box} onClick={() => {this.handleOpenList(item[2]);}} key={item[2]}>
                                <div>
                                    <h1 className={styles.title}>{item[0]}</h1>
                                    <p className={styles.description}>{item[1]}</p>
                                </div>
                            </div>
                        );
                    })}

                    { this.state.isCreatingNewList &&
                                  
                        <div className={styles.box}>
                            <form>
                                <input type="text" name="listName" value={this.state.listName} placeholder="List name..." onChange={(e) => this.handleInput(e)}></input>
                                <input type="text" name="listDescription" value={this.state.listDescription} placeholder="List description..."onChange={(e) => this.handleInput(e)}></input>
                                <button type="button" onClick={(e) => this.handleCreateList(e)}>Make list!</button>
                            </form>
                        </div>
                    }

                </div>
            </div>
        );
    }

    //private uniqueId = this.props.createUniqueId(this.props.listBoxes);

    public componentDidMount(): void {
        this.props.updateBoxes();
    }

    private handleOpenList(id) {
        this.props.openList(id);
    }

    private makingNewList() {
        this.setState({isCreatingNewList: true});
    }

    private handleCreateList(event) {
        this.setState({isCreatingNewList: false});
        this.props.createNewList(this.state.listName, this.state.listDescription);
        this.setState({
            listName: "",
            listDescription: "",
        });
    }

    private handleInput(event) {
        this.setState({[event.target.name]: event.target.value});
    }
}
