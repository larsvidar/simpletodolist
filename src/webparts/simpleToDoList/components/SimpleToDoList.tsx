import * as React from 'react';
import styles from './SimpleToDoList.module.scss';
import { ISimpleToDoListProps } from './ISimpleToDoListProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { sp } from '@pnp/sp';

import List from './List/List';
import ListBoxes from './ListBoxes/ListBoxes';
import DeleteConfirmation from './sitecomponents/DeleteConfirmation';
import LoadingIndicator from './sitecomponents/LoadingIndicator';

export default class SimpleToDoList extends React.Component<ISimpleToDoListProps, {}> {
  constructor() {
    super();

    this.drawList = this.drawList.bind(this);
    this.updateBoxes = this.updateBoxes.bind(this);
    this.createNewList = this.createNewList.bind(this);
    this.openList = this.openList.bind(this);
    this.closeList = this.closeList.bind(this);
    this.showDeleteConfirmation = this.showDeleteConfirmation.bind(this);
    this.closeDeleteConfirmation = this.closeDeleteConfirmation.bind(this);
    this.loadingIndicator = this.loadingIndicator.bind(this);
  }

  public state = {
    taskItems: [],
    listBoxes: [],
    mode: "box",
    isDeleteConfirmation: false,
    isLoading: true,
  };

  public render(): React.ReactElement<ISimpleToDoListProps> {
    return (
      <div className={ styles.simpletodolist }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <h1 className={styles.title}>Simple todo-list</h1>

            { this.state.mode === "box" &&
              <ListBoxes updateBoxes={this.updateBoxes}
                         listBoxes={this.state.listBoxes}
                         createNewList={this.createNewList}
                         openList={this.openList}
                         showDeleteConfirmation={this.showDeleteConfirmation}
                         closeDeleteConfirmation={this.closeDeleteConfirmation}
                         isDeleteConfirmation={this.state.isDeleteConfirmation}
                         loadingIndicator={this.loadingIndicator} />
            }

            { this.state.mode !== "box" &&
              <List taskItems={this.state.taskItems} 
                    drawList={this.drawList}
                    closeList={this.closeList}
                    listId={this.state.mode}
                    showDeleteConfirmation={this.showDeleteConfirmation}
                    closeDeleteConfirmation={this.closeDeleteConfirmation}
                    isDeleteConfirmation={this.state.isDeleteConfirmation}
                    loadingIndicator={this.loadingIndicator} />
            }

            { this.state.isDeleteConfirmation &&
                        <DeleteConfirmation closeDeleteConfirmation={this.closeDeleteConfirmation}
                                            listId={this.state.isDeleteConfirmation} />
            }

            { this.state.isLoading &&
              <LoadingIndicator />
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
    this.loadingIndicator(true);
    //Make a temporary array.
    let tempArray = [];
    //Populate temporary array with all existing list items.
    tempArray = taskList.map((task) => {
      return [task.ID, task.Title];   
    });
    //Set temporary array as new state (thereby updating view).
    this.setState({taskItems: tempArray, 
                   isLoading: false});
  }

  //Opens list with the given ID.
  private openList(id, title) {
    this.setState({mode: [id, title]});
  }

  //Closes all lists.
  private closeList() {
    this.setState({mode: "box",
                   taskItems: []});
  }

  //Update listBoxes array
  private updateBoxes() {
    this.loadingIndicator(true);
    let tempArray = [];
    sp.web.lists.get().then((lists) => {
        lists.map((list) => {
            if (list.BaseTemplate === 107) {
              tempArray.push([list.Created, list.Id, list.Title, list.Description]);
            }
        });
    }).then(() => {
      tempArray.sort();
      this.setState({listBoxes: tempArray, 
                     isLoading: false});
    });
  } 

  /*** Methods for DeleteConformation ***/
  private showDeleteConfirmation(event, id) {
      event.stopPropagation();
      this.setState({isDeleteConfirmation: id});
  }

  private closeDeleteConfirmation(shouldUpdate: boolean) {
      this.setState({isDeleteConfirmation: false});
      if(shouldUpdate) {
        this.updateBoxes();
        this.closeList();

      }
  }

  private loadingIndicator(show: boolean) {
      this.setState({isLoading: show});
  }
}
