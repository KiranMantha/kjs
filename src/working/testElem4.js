import { Meta, Component } from '../litete';

@Meta({
  selector: 'test-element'
})
export default class TestElement extends Component {
  constructor(props) {
    super(props);
  }

  ComponentOnMount() {
      console.log(`${ this.localName } got loaded`);
  }

  ComponentOnUnMount() {
      console.log(`${ this.localName } got unloaded`);
  }

  render() {
    return `<div> 
      test element ${ this.props.to }
    </div>`;
  }
}