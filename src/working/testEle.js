import LiteTE from '../templateEngine';
import render from '../render';

export class TestEle extends LiteTE {
  greeting = 'Hello';

  constructor() {
    super();
  }

  sayHello = (e) => {
    alert(this.greeting);
  }

  render() {
    return `<div> { greeting } <button onclick='sayHello'>click</button></div>`;
  }
}

let tag = '<TestEle></TestEle>';

render( tag, document.body);