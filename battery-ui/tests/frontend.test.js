/*

None of the below works because I had issues getting jest to parse typescript in javascript!
The frustrating part is that I managed to do it for the other unit tests in the streaming-service, 
but the process that I had to go through to do it was really convoluted so I haven't been able to
replicate it.

Nonetheless, the idea below is to simple render a mock of the live_value component, and then feed it mock 
temperature data to see if the displayed colour is correct.

import { render } from '@testing-library/react'
const LiveValue = require('../src/live_value');

describe('Basic frontend tests', () => {
    test ('should display correct colours based on temperature', () => {
        const { page } = render(LiveValue({ temp: 50 }));
        expect(page.getElementByClassName('live-value').toHaveStyle('color: #ff4040'));
    });
});
*/

