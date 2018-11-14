import * as React from 'react';
import styles from './SimpleToDoList.module.scss';
import { ISimpleToDoListProps } from './ISimpleToDoListProps';
import { escape } from '@microsoft/sp-lodash-subset';

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
        <div className={ styles.bluebackground }>
          <h1>Simple todo-list</h1>
          <p>Add tasks here</p>
          <TaskItem tasks={this.state.taskItems} handleDelete={this.handleDelete} />
          <TaskInput addNewTask={this.addNewTask} />
        </div>
      </div>
    );
  }

  uniqueId = 0;

  addNewTask(value) {
    const tempArray = this.state.taskItems;
    this.uniqueId++;
    tempArray.push([this.uniqueId, value]);
    this.setState({taskItems: tempArray});
  }

  handleDelete(index) {
    const tempArray = this.state.taskItems.filter((item) => {
      return item[0] != index;
    });

    this.setState({taskItems: tempArray});
  }

}




