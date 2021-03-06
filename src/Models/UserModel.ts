const bcrypt = require("bcryptjs");

export class User {
    public readonly id: number|null;
    public readonly email: string;
    public readonly password: string;
    public readonly authorization: "admin"|"support"|"client"|"unverified";
    public constructor(id: number|null, email: string, password: string, authorization: "admin"|"support"|"client"|"unverified") {
        this.id = id;
        this.email = email;
        this.password = password;
        this.authorization = authorization;
    }
    public HashPassword(): User {
        const hashpassword = bcrypt.hashSync(this.password);
        const passwordhasheduser = new User(null, this.email, hashpassword, this.authorization);
        return passwordhasheduser;
    }
    public ValidatePassword(password: string): boolean {
        return bcrypt.compareSync(password, this.password);
    }

}
