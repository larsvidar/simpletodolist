import * as React from 'react';
import { sp } from '@pnp/sp';
import styles from './DeleteConfirmation.module.scss';

export default function DeleteConfirmation(props) {
    console.log("Delete confirmation! in component");
    return(
        <div className={styles.deleteconfirmation}>
            <p>Are you sure you want to delete this list?</p>
            <button onClick={() => deleteList(props.listId, props.closeDeleteConfirmation)}>Yes!</button>
            <button onClick={() => props.closeDeleteConfirmation(false)}>No!</button>
        </div>
    );
}

function deleteList(id, closeFunction) {
    console.log(id);
    sp.web.lists.getById(id).delete().then(() => {
        closeFunction(true);
    });
}

