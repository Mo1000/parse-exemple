import Parse from '@/utils/parse'
import {CreateUserModel} from "@/models/user/user.model.ts";

class UserClass extends Parse.User {
    constructor() {
        super(Parse.User)
    }

    private _firstName?: string

    get firstName() {
        return this._firstName
    }

    set firstName(value) {
        this._firstName = value
    }

    private _lastName?: string

    get lastName() {
        return this._lastName
    }

    set lastName(value) {
        this._lastName = value
    }

    private _email?: string

    get email() {
        return this._email
    }

    set email(value) {
        this._email = value
    }

    private _password?: string

    get password() {
        return this._password
    }

    set password(value) {
        this._password = value
    }

    private _gender?: string

    get gender() {
        return this._gender
    }

    set gender(value) {
        this._gender = value
    }

    private _designation?: string

    get designation() {
        return this._designation
    }

    set designation(value) {
        this._designation = value
    }

    private _bio?: string

    get bio() {
        return this._bio
    }

    set bio(value) {
        this._bio = value
    }

    private _profilePhoto?: string

    get profilePhoto() {
        return this._profilePhoto
    }

    set profilePhoto(value) {
        this._profilePhoto = value
    }

    private _location?: string

    get location() {
        return this._location
    }

    set location(value) {
        this._location = value
    }

    private _phone?: string

    get phone() {
        return this._phone
    }

    set phone(value) {
        this._phone = value
    }

    private _resetPasswordToken?: string

    get resetPasswordToken() {
        return this._resetPasswordToken
    }

    set resetPasswordToken(value) {
        this._resetPasswordToken = value
    }

    private _resetPasswordSendAt?: Date

    get resetPasswordSendAt() {
        return this._resetPasswordSendAt
    }

    set resetPasswordSendAt(value) {
        this._resetPasswordSendAt = value
    }

    private _resetPasswordAt?: Date

    get resetPasswordAt() {
        return this._resetPasswordAt
    }

    set resetPasswordAt(value) {
        this._resetPasswordAt = value
    }

    private _website?: string

    get website() {
        return this._website
    }

    set website(value) {
        this._website = value
    }

    private _twitter?: string

    get twitter() {
        return this._twitter
    }

    set twitter(value) {
        this._twitter = value
    }

    private _facebook?: string

    get facebook() {
        return this._facebook
    }

    set facebook(value) {
        this._facebook = value
    }

    private _linkedin?: string

    get linkedin() {
        return this._linkedin
    }

    set linkedin(value) {
        this._linkedin = value
    }

    private _roles?: string[]

    get roles() {
        return this._roles
    }

    set roles(value) {
        this._roles = value
    }

    private _emailConfirmed?: boolean

    get emailConfirmed() {
        return this._emailConfirmed
    }

    set emailConfirmed(value) {
        this._emailConfirmed = value
    }

    private _youtube?: string

    get youtube() {
        return this._youtube
    }

    set youtube(value) {
        this._youtube = value
    }

    static async register(newUser: CreateUserModel) {
        return Parse.Cloud.run('register', newUser)
    }

    /**
     @param {String} _email
     @param {String} _password
     */
    static async loginWithEmail(_email: string, _password: string) {
        const res: Parse.User = await Parse.Cloud.run('login', {email: _email, password: _password})
        await Parse.User.become(res.getSessionToken())
        return res
    }

    static async logout() {
        return Parse.User.logOut()
    }
}

export default UserClass
