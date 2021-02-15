# NBA - ReactJS Interview

Welcome to Slingshot's React Interview! Sit back and relax, because this will be fun! 🍿

## Before Starting

Thank you for taking the time to do this coding assessment. Don't stress too much about any one thing and definitely don't stress if you don't finish every step - the project has more steps than you are likely to be able to complete in the given timeframe. Just do the best you can with the time you're given! There's a `notes.txt` file in this project. After you are finished, please feel free to add notes there on anything you might have done differently or might have implemented if you had more time!

## Assessment Guidelines:

This project was created with `create-react-app`. You can start both the server & client with `yarn start` / `npm start`.

- You have a max of 4 hours to complete this assessment. Again, don't stress if you don't finish - there are more steps than you can complete in 4 hours!
- You are mostly graded on the functionality & architecture of your code. You are partially graded on your UX/UI or visual design skills. We use styled-components, so feel free to use that or replace them with whatever is your preferred styling method!
- The project has redux already set up if you would like to use that - also feel free to use any other state management library if you'd like (but it is not required)
- This project has support for typescript, but it's up to you if you want to implement it (but it is not required)
- Feel free to add any other external frameworks, libraries, or plugins you feel would help you best (current structure involves react, redux, and some styled-components)
- Check out the API index at http://localhost:3008. Note that the api uses json-server: https://github.com/typicode/json-server

### PART I - Basic Data Retrieval

1.  GET the list of NBA players from the REST endpoint `http://localhost:3008/players`
2.  Use the `Card` component to display each player's name, image, and team that is returned from the above endpoint
3.  Use `http://localhost:3008/teams` to get the name of each player's team. (Note that the embed functionality of json-server has been disabled so that this is necessary).

### PART II - Controlled Data Fetching

4.  Add pagination at the request level, loading no more than 10 results at a time (ref: https://github.com/typicode/json-server#paginate).
5.  Make the provided `Search` component work as a filter on the player cards, acting on any of their attributes, filtering at the server level and still paginating the results(ref: https://github.com/typicode/json-server#full-text-search).

### PART III - Saving to the server

6.  Add an edit button on each player card that displays a form to edit all of the player's attributes (except for team, that will be in a later step). You can design the ability to edit a player anyway you'd like.
7.  Add a `Save` button to the form that updates the person's attributes by making a PATCH request to `http://localhost:3008/players/[the player's id goes here]`. Note from the json-server documentation:
    > A POST, PUT or PATCH request should include a Content-Type: application/json header to use the JSON in the request body.
8.  Create a component that renders a dropdown element to edit the player's team. Ensure this is able to be saved to the server

### PART IV - Favoriting Cards

9. Add a `Favorite` button to each card and a favorite count to the upper right hand corner of the screen. Clicking the button toggles favorited button state and increments/decrements the favorite count appropriately.
10. Make the favorite state save each favorite to the json-server by POSTing to the `http://localhost:3008/favorites` endpoint. Note that the json-server is schema-less so we expect you to invent your own schema for the favorite records. Load favorited documents on the initial page render in order to appropriately render the favorite counter and button states on page load.

### PART V - Drag and Drop

11. When a user clicks on the favorite count, route to a page that displays all the favorite cards, miniaturized using css. Add a back button to go back to the main list.
12. Add drag-and-drop functionality in order to sort the favorites in order. Display the order on above the card. Save the order to the `http://localhost:3008/favorites` endpoint in order to persist it and load the saved favorite order from the server.
13. Update your code so that when a new card is favorited or unfavorited, that change is persisted to the server. New, unsorted favorites should be added to the end of the favorite list in order of when they were favorited (unless changed by sorting).
