import * as React from 'react';
import styles from './SimpleToDoList.module.scss';
import { ISimpleToDoListProps } from './ISimpleToDoListProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { sp } from '@pnp/sp';

import List from './List/List';
import ListBoxes from './ListBoxes/ListBoxes';

export default class SimpleToDoList extends React.Component<ISimpleToDoListProps, {}> {
  constructor() {
    super();

    this.drawList = this.drawList.bind(this);
    this.updateBoxes = this.updateBoxes.bind(this);
    this.createNewList = this.createNewList.bind(this);
    this.openList = this.openList.bind(this);
    this.closeList = this.closeList.bind(this);
  }

  public state = {
    taskItems: [],
    listBoxes: [],
    mode: "box"
  };

  public render(): React.ReactElement<ISimpleToDoListProps> {
    return (
      <div className={ styles.simpletodolist }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <h1 className={styles.tittle}>Simple todo-list</h1>

            { this.state.mode === "box" &&
              <ListBoxes updateBoxes={this.updateBoxes}
                         listBoxes={this.state.listBoxes}
                         createNewList={this.createNewList}
                         openList={this.openList}
                         deleteBox={this.DeleteBox} />
            }

            { this.state.mode !== "box" &&
              <List taskItems={this.state.taskItems} 
                    drawList={this.drawList}
                    closeList={this.closeList}
                    listId={this.state.mode} />
            }
          </div>
        </div>
      </div>
    );
  }

  //Creates new list if it does not already exist.
  private createNewList(listName, listDescription): void {
    sp.web.lists.ensure(listName, listDescription, 107).then(() => this.updateBoxes());
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

  //Opens list with the given ID.
  private openList(id, title) {
    this.setState({mode: [id, title]});
  }

  //Closes all lists.
  private closeList() {
    this.setState({mode: "box"});
  }

  //Update listBoxes array
  private updateBoxes() {
    let tempArray = [];
    sp.web.lists.get().then((lists) => {
        lists.map((list) => {
            if (list.BaseTemplate === 107) {
              tempArray.push([list.Created, list.Id, list.Title, list.Description]);
            }
        });
    }).then(() => {
      tempArray.sort();
      this.setState({listBoxes: tempArray});
    });
  } 

  private DeleteBox(id) {
    console.log("Box will delete!");
    sp.web.lists.getById(id).delete().then(() => {
      this.updateBoxes();
    });
  }
}
