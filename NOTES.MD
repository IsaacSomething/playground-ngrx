# Notes

### Reducers

- Sets up framework for manipulating the single store object
- Reducers take the current state and an action to produce a new version of the state.
- Meta Reducers are the same as reducer functions (see above) but is performed before the other reducers (a prefix reducer?)

### Actions

- Creates action events which act on interactions with the application
- Actions are triggered by effects or user events

### Selectors

- Creates a function to select a specific property from the store

### Effects

- Change to state based on some event (events?)
- Triggered by actions or server events

### Entity

- Allows for easy store and setup of data structures (common entities format)

```
  entities: { [key: number]: unknown };
  ids: number[];
```

### Data

### Dev tools

- Router store for time travel
- `strictActionImmutability: true` to prevent state of the store from mutations (runtime check)

<br />
<hr />

### Minor Issues

- ~~Viewing the time travel router events, the login dialog box is viewable after logging in for a second. Once logged in there
  should be no login box, router-outlet should be clean.~~
- ~~Promo amount is not being set on first load (set selector in toolbar?)~~
- Prevent large imports of providers for course entity service when used outside of feature module - See toolbar module (forRoot?)
