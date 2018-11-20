import * as React from 'react';
import { Web, sp } from '@pnp/sp';

import IListProps from './IListProps';
import styles from './List.module.scss';

import TaskInput from './TaskInput/TaskInput';
import TaskItem from './TaskItem/TaskItem';


export default class List extends React.Component<IListProps, {}> {

    constructor(props) {
        super();
    }

    public render(): React.ReactElement<IListProps> {
        return(
            <div>
                <p>Add tasks here</p>
                <ul className={ styles.tasklist }>
                    <TaskItem tasks={this.props.taskItems} 
                              handleDelete={this.handleDelete} />
                </ul>
                <TaskInput addNewTask={this.addNewTask} />
            </div>
        );
    }

    private listName: string = "SimpleToDoList-list";
    private listDescription = "A SimpleToDoList list.";
    private LIST = sp.web.lists.getByTitle(this.listName);
    private uniqueId: number = 0;

    //Runs when component loads.
    public componentDidMount() {
        this.createNewList();
        this.updateList();
        this.uniqueId = this.getMaxId();        
    }

    //Creates new list if it does not already exist.
    private createNewList(): void {
        sp.web.lists.ensure(this.listName, this.listDescription, 107);
    }

    //Returns the biggest ID-number in the list to ensure no ID's gets the same value.
    private getMaxId(): number {
        return Math.max.apply(Math, this.props.taskItems.map((item) => { 
            return item[0]; 
        }));
    }

    //Refreshes the list view by updating taskItems in state.
    private updateList(): void {
        this.LIST.items.get().then((list) => {
            this.props.drawList(list);
        });

    }

    //Adds item to list and refreshes list view.
    private addNewTask(value): void {
        this.LIST.items.add({ID: this.uniqueId, Title: value}).then(() => {
            this.updateList();
        });
    }

    //Deletes item from list and refreshes list view.
    private handleDelete(id): void {
        this.LIST.items.getById(id).delete().then(() => {
            this.updateList();
        });
    }

}