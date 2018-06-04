import { Meta, Component } from '../litete';

@Meta({
    selector: 'router-view'
})
export default class RouterView extends Component {
    constructor(props) {
        super(props);
        this.component = this;
    }

    renderView = (...args) => {
        console.log('Args from routerview', args);
    }

    render() {
        return this.props.children;
    }
}