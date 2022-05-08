To start the development server
# npm run dev

To build the production bundle
# npm run build
To start the production server
# npm run start

To add users in mongodb with development server
# npm run addUsersTs 
To add users in mongodb with productions server
# npm run addUsersJs

[Note] 
By default the allowed front end url is "http://localhost:4200"

/auth/register (post) for registering users and sending them a mail for verification purpose
/auth/verify (get) for actually verifying the users and after verifying saving them in database

/home/get_users (get) for getting users
    params=> [sort=dec for descending order by age(By default as mentioned in the given task,
            name(string type) for searching users by name
            page(int type) for getting user for a perticular page number)]

