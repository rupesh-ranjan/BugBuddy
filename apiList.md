# BugBuddy APIs

## AuthRouter

-   POST /signup
-   POST /login
-   POST /logout

## ProfileRouter

-   GET /profile/view
-   PATCH /profile/edit
-   PATCH /profile/password

## ConnectionRequestRouter

-   POST /request/send/interested/:userId
-   POST /request/send/rejected/:userId

-   POST /review/send/interested/:userId
-   POST /review/send/rejected/:userId

## UserRouter

-   GET /connections
-   GET /requests/received
-   GET /feed -fetch the profile of other users on platform

Status: ignored, insterested, accepted, rejected
