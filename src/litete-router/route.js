//route
import { Meta, Component, EventManager, ComponentFactory } from '../litete';

@Meta({
    selector: 'route'
})
export default class Route extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null
        };
        this.childProps = {};
        EventManager.subscribe(props.path, (data) => {
            this.setState({
                data: data
            });
        });
    }

    ComponentOnUnMount() {
        EventManager.unsubscribe(this.props.path);
    }

    renderComponent = () => {
        if (this.state.data) {
            let props = {
                match: {
                    to: this.state.data.path
                }
            };
            return ComponentFactory.createElement(this.props.render, props);
        }
        return null;
    }

    render() {
        return this.renderComponent();
    }
}