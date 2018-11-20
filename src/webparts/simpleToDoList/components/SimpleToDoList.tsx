import * as React from 'react';
import styles from './SimpleToDoList.module.scss';
import { ISimpleToDoListProps } from './ISimpleToDoListProps';
import { escape } from '@microsoft/sp-lodash-subset';

import List from './List/List';

export default class SimpleToDoList extends React.Component<ISimpleToDoListProps, {}> {
  constructor() {
    super();
  }

  public state = {
    taskItems: []
  };

  public render(): React.ReactElement<ISimpleToDoListProps> {
    return (
      <div className={ styles.simpletodolist }>
        <div className={ styles.container }>
          <div className={ styles.row }>

            <h1>Simple todo-list</h1>
            <List taskItems={this.state.taskItems} 
                  drawList={this.drawList} />

          </div>
        </div>
      </div>
    );
  }

  //Refreshes the list view by updating taskItems in state.
  private drawList(taskList): void {
    //Make a temporary array.
    let tempArray = [];
    //Populate temporary array with all existing list items.
    tempArray = taskList.map((task) => {
      return [task.ID, task.Title];   
    });
    //Set temporary array as new state (thereby updating view).
    this.setState({taskItems: tempArray});
  }
}




