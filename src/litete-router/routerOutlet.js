//router-link
import { Meta, Component, EventManager } from '../litete';
import get from 'lodash/get';
import ROUTER_EVENTS from './routerEvents';

@Meta({
    selector: 'router-outlet'
})
export default class RouterOutlet extends Component {
    constructor(props) {
        super(props);
        EventManager.subscribe(ROUTER_EVENTS.LOAD_ROUTE, (data) => {
            debugger;   
        });
    }

    ComponentOnMount() {
        if(!this.context.router)
            throw Error('RouterOutlet should be the child of RouterView');
    }

    ComponentOnUnMount(){
        EventManager.unsubscribe(ROUTER_EVENTS.LOAD_ROUTE);
    }

    loadRoute = (...args) => {
        this.routerView.renderView(args);
    }

    render() {
        return null;
    }
}