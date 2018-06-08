import { Meta, Component } from '../litete';

@Meta({
  selector: 'test-element'
})
export default class TestElement extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return `<div> 
      test element ${ this.props.to }
    </div>`;
  }
}