import * as React from 'react';
import styles from './LoadingIndicator.module.scss';

import { Icon } from 'office-ui-fabric-react/lib/Icon';

export default function LoadingIndicator() {
    return(
        <div className={styles.loadingindicator}>
            <Icon iconName="Sync" className={styles.icon} />
        </div>
    );
}