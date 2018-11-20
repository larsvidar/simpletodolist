import * as React from 'react';
import styles from './TaskItem.module.scss';

export default function TaskItem(props) {

    return (
        <li className={styles.taskitem}>   
            {props.tasks.map((item) => {
                return (
                    <div className={styles.item} key={item[0]}>
                        <p className={styles.p}>{item[1]}</p>
                        <button className={styles.button} onClick={() => props.handleDelete(item[0])}>Delete!</button>
                    </div>
                );
            })}
        </li>
    );
}
