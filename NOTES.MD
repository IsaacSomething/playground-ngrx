### Reducers

- Sets up framework for manipulating the single store object (anti-pattern but anyways)
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

### Dev tools

- Router store for time travel
- `strictActionImmutability: true` to prevent state of the store from mutations (runtime check)

<br />
<hr />

### Minor Issues

- Viewing the time travel router events, the login dialog box is viewable after logging in for a second. Once logged in there
  should be no login box, router-outlet should be clean.