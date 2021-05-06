# ember-lifecycle-utils

Utils to reduce boilerplate when working with lifecycles

## Installation

```
ember install ember-lifecycle-utils
```


## Usage

### Vanilla Classes and Destroyables

```js
import { withCleanup } from 'ember-lifecycle-utils';

class Hello {
  constructor() {
    withCleanup(this, () => {
      window.addEventListener('click', this.handleClick);

      return () => {
        window.removeEventListener('click', this.handleClick);
      }
    });
  }
}
```

This can be used to help make even more concise helpers, like:

```js
function useWindowEvent(context, eventName, handler) {
  withCleanup(context, () => {
    window.addEventListener(eventName, 'click', this.handleClick);

    return () => {
      window.removeEventListener(eventName, 'click', this.handleClick);
    }
  });
}
```

So now the above example would be:

```js
class Hello {
  constructor() {
    useWindowEvent(this, 'click', this.handleClick);
    useWindowEvent(this, 'mouseenter', this.handleClick);
  }
}
```



### Modifiers


```js
import { eventListeners } from 'ember-lifecycle-utils/modifier';


export default class Hello extends Component {
  registerListeners = modifier((element) => {
    return eventListeners(element.parentElement,
      ['click', this.onClick],
      ['mouseenter', this.onHover],
    );
  });

  // or shorthand
  registerListeners = modifier(eventListeners(
    ['click', this.onClick],
    ['mouseenter', this.onHover],
  ));


  // ...
}
```
```hbs
<button {{this.registerListeners}}>click me</button>
```



## Contributing

See the [Contributing](CONTRIBUTING.md) guide for details.


## License

This project is licensed under the [MIT License](LICENSE.md).
