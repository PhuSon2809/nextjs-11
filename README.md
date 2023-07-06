**API flow:**

1. Gọi đến /api/login
2. Gọi đến NextJS server
3. NextJS server mới gọi đến api server

## `06-11` save logged in user info

**Current flow:**

1. On init: useAuth with default data = `undefined`
2. Call API profile and update data = logged in user

**Update flow:**

1. Save user's info to local storage if login successful
2. On init: useAuth with default data = `user infov from local storage`
3. Call API profile and update data = logged in user
4. Remove local storage if logout

key: `user_info`

Unexcepted cases handling:

- What if fetch profile failed?
