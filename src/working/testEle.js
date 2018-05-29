import LiteTE from '../templateEngine';

export default class TestEle extends LiteTE {
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
      <test-elem greeetingTest='{greeetingTest}'></test-elem>
    </div>`;
  }
}