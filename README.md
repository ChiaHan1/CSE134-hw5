# CSE-134-HW5

Name: Chia-Han Chen

PID: A16591859

## Main Page
https://lighthearted-kleicha-3a9982.netlify.app/

## Part 1 - HTTP with JavaScript
https://lighthearted-kleicha-3a9982.netlify.app/hw5/methodtest.html

## Part 2 - Simple Web Component
https://lighthearted-kleicha-3a9982.netlify.app/hw5/webcomponent.html

## Part 3 - Using React / Vue
https://lighthearted-kleicha-3a9982.netlify.app/hw5/extracredit.html


## Notes:
- For part 1, my `POST` and `PUT` do not create `prefligt` request, but my `DELETE` does. I asked Professor Powell during his office hours, and he said that `POST`, `PUT`, and `DELETE` all supposed to create a `preflight` request. He went over my code and tried my demo, but we could not figure out why my `POST` and `PUT` are not doing it whereas my `DELETE` does. He said it is okay for now, but I am still wondering why they are not creating `preflight` request.
- For part 3, both `Vue` and `React` work normally and correctly locally. After the site is deployed to `Netlify`, the button using `Vue` still works. However, it seems that `React` does not work well on `Netlify` all the time, but it does work sometimes. Sometimes, I would need to reload the page a few times to make it work. Also, it makes the page load really slow when it does not work and I would get the below error message:
  > Access to script at 'https://unpkg.com/react-dom/umd/react-dom.development.js' from origin 'https://lighthearted-kleicha-3a9982.netlify.app' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.

    I am also wondering what is causing this problem. I had added `crossorigin`, which I thought it could solve this problem, but the problem still exists.