import connectAPI from "@/services/connectAPI";

export default{
    example(email, password) {
        return connectAPI.post('/login', {
            email: email,
            password: password,

        })
    },
}