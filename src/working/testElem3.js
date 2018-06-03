import { Meta, Component } from '../litete';

@Meta({
  selector: 'test-elemt'
})
export default class TestElemt extends Component {
  constructor() {
    super();
  }

  render() {
    return `<div>test elem3</div>`;
  }
}