# Guess The Word Game (UI)

This is the design document for the UI of a Guess The Word game. In this game, the player's objective is the guess a secret word. First, the player is shown a hint. Then, with each missed guess, the player is shown another hint. After 5 guesses, the player is shown the secret word and can play again.

This design document is primarily focused on the UI and UX. It leaves out details of the backend implementation.

This design document is for the first iteration of this game.

# The UI 

- The UI starts with a simple screen with the title "Guess The Word" and a start button.

- Uses responsive design to be both desktop and mobile friendly.

- Once the game starts, a new view is shown. This view has the "Guess The Word" title, and areas for showing hints, guesses, and a method for the player to make guesses.

- There is an area for showing hints, as each hint is revealed, and for showing guesses, as each guess is made.

- There should be visual differentiation between hints and guesses. 

- There is an area where a short completion message is shown. This allows us to show a message when the player successfully guesses a word or when the player does not guess the word after 5 tries.

- A RESTART button is shown below the completion message.

- There is a text input field which the player uses to enter the next guess. There should be a submit button for submitting the guess. 

- When the input is invalid, the submit button should be disabled. 

- The text input field is cleared after each guess.

- The text input field is disabled after the game is complete (win or lose).

- Hints and the secret word are displayed in uppercase characters only. Though the player input could be in lower-case. 

- Do not allow the user to submit empty input. If, for some reason, an empty input is made, use a toast notification to show, "Not a valid guess".

- If a player repeats a guess, a toast notification is displayed, "You already guessed [GUESS]. Try again." Do not treat this as a new incorrect guess.

- At the end of a game session--whether the user has successfully or failed to guess the word, the player can click a "RESTART" button to return to the initial screen.

# The First Iteration

We are keeping certain things simple in this first iteration:

- The instruction for the game is out-of-scope of the first iteration.

- There should be a way to reset the game after completion. In the first iteration, we can insert a clickable button after the win or lose message that says "RESTART.

- There is no special audio or visual feedback when a guess is made, other than showing the guess, and, in the case of a incorrect guess, the next hint.

- Use black text for hints. Use a different color text, such as red, orange, or yellow, for incorrect guesses. Use green text for a correct guess.

- Accessibility is out of scope for the first iteration.

- If an invalid input is provided, use a toast notification to show "Not a valid guess".

- The toast notifications are displayed at the top of the screen. 

- Hints (and guesses) area is at the top. The input field (and its corresponding submit button) is at the bottom.

- A turn counter (2 out of 5 guesses) is out of scope of the first iteration.

- It is acceptable if the game state is lost when the player refreshes the game.

- On mobile, it is okay to assume portrait orientation is the only supported orientation.

- A modal spinner is used when a guess is submitted and the game is, in theory, waiting for a backend to determine, authoritatively, whether the guess was correct or not.

- Assume Chrome and Mobile Safari support only in the first iteration.

- Hints and guesses are arranged in a single column--alternating rows of hint an guess. This means they take up a majority of the screen real estate when the player gets to 5 hints and 5 guesses. That's ok for the first iteration.

# Constraints and Assumptions

- No more than 5 hints and 5 guesses.

- The secret word is always less than 10 characters. Thus, the guess is also limited to 10 characters.

- Each hint is less than 7 characters.

- Uses ASCII characters only. Words will be English words. Thus, only A-Z are allowed as valid input. However, for simplicity, allow the user to enter the input in either lower or uppercase. We should even accept mixed cases. 

- When comparing guess and hints, we should use case insensitive comparison. The details of comparison is out-of-scope of this UI design document.

- A toast notification remains visible for 2 seconds.

- Assume a backend API is used to: Manage the state of the game; Determine if a guess is correct or not; Fetch the completion message; Fetch the next hint.

# Example - Failed To Guess The Word

Secret Word: BREAD
Hints:
- GRAIN
- BUTTER
- CRUST
- SLICE
- BAKER

Game Play
- The player is shown the first hint, "GRAIN".

- The player makes his first guess and enters "FARMER". This guess is displayed after the first hint. The UI now shows "GRAIN" (the first hint) followed by "FARMER" (the first guess).

- The first guess is incorrect. The player is shown the second hint, "BUTTER". Now you can see the following on the screen: "GRAIN" (the first hint), "FARMER" (the first guess), and "BUTTER" (the second hint).

