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

-POST /request/send/:status/:userId//ignored or interested
-POST /request/review/:status/:userId//accepted or rejected

## userRouter

-GET /user/connection
-GET /user/requests
-GET /user/feed
