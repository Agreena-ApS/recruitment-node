Backend 

1- .env (NODE_ENV=dev)
2- 'npm i'
3- run 'npm test' to check everything is working fine
4- run 'npm run build'
5- run 'node seeder.js'
6- run 'npm start'


We have an admin user that can access all data and transfer any certificate or change owner. client users can see only available and own certificates also they can transfer heir certificate to other user.
I developed it simply. I haven't added permission, roles, row level security middleware and ...

I did project with mongoDB. In the middle of project I noticed postgres would be better because it's one of the job requirements however, it was late and I had no ime to change it.

client user example: 
username: client1
password: admin

admin user :
username: admin
password: admin

postman collection attached to project and named Agreena.postman_collection.

Test had problem I deleted them I fix it tomorrow.
