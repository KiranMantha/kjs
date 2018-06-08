import { Meta, Component, EventManager } from '../litete';
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
        EventManager.publish(ROUTER_EVENTS.LOAD_ROUTE, linkDetails);
    }

    render() {
        return this.props.children;
    }
}