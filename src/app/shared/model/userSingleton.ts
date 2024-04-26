export class userSingleton{
    private static instance: userSingleton;

    public email!: string;
    public role!: string;

    private constructor() {}

    public static getInstance(): userSingleton
    {
        if(!userSingleton.instance)
            userSingleton.instance = new userSingleton();

        return userSingleton.instance;
    }
}