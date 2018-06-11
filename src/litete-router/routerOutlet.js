//router-link
import {
    Meta,
    Component,
    EventManager,
    registry,
    ComponentFactory
} from '../litete';
import get from 'lodash/get';
import kebabCase from 'lodash/kebabCase';
import ROUTER_EVENTS from './routerEvents';

@Meta({
    selector: 'router-outlet'
})
export default class RouterOutlet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null
        }
        EventManager.subscribe(ROUTER_EVENTS.LOAD_ROUTE, (data) => {
            debugger;
            this.setState({
                data: data
            });
        });
    }

    ComponentOnMount() {
        if (!this.context.router)
            throw Error('RouterOutlet should be the child of RouterView');
    }

    ComponentOnUnMount() {
        EventManager.unsubscribe(ROUTER_EVENTS.LOAD_ROUTE);
    }

    renderComponent = () => {
        debugger;
        if (this.state.data) {
            this.domRef.childNodes.forEach((element) => {
                element.remove();
            });
            let props = {
                'to': this.state.data.to
            };
            return ComponentFactory.createElement(kebabCase(this.state.data.render), props);
        }
        return null;
    }

    render() {
        return this.renderComponent();
    }
}