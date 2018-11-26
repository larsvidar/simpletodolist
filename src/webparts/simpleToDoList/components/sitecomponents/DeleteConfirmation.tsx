import * as React from 'react';
import { sp } from '@pnp/sp';
import styles from './DeleteConfirmation.module.scss';

export default function DeleteConfirmation(props) {
    return(
        <div className={styles.deleteconfirmation}>
            <p className={styles.confirmationtext}>Are you sure you want to delete this list?</p>
            <button className={styles.confirmbuttons} onClick={() => deleteList(props.listId, props.closeDeleteConfirmation)}>Yes!</button>
            <button className={styles.confirmbuttons} onClick={() => props.closeDeleteConfirmation(false)}>No!</button>
        </div>
    );
}

function deleteList(id, closeFunction) {
    console.log(id);
    sp.web.lists.getById(id).delete().then(() => {
        closeFunction(true);
    });
}

