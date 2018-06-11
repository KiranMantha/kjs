import { Meta, Component, EventManager } from '../litete';
import pathToRegexp from 'path-to-regexp';
import ROUTER_EVENTS from './routerEvents';

@Meta({
    selector: 'router-view'
})
export default class RouterView extends Component {
    constructor(props) {
        super(props);
        this.router = this;
    }

    renderView = (linkDetails) => {
        EventManager.publish(linkDetails.path, linkDetails);
    }

    render() {
        return this.props.children;
    }
}