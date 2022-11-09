# YS Survey

## How to run?

1. Clone package
2. Run `npm install`
3. Run `npm run dev`

## Building the embedded version...

1. Run `npm run embed`

Orrrrr....

1. Create a html file.
2. Add a `<div id="root"></div>` to your file.
3. Add a `<script src="https://cdn.jsdelivr.net/gh/silvandiepen/ys-survey/dist/app.js"></script>`to the bottom of your html.
4. Et Voila!

## Assumptions

- Questions are set, when the project is used for another survey it can be altered.
- It is ok to add a html element to your code where the survey will be loaded. 
- Keep the project minimal with only small dependencies
- You don't always need a heavy and complicated state manager to manage a small state
- It's ok to add the dist, because in this way the dist file will be hosted by github.

## What I would have do to improve?

- Create more separate components and separte UI from logic.
- Make Unit tests independent of the current set of questions.
- Keep all Survey logic in the SurveyController.
- Improve darkmode/lightmode (toggleable)
- Make all styling themable.
- Actually get the results somewhere
- Better checking of inputs.
- Move Input components out of Question.tsx
- Create configuration for certain values like the 2 second wait
- Automatic prefix of classes and styling in order to not conflict with host.