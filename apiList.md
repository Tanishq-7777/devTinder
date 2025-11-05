# devTiner Api List

## authRouter

-POST /signup
-POST /login
-POST /logout

## profileRouter

-GET /profile/view
-Patch /profile/edit
-Patch /profile/password

## connectionRequestRouter

-POST /request/send/interested/:userId
-POST /request/send/ignored/:userId
-POST /request/send/accepted/:userId
-POST /request/send/rejected/:userId

## userRouter

-GET /user/connection
-GET /user/requests
-GET /user/feed