- The player makes his second guess, "FOOD". This is added to the screen.

- The second guess is incorrect. The third hint is shown, "CRUST".

- The player makes his third guess, "PIZZA". This is added to the screen.

- The third guess is incorrect. The fourth hint is shown, "SLICE".

- The player makes his fourth guess, "TOAST". This is added to the screen.

- The fourth guess is incorrect. The fifth hint is shown, "BAKER".

- The player makes his fifth guess, "DOUGH". This is added to the screen.

- Because the player has made 5 guesses and has not guessed the secret word. The completion message is shown: "I'm sorry, but the secret word is BREAD."

- The RESTART button is shown so the player can return to the initial screen.


# Example - Correctly Guesses The Word After Three Tries

- The player is shown the first hint, "GRAIN".

- The player makes his first guess and enters "FARMER". This guess is displayed after the first hint. The UI now shows "GRAIN" (the first hint) followed by "FARMER" (the first guess).

- The first guess is incorrect. The player is shown the second hint, "BUTTER". Now you can see the following on the screen: "GRAIN" (the first hint), "FARMER" (the first guess), and "BUTTER" (the second hint).

- The player makes his second guess, "FOOD". This is added to the screen.

- The second guess is incorrect. The third hint is shown, "CRUST".

- The player makes his third guess, "BREAD". This is added to the screen. 

- The third guess is correct. The completion message is shown: "You got it! The secret word is BREAD."

- The RESTART button is shown so the player can return to the initial screen.

# Example - The Third Guess Is a Repeat

- The player is shown the first hint, "GRAIN".

- The player makes his first guess and enters "FARMER". This guess is displayed after the first hint. The UI now shows "GRAIN" (the first hint) followed by "FARMER" (the first guess).

- The first guess is incorrect. The player is shown the second hint, "BUTTER". Now you can see the following on the screen: "GRAIN" (the first hint), "FARMER" (the first guess), and "BUTTER" (the second hint).

- The player makes his second guess, "FOOD". This is added to the screen.

- The second guess is incorrect. The third hint is shown, "CRUST".

- The player makes his third guess, "FARMER". This is not added to the screen because it was already guessed.

- A toast notification, "You already guessed FARMER. Try again." is shown. The input field is cleared, allowing the player to try again.

We do not want to penalize the player for making a repeated guess. The UI should let the player know that the guess was a repeat and the player can try again.

# Game States

The game can exist in the following states, each with specific UI and interaction characteristics:

1. **Initial State**
   - Title "Guess The Word" displayed prominently
   - START button centered below title
   - No game elements visible

2. **Playing State**
   - Title remains visible
   - Hint area displays current hint(s)
   - Guess area displays previous guesses
   - Input field and SUBMIT button active and enabled
   - No completion message visible

3. **Submitting State** (transient)
   - Input field disabled
   - Submit button disabled
   - Loading spinner visible
   - Lasts until backend responds

4. **Win State**
   - Input field disabled
   - Submit button disabled
   - Win completion message displayed: "You got it! The secret word is [WORD]."
   - RESTART button visible

5. **Lose State**
   - Input field disabled
   - Submit button disabled
   - Lose completion message displayed: "I'm sorry, but the secret word is [WORD]."
   - RESTART button visible

6. **Error State** (optional for first iteration)
   - Error message displayed
   - RESTART button visible

State transitions:
- Initial → Playing: User clicks START
- Playing → Submitting: User submits a guess
- Submitting → Playing: Backend confirms incorrect guess
- Submitting → Win: Backend confirms correct guess
- Submitting → Lose: Backend confirms 5th incorrect guess
- Win/Lose → Initial: User clicks RESTART

# Functional Requirements

- Invalid inputs include: non-ASCII characters, numbers, special characters. 

# Technical Requirements

- React

- Tailwind CSS

- Use https://www.npmjs.com/package/react-toastify for toast messages

# Future Additions

This section is an incomplete enumerations of future enhancements. Also see the "First Iteration" section for the kind of features that are implied as future enhancements.

- A turn counter

- A keyboard UI such as the one used by Wordle, which allows a more streamlined input (only A-Z, delete, and submit), and gives us more control over where the keyboard is placed.
