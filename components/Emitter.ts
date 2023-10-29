export class Emitter {
  addEventListener: DocumentFragment["addEventListener"];
  dispatchEvent: DocumentFragment["dispatchEvent"];
  removeEventListener: DocumentFragment["removeEventListener"];
  constructor() {
    const delegate = document.createDocumentFragment();
    this.addEventListener = (...xs) => delegate.addEventListener(...xs);
    this.dispatchEvent = (...xs) => delegate.dispatchEvent(...xs);
    this.removeEventListener = (...xs) => delegate.removeEventListener(...xs);
  }
}

// // sample class to use Emitter
// class Example extends Emitter {}
// // run it
// var e = new Example();
// e.addEventListener("something", (event) => console.log(event));
// e.dispatchEvent(new Event("something"));
