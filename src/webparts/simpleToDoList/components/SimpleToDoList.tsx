import * as React from 'react';
import styles from './SimpleToDoList.module.scss';
import { ISimpleToDoListProps } from './ISimpleToDoListProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { Web, sp } from '@pnp/sp'

import TaskInput from './TaskInput';
import TaskItem from './TaskItem';

export default class SimpleToDoList extends React.Component<ISimpleToDoListProps, {}> {
  constructor() {
    super();

    this.addNewTask = this.addNewTask.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  state = {
    taskItems: []
  }

  public render(): React.ReactElement<ISimpleToDoListProps> {
    return (
      <div className={ styles.simpletodolist }>
        <div className={ styles.container }>
          <div className={ styles.row }>

            <h1>Simple todo-list</h1>
            <p>Add tasks here</p>
            <ul className={ styles.tasklist }>
                <TaskItem tasks={this.state.taskItems} handleDelete={this.handleDelete} />
            </ul>
            <TaskInput addNewTask={this.addNewTask} />

          </div>
        </div>
      </div>
    );
  }

  private listName: string = "SimpleToDoList-list";
  private uniqueId: number = 0;
  private LIST = sp.web.lists.getByTitle(this.listName);

  //Runs when page loads.
  componentDidMount() {
    this.createNewList();
    this.drawList();
    this.uniqueId = this.getMaxId();
  };

  //Creates new list if it does not already exist.
  private createNewList(): void {
    sp.web.lists.ensure(this.listName, "SimpleToDoList");
  }

  //Refreshes the list view by updating taskItems in state.
  private drawList(): void {
    let tempArray = [];
    this.LIST.items.get().then((list) => {
      tempArray = list.map( (task) => {
        return [task.ID, task.Title];   
      });
    }).then(() => {
      this.setState({taskItems: tempArray});
    });
  }

  //Returns the biggest ID-number in the list to ensure no ID's gets the same value.
  private getMaxId(): number {
    return Math.max.apply(Math, this.state.taskItems.map((item) => { 
      return item[0]; 
    }))
  }

  //Adds item to list and refreshes list view.
  addNewTask(value): void {
    this.LIST.items.add({ID: this.uniqueId, Title: value}).then(() => {
      this.drawList();
    });
  }

  //Deletes item from list and refreshes list view.
  handleDelete(id): void {
    this.LIST.items.getById(id).delete().then(() => {
      this.drawList();
    });
  }
}




