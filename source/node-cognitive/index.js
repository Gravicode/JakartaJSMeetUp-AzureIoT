const cognitiveServices = require('cognitive-services');

const computerVision = cognitiveServices.computerVision({
    API_KEY: "1962967cccbe44ab943f94d5780c7b6a"
});

const parameters = {
    visualFeatures: "Categories"
};
/* Input passed within the POST body. Supported input methods: raw image binary or image URL. 

Input requirements: 

Supported image formats: JPEG, PNG, GIF, BMP. 
Image file size must be less than 4MB.
Image dimensions must be at least 50 x 50.
 */
const body = {"url": "https://mmparanormalromance.files.wordpress.com/2012/05/20064916-seven-some.jpg?w=1024"};


computerVision.analyzeImage({
        parameters,
        body
    })
    .then((response) => {
        console.log('Got response', response);
    })
    .catch((err) => {
        console.error('Encountered error making request:', err);
    });