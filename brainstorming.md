# Brainstorming

Task 1
Added a try and catch statement so that execution can still continue even if invalid data is given. This also ensures an error message is still displayed (to account for missing data points during execution without ending the program).

Seeing as currJSON is not used anywhere else, I removed it and just had the try block run JSON.parse (still successfuly throws errors)
