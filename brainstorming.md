# Brainstorming

Task 1
Added a try and catch statement so that execution can still continue even if invalid data is given. This also ensures an error message is still displayed (to account for missing data points during execution without ending the program).

Task 2
Initially I just got the time of each datapoint using Date(), but then noticed there was a timestamp attribute, so I made some slight modifications to use that instead.

Intervalstart is a variable that keeps track of when the current 5 second interval started. We also keep track of temp count. Both are set to zero. setNewInterval keeps track of whether or not the current datapoint should be set as the beginning of a new 5 second interval.

Since intervalStart is initially set to zero, the first datapoint when the server starts will always be set to be the start of the interval (since it will be a (huge number - 0)/1000, obviously bigger than 5).

We then run through each datapoint, checking to see whether we are still within the 5 second interval at the start of each loop, and incrementing the count if the datapoint is out of bounds.

If we are beyond 5 seconds, then set the current datapoint as the start of a new interval and reset exceededTempCount to zero.

At the end of the loop, after checking we are within the interval and whether or not the current datapoint is out of bounds, we then check whether exceededTempCount is over 3.

If it is, then write to report. Obviously, we now need to set a new interval, so change setNewInterval to true, and it will set the next datapoint as the beginning of a new 5 second interval. This handles the case where we go over 3 failures but the next datapoint is still within 5 seconds (therefore the first if statement is not enough, we need this additional check)

Task 3
Temp range colour

20 30 40 50 60 70 80

40 < temp < 60 green

30 <= temp <= 40 || 60 <= temp <= 70 yellow

20 <= temp <= 30 || 70 <= temp <= 80 yellow

temp < 20 || temp > 80 red

Also say message when out of range:
OUT OF RANGE: Too high/Too low

Potentially:
Store the last 10 temperatures and display their average
Plot temperatures on a graph

Can't think of anything
