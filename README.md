## Table of Contents

- [Change Log](#change-log)
- [Potential Changes](#potential-changes)

## Change Log

*  **07/31/2018:**
   *  Added functionality to undo/redo a reset of the board
   *  Stylistic changes to positions of game components
   *  All buttons are unclickable when the game is over
*  **07/30/2018:**
   *  Notes auto-clear when numbers are placed down
   *  Re-clicking on a cell with a number will re-place notes that existed previously
*  **07/27/2018:**
   *  Changed name of verify to "check"
   *  Deleted unnecessary classes
*  **07/26/2018:**
   *  Stylistic changes in CSS (mostly coloring of cells)
*  **07/25/2018:**
   *  Changed invalidate function to render individual cells red instead of
      entire boxes/rows/columns
   *  Added functionality to verify button
   *  Minor changes to how notes render
*  **07/23/2018:**
   *  Added button to start new game
   *  Added button to verify player's working solution against actual solution
      (still non-functioning)
   *  Added functionality for undo/redo to work with notes
*  **07/20/2018:**
   *  Timer fixed to work correctly
   *  Added ability to place notes on the board
*  **07/19/2018:**
   *  Initial commit

## Potential Changes
In no particular order:

*  Generating unique sudoku puzzles
*  Change position of notes to be fixed within a cell
*  Add responsiveness for correct check (currently only changes render when player's
   solution is wrong)
*  Fix functionality of re-clicking on a cell and re-placing notes
*  Add a pop-up that confirms an action (for reset and new game)
*  Auto-switch selected number (when no more of that number can be placed)
