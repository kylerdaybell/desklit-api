import {User} from "../Models/UserModel";
const bcrypt = require("bcryptjs");

test("UserModel constructor runs properly", () => {
    const user1 = new User(0, "kyler", "1234", "free");
    expect(user1.password).toBe("1234");
    expect(user1.email).toBe("kyler");
    expect(user1.authorization).toBe("user");
});

test("UserModel encrypting passwords returns an object with a properly encrypted password", () => {
    const user1 = new User(0, "kyler", "bobross", "free");
    const user2 = user1.HashPassword();
    expect(bcrypt.compareSync(user1.password, user2.password)).toBe(true);
});

test("UserModel can validate passwords correctly", () => {
    const user1 = new User(0, "kyler", "bobross", "free");
    const passwordmatches = user1.HashPassword().ValidatePassword("bobross");
    expect(passwordmatches).toBe(true);
});
