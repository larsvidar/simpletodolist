import * as React from 'react';

export default function TaskItem(props) {

    return(
        <div>
            {props.tasks.map((item, index) => {
                console.log(item + ": " + index);
                return(
                    <table>
                        <tr key={item[0]}>
                            <td>
                                <p>{item[1]}</p>
                            </td>
                            <td>
                                <button onClick={() => props.handleDelete(item[0])}>Delete!</button>
                            </td>
                        </tr>
                    </table>
                );
            })}
        </div>
    );
}