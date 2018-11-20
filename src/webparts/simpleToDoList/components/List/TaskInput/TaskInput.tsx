import * as React from 'react';
import ITaskInputProps from './ITaskInputProps';
import styles from './TaskInput.module.scss';

export default class TaskInput extends React.Component<ITaskInputProps, {}> {
    constructor(props) {
        super(props);
        this.inputCapture = this.inputCapture.bind(this);
        this.addButtonClick = this.addButtonClick.bind(this);
    }

    public state = {
        taskValue: "" 
    };

    private inputCapture(event) {
        this.setState({taskValue: event.target.value});
    }

    private addButtonClick() {
        if (this.state.taskValue) {
            this.props.addNewTask(this.state.taskValue);
            this.setState({taskValue: ""});
        }
    }

    public render(): React.ReactElement<TaskInput> {
        return (
            <div className={ styles.taskinput }>
                <input className={styles.input}
                       autoFocus
                       type="text"
                       value={this.state.taskValue}
                       onChange={this.inputCapture}></input>
                <button className={styles.button} onClick={this.addButtonClick}>Add!</button>
            </div>
        );
    }
}