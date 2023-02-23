# Brainstorming

Task 1
Added a try and catch statement so that execution can still continue even if invalid data is given. This also ensures an error message is still displayed (to account for missing data points during execution without ending the program).

Task 2
Initially I just got the time of each datapoint using Date(), but then noticed there was a timestamp attribute, so I made some slight modifications to use that instead.

Essentially, for the first datapoint, set its timestamp as the start of the interval, run through the data and maintain a count for out of range datapoints.

Once the number of out of range flags hits 3, check how long the interval between the first datapoint and the last is. If it is within 5 seconds, then write to the report.

Reset the counter and start interval once we do this check.
