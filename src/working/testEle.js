import { Component } from '../litete';

export default class TestEle extends Component {
  greeting = 'Hello';
  greeetingTest = 'Greeting from parent component';

  constructor(props) {
    super(props);
  }

  sayHello = (e) => {
    alert(this.greeting);
    console.log(this.props);
  }

  render() {
    return `<div> 
      { greeting } { props.test }
      <button onclick='sayHello'>click</button>
      <div>
        <test-elem greeetingTest='{greeetingTest}'></test-elem>
      </div>
    </div>`;
  }
}