// so we will define our constants here
const url = 'https://api.ssactivewear.com/v2/products';

const username = '809298';
const api_key = '1cac2247-e52a-4e93-9de6-add580f4566e';

// now we configure the fetch request to the url endpoint.
// we should probably put it inside a separate function since
// you're using a browser, you probably will bind this request
// to a click event or something.
async function login() {
  const response = await fetch(url, {
    // in the case of a login request most APIs use the POST method offered by
    // RESTful APIs
    method: 'post', // can be 'get', 'put', 'delete', and many more

    // now we set any needed headers specified by the API
    headers: {
      // most APIs I have worked with use
      'Content-Type': 'application/json',
    },

    // because we are using the 'post' method then we will need to add
    // a body to the request with all our data, body excepts a string so
    // we do the following
    body: JSON.stringify({
      username: username,
      password: api_key,
    }),
  });
  // An important thing to note is that an error response will not throw
  // an error so if the result is not okay we should throw the error
  if (!response.ok) {
    throw response;
  }
  return await response.json();
}

((button) => {
  button.addEventListener('click', (event) => {
    // we then call the function here.
    login().then((response) => {
      // side note, you could destructure the response argument as { token }
      // then just reference token instead.

      // recall that we expect this function to have a 'token' key in
      // the response payload...so let us log it just to make sure

      console.log(result.token);
    });
  });
  // we add the button reference as the argument
})(document.querySelector('#submit'));
