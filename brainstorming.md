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

If it is, then write to report. Obviously, we now need to set a new interval, so change setNewInterval to true, and it will set the next datapoint as the beginning of a new 5 second interval. This handles the case where we go over 3 failures but the next datapoint is still within 5 seconds (therefore the first if statement is not enough, we need this additional check).

Task 3
Temp range colour

20 30 40 50 60 70 80

40 < temp < 60 green

30 <= temp <= 40 || 60 <= temp <= 70 yellow

20 <= temp <= 30 || 70 <= temp <= 80 yellow

temp < 20 || temp > 80 red

Also say message when out of range:
OUT OF RANGE: Too high/Too low

Could possibly extend by:
Store the last 10 temperatures and display their average
Plot temperatures on a graph

Task 4
Linting: Works. Used superlint because had some issues with base lint
Testing: Works. Had issues with connection remaining open but wrote a function to close it. Wrote some unit tests for the streaming-service.
Unit tests for the frontend I could also do with potentially utilising mock data (check correct colour is displayed), but I
thought I'd prioritise trying to get docker up and running. Without some kind of mock data in place I think testing the frontend isn't really all that useful, given the random nature of the data generation.
If I were to do it, it'd be something along the lines of generating a mock json entry to the server and just checking that the correct colour/message is displayed based on temperature (Don't think I'll have time!)

Docker: Plenty of initial issues here. Most tutorials tell you how to do it for a js file. Found a method where ts is converted to js to be made into
a docker image. Necessitates modifications to package.json and tsconfig.json. Also installed ts-node-dev and rimraf (to clean up built js file
and rebuild it with tsc)

Image and container successfuly created and up and running on port 12000. The problem is it is unable to interact with the other components. Tried setting network_mode to be host but no luck.

Following some guides online, I also have tried setting up two images, a dev environment (which currently builds successfully and can run, docker-compose.dev.yml) and the prod environment (which doesnt build properly, docker-compose.yml). This comes down to the line "COPY --from=development /user/src/app/dist ./dist" being unable to find the dist directory in the given path.

I think this is because dist is not being properly created when "npm run build" is called in the "development" part of the dockerfile. However, I'm not sure why its not making the dist file. I think we can probably make do with just the 'dev' environment for now, I could probably just make it the sole image by getting rid of the dev/production stuff, but I'd rather not break anything else!

Hopefully this is enough!
