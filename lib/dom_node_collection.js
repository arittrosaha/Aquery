class DomNodeCollection {

  constructor(arr){
    this.elements = arr;
  }

  html(str) {
    if (typeof str === 'undefined') {
      return this.elements[0].innerHTML;
    }
    this.elements.forEach( (el) => {
      el.innerHTML = str;
    });
  }

  empty() {
    this.html("");
  }

  append(args) {
    if (args instanceof HTMLElement) {
      for (let i = 0; i < this.elements.length; i++) {
          this.elements[i].innerHTML += args.outerHTML;
      }
    }
    else if (typeof args === "string") {
      for (let i = 0; i < this.elements.length; i++) {
        this.elements[i].innerHTML += args;
      }
    }
    else {
      for (let i = 0; i < this.elements.length; i++) {
        for (let j=0; j < args.elements.length; j++) {
          this.elements[i].innerHTML += args.elements[j].outerHTML;
        }
      }
    }
  }

  attr(reader, setter){
    if (setter === undefined) {
      return this.elements[0].getAttribute( reader );
    }
    else {
      for (var i = 0; i < this.elements.length; i++) {
        this.elements[i].setAttribute(reader, setter);
      }
      return this;
    }
  }

  addClass(arg) {
    for (let i = 0; i < this.elements.length; i++) {
      let classes = this.elements[i].getAttribute('class');
      classes += ` ${arg}`;
      this.elements[i].setAttribute('class', classes);
    }
    return this;
  }

  removeClass(arg) {
    for (let i = 0; i < this.elements.length; i++) {
      let classes = this.elements[i].getAttribute('class');
      classes = classes.split(' ');
      classes = classes.filter( (el) => !(el === arg));
      this.elements[i].setAttribute('class', classes);
    }
    return this;
  }

  children() {
    let dom = new DomNodeCollection([]);
    for (let i = 0; i < this.elements.length; i++) {
      let children = this.elements[i].children;
      for (let j = 0; j < children.length; j++) {
        dom.elements.push(children[j]);
      }
    }
    return dom;
  }

  parent() {
    let dom = new DomNodeCollection([]);
    for (var i = 0; i < this.elements.length; i++) {
      dom.elements.push(this.elements[i].parentElement);
    }
    return dom;
  }

  find(arg) {
    let dom = new DomNodeCollection([]);
    for (var i = 0; i < this.elements.length; i++) {
      let collection = this.elements[i].querySelectorAll(arg);
      for (let j=0; j < collection.length; j++){
        dom.elements.push(collection[j]);
      }
    }

    return dom;
  }


  remove() {
    this.elements.forEach( el => el.outerHTML = "");
    this.elements = [];
  }

  on(e, cb) {
    for (let i = 0; i < this.elements.length; i++) {
      this.elements[i].addEventListener(e, cb);
      this.elements[i].callback = cb;
    }
  }

  off(e) {
    for (let i = 0; i < this.elements.length; i++) {
      this.elements[i].removeEventListener(e, this.elements[i].callback);
    }
  }


}

module.exports = DomNodeCollection;
