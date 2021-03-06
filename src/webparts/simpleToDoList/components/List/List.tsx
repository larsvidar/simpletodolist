import * as React from 'react';
import { sp } from '@pnp/sp';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import IListProps from './IListProps';
import styles from './List.module.scss';

import TaskInput from './TaskInput/TaskInput';
import TaskItem from './TaskItem/TaskItem';
import DeleteConfirmation from '../sitecomponents/DeleteConfirmation';


export default class List extends React.Component<IListProps, {}> {

    constructor(props) {
        super(props);

        this.addNewTask = this.addNewTask.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleCloseList = this.handleCloseList.bind(this);
    }

    public state = {
        showDeleteConfirmation: false,
    };

    public render(): React.ReactElement<IListProps> {
        return(
            <div className={styles.list}>
                <div className={styles.toppline}>
                    <Icon iconName="Delete" className={styles.deletebutton} title="Delete this list!" onClick={(event) => this.props.showDeleteConfirmation(event, this.props.listId[0])} />
                    <h2 className={styles.listtitle}>{this.props.listId[1]}</h2>
                    <Icon iconName="ChromeClose" className={styles.closebutton} title="Close list!" onClick={this.handleCloseList} />
                </div>
                <ul className={ styles.tasklist }>
                    <TaskItem taskItems={this.props.taskItems} 
                              handleDelete={this.handleDelete} />
                </ul>
                <TaskInput addNewTask={this.addNewTask} />

            </div>
        );
    }


    private thisList = sp.web.lists.getById(this.props.listId[0]);

    //Runs when component loads.
    public componentDidMount() {
        this.updateList();
    }

    //Refreshes the list view by updating taskItems in state.
    private updateList(): void {
        this.props.loadingIndicator(true);
        this.thisList.items.get().then((list) => {
            this.props.drawList(list);
        }).then(() => {
            this.props.loadingIndicator(false);
        });

    }

    //Adds item to list and refreshes list view.
    private addNewTask(title): void {
        this.thisList.items.add({Title: title}).then(() => {
            this.updateList();
        });
    }

    //Deletes item from list and refreshes list view.
    private handleDelete(id): void { 
        this.thisList.items.getById(id).delete().then(() => {
            this.updateList();
        });
    }

    //Calls closeList method from SimpleToDoList.tsx.
    private handleCloseList() {
        this.props.closeDeleteConfirmation(false);
        this.props.closeList();
    }
}