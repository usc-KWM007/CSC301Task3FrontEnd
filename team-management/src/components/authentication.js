import axios from 'axios';

const backendUrl = 'http://127.0.0.1:3000';

export async function loggedIn() {
    try {
        //using axios returns array of objects
        const response = await axios.get(backendUrl + '/loggedIn', {withCredentials:true, validateStatus: () => true});
        if (response.status==200 && response.data == "User is authenticated"){
            return true
        }
        else{            
            return false
        }
    } catch (err) {
        return null
    }
}

export async function signOut() {
    try {
        //using axios returns array of objects
        const response = await axios.get(backendUrl + '/signOut', {withCredentials:true});
        return response
    } catch (err) {
        console.log(err)
        return err
    }
}

export async function getEmployeesList() {
    try {
        //using axios returns array of objects
        const response = await axios.get(backendUrl + '/getEmployees', {withCredentials:true});
        return response
    } catch (err) {
        console.log(err)
        return err
    }
}

export async function getTasks() {
    try {
        //using axios returns array of objects
        const response = await axios.get(backendUrl + '/dashboard', {withCredentials:true});
        return response
    } catch (err) {
        console.log(err)
        return err
    }
}

export async function getAccountData() {
    try {
        //using axios returns array of objects
        const response = await axios.get(backendUrl + '/settings', {withCredentials:true});
        return response
    } catch (err) {
        console.log(err)
        return err
    }
}

export async function saveAccountChanges(data) {
    try {
        //const email = data.email
        //using axios returns array of objects
        const response = await axios.put(backendUrl + '/settings', {
            email: data.email.toLowerCase(),
            password: data.password,
            firstname: data.firstName,
            lastname: data.lastName,
            role: data.role
        }, {withCredentials:true});
        return response
    } catch (err) {
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
        }, {withCredentials:true});

        return response
    } catch (err) {
        console.log(err)
        return err
    }
}

export async function submitEditTask(data) {
    try {
        //using axios returns array of objects
        const response = await axios.put(backendUrl + '/editTask', {
            taskid: data.taskId,
            taskname: data.taskName,
            taskdescription: data.taskDescription,
            tasklocation: data.taskLocation,
            taskduedate: data.taskDueDate,
            taskEmployees: data.taskEmployees
        }, {withCredentials:true});
        return response
    } catch (err) {
        console.log(err)
        return err
    }
}

export async function deleteTask(taskData) {
    try {
        //using axios returns array of objects
        const response = await axios.delete(backendUrl + '/dashboard', {
            data: {taskData}
        }, {withCredentials:true});
        return response
    } catch (err) {
        console.log(err)
        return err
    }
}

export async function deleteAccount(email) {
    try {
        //using axios returns array of objects
        const response = await axios.delete(backendUrl + '/settings', {
            data: {email}
        }, {withCredentials:true});
        return response
    } catch (err) {
        console.log(err)
        return err
    }
}



export async function submitLogin(data) {  
    try {
        //using axios returns array of objects
        const response = await axios.post(backendUrl + '/login',{
            email: data.email.toLowerCase(),
            password: data.password,
            
        },{withCredentials:true});
        return response
    } catch (err) {
        console.log(err)
        return err
    }
}


//SIGNUP
export async function submitSignUp(data) {
    try {
        const response = await axios.post(backendUrl + '/signup', {
            email: data.email.toLowerCase(),
            password: data.password,
            firstname: data.firstName,
            lastname: data.lastName,
            role: data.role
        });
        return response
    } catch (err) {
        console.log(err)
        return err
    }
}
