# Anywhere Fitness API
Heroku deployment https://anywhere-fitness.herokuapp.com/

### Endpoints

#### POST Register
`https://anywhere-fitness.herokuapp.com/auth/register`

```
{
	"username": "new_user",
	"password": "pass",
	"instructor": true
}
```

#### POST Login
`https://anywhere-fitness.herokuapp.com/auth/login`
```
{
	"username": "new_user",
	"password": "pass"
}
```

#### On Login and Register You Will Receive a Token

```
{
  "id": 3,
  "instructor": "false"
  "token": "eyJhbGciOiJ3ODQ0MX0.6es5Q9hZJw5U8a5EyWucbMM60xRoGX5_U3kQQ5BVPH0"
}
```


#### GET Classes
`https://anywhere-fitness.herokuapp.com/classes`

```
{
    "id": 1,
    "name": "CrossFit",
    "schedule": "Thursday & Saturday 11:00 AM",
    "location": "123 Main Street",
    "image": null,
    "instructor_id": 1
  },
  {
    "id": 2,
    "name": "Tai-Chi",
    "schedule": "Saturday 11:00 AM",
    "location": "456 Parker Ave",
    "image": null,
    "instructor_id": 3
  }
  ```
#### GET Classes by ID  
`https://anywhere-fitness.herokuapp.com/classes/:id`


#### GET Clients by Class ID
`https://anywhere-fitness.herokuapp.com/classes/:id/list`

On Success Returns Array of Users

```
[
  {
    "id": 2,
    "username": "workout_warrior_1",
    "uses_remaining": 10
  }
]
```

#### GET Classes by Instructor
`https://anywhere-fitness.herokuapp.com/classes/instructor/:id`

#### GET Classes by Client
`https://anywhere-fitness.herokuapp.com/classes/client/:id`

#### POST Class
`https://anywhere-fitness.herokuapp.com/classes`
```

{
	"name" : "KickBoxing",
	"schedule" : "Tues & Thurs 3PM",
	"location": "201 Baker St"
}
```
#### DELETE Class
`https://anywhere-fitness.herokuapp.com/classes/:id`

On Success
```
{
  "message": "class deleted"
}
```
On Failure
```
{
  "message": "error removing class either not authorized or class does not exist"
}
```
