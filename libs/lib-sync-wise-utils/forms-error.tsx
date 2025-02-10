import ReactDOM from 'react-dom';
import {ErrorPopup} from "../lib-sync-wise-ui";


export const showError = (error: any) => {
    const root = document.createElement('div');
    document.body.appendChild(root);
    ReactDOM.render(<ErrorPopup message={error.message} />, root);
};