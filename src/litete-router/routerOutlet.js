//router-link
import { Meta, Component, EventManager, registry, ComponentFactory } from '../litete';
import get from 'lodash/get';
import kebabCase from 'lodash/kebabCase';
import ROUTER_EVENTS from './routerEvents';

@Meta({
    selector: 'router-outlet'
})
export default class RouterOutlet extends Component {
    constructor(props) {
        super(props);
        EventManager.subscribe(ROUTER_EVENTS.LOAD_ROUTE, (data) => {
            debugger;
            this.renderComponent(data);
        });
    }

    ComponentOnMount() {
        if (!this.context.router)
            throw Error('RouterOutlet should be the child of RouterView');
    }

    ComponentOnUnMount() {
        EventManager.unsubscribe(ROUTER_EVENTS.LOAD_ROUTE);
    }

    renderComponent = (data) => {
        debugger;        
        this.domRef.childNodes.forEach((element) => {
            element.remove();
        });
        let props = {
            'to': data.to
        };
        let node = ComponentFactory.createNode(data.render, props, this.domRef);
    }

    render() {
        return null;
    }
}