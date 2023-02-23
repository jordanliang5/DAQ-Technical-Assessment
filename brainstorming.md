# Brainstorming

Task 1
Added a try and catch statement so that execution can still continue even if invalid data is given. This also ensures an error message is still displayed (to account for missing data points during execution without ending the program).

Task 2
Initially I just got the time of each datapoint using Date(), but then noticed there was a timestamp attribute, so I made some slight modifications to use that instead.

Essentially, for the first datapoint, set its timestamp as the start of the interval, run through the data and maintain a count for out of range datapoints.

Once the number of out of range flags hits 3, check how long the interval between the first datapoint and the last is. If it is within 5 seconds, then write to the report.

Reset the counter and start interval once we do this check.

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
