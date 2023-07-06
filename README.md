**API flow:**

1. Gọi đến /api/login
2. Gọi đến NextJS server
3. NextJS server mới gọi đến api server

## Learn NextJS - Notes

## `06-09` Show hide menu based on login status

1. Config route list to specify which menu requires login
2. Render route list based on login status
3. Integrate with login and test

## `06-10` add type definition for useAuth

1. Target to have type suggestion when using profile from useAuth()
2. TIP: Organize Imports (Option + Shift + O)

## `06-11` save logged in user info

**Current flow:**

1. On init: useAuth with default data = `undefined`
2. Call API profile and update data = logged in user

**Update flow:**

1. Save user's info to local storage if login successful
2. On init: useAuth with default data = `user info from local storage`
3. Call API profile and update data = logged in user
4. Remove local storage if logout

key: `user_info`

Unexcepted cases handling:

- What if fetch profile failed?

## `06-12` Text content did not match. Server: 'Blog' Client: 'Works'

Process:

1. Sercer side generated HTML (A) and send to client
2. Client get HTML (A) to display on UI and download JS in the background
3. Once JS downloaded, it will be executed. Hydration process take place and generate a new DOM (B). Then it try to match B and A and attach event listener to it.

If A = B --> OK
If A <> B --> Show error message content did not match

Solutions:

- Make sure the first render on client side should be the same with server side
- Use client side rendering via dynamic feature of NextJS (not SEO friendly)

## `06-13` fix issues from video of 06-10

- Can't change tsconfig from jsx: preserve to jsx: react
- Can't safely remove React import due to [this post](https://nextjs.org/docs/upgrading#react-16-to-17)
- Can't use named export with ssr: false --> change to use default import instead

## `06-14` Show login error

- Mock response to return Error instead of success
- How to extract error body from API response
  - Throw error response in axios interceptor
  - Retrieve error message in catch statement
  - Do whatever you want with the message (show toast, log, report error, ...)
  - Add react-toastyfy package
  - Toast error message
