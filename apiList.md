# BugBuddy APIs

## AuthRouter

-   POST /signup
-   POST /login
-   POST /logout

## ProfileRouter

-   GET /profile/view
-   PATCH /profile/update
-   PATCH /profile/password

## ConnectionRequestRouter

-   POST /request/send/:status/:toUserId
-   POST /request/send/interested/:toUserId
-   POST /request/send/rejected/:toUserId

-   POST /review/send/interested/:toUserId
-   POST /review/send/rejected/:toUserId

## UserRouter

-   GET /connections
-   GET /requests/received
-   GET /feed -fetch the profile of other users on platform

Status: ignored, insterested, accepted, rejected
