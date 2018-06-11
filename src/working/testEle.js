import { Meta, Component } from '../litete';

@Meta({
  selector: 'test-ele'
})
export default class TestEle extends Component {
  greeting = 'Hello';
  greeetingTest = { 
    greet: 'Greeting from parent component'
  };

  constructor(props) {
    super(props);
  }

  sayHello = (e) => {
    alert(this.greeting);
  }

  render() {
    return `<div> 
      ${ this.greeting + ' '+ this.props.test }
      <button onclick='sayHello'>click</button>
      <div>
        <test-elem greeetingTest='{greeetingTest}'></test-elem>
      </div>
    </div>`;
  }
}