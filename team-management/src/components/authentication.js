import axios from 'axios';

axios.defaults.withCredentials = true;

const backendUrl = 'http://127.0.0.1:3000';

//USER AND AUTH ROUTES
/*
//SIGNIN
export const signin = user => {
    // API call to sign in a user
    return axios.post("http://localhost:8000/api/signin", JSON.stringify(user), {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        }
    })
    .then(response => {
        return response.data; // Return response data
    })
    .catch(err => {
        return err.response.data; // Return error response data
    })
}
*/

export async function getEmployeesList() {
    try {
        //using axios returns array of objects
        const response = await axios.get(backendUrl + '/addTask');
        console.log("Success");
        return response.data


    } catch (err) {
        //if error getting questions show an error
        /*const error = document.createElement("STRONG");
        error.innerHTML = err.message;
        networkError.insertBefore(error, networkError.firstChild);
        networkError.hidden = false;*/
        console.log(err)
        return err
    }
}

export async function getTasks() {
    try {
        //using axios returns array of objects
        const response = await axios.get(backendUrl + '/dashboard');
        console.log("Success");
        return response.data


    } catch (err) {
        //if error getting questions show an error
        /*const error = document.createElement("STRONG");
        error.innerHTML = err.message;
        networkError.insertBefore(error, networkError.firstChild);
        networkError.hidden = false;*/
        console.log(err)
        return err
    }
}

export async function submitTask(data) {
    try {
        //using axios returns array of objects
        const response = await axios.post(backendUrl + '/addTask', {
            taskname: data.taskName,
            taskdescription: data.taskDescription,
            tasklocation: data.taskLocation,
            taskduedate: data.taskDueDate,
            taskEmployees: data.taskEmployees
        });
        console.log("Success");

        return response
    } catch (err) {

        //if error getting questions show an error
        /*const error = document.createElement("STRONG");
        error.innerHTML = err.message;
        networkError.insertBefore(error, networkError.firstChild);
        networkError.hidden = false;*/
        console.log(err)
    }
}




export async function submitLogin(data) {
    try {
        console.log(data.email, data.password)
        //using axios returns array of objects
        const response = await axios.post(backendUrl + '/login', {
            email: data.email,
            password: data.password
        });
        console.log("Success");
        console.log(response);

        return response


    } catch (err) {
        //if error getting questions show an error
        /*const error = document.createElement("STRONG");
        error.innerHTML = err.message;
        networkError.insertBefore(error, networkError.firstChild);
        networkError.hidden = false;*/
        console.log(err)
    }
}


//SIGNUP
export async function submitSignUp(data) {
    try {
        //using axios returns array of objects
        const response = await axios.post(backendUrl + '/signup', {
            email: data.email,
            password: data.password,
            firstname: data.firstName,
            lastname: data.lastName,
            role: data.role
        });
        console.log("Success");
        console.log(response);
        return response


    } catch (err) {
        //if error getting questions show an error
        /*const error = document.createElement("STRONG");
        error.innerHTML = err.message;
        networkError.insertBefore(error, networkError.firstChild);
        networkError.hidden = false;*/
        console.log(err)
        return err
    }
}




//SETTING THE JWT TOKEN IN USER'S BROWSER
export const authenticate = (data, next) => {
    // Storing JWT token in user's browser
    if (typeof window !== "undefined") {
        localStorage.setItem("jwt", JSON.stringify(data));
        next();
    }
}

//SIGNOUT -> REMOVING JWT TOKEN
export const signout = () => {
    // Removing JWT token upon signout
    if (typeof window !== "undefined") {
        localStorage.removeItem("jwt");

        axios.get("http://localhost:8000/api/signout")
            .then(response => {
                console.log(response.data);
            })
            .catch(err => console.log(err));
    }
};




//VALIDATION IF USER IS SIGNED IN
export const isAuthenticated = () => {
    // Checking if the user is authenticated
    if (typeof window === "undefined") {
        return false
    }
    if (localStorage.getItem("jwt"))
        return JSON.parse(localStorage.getItem("jwt"));
    else
        return false
}