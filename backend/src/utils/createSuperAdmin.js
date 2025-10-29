import User from "../models/User.js";

export const createSuperAdmin = async () => {
  try {
    const email = "admin@gmail.com";
    const password = "Usm@n123";
    const name = "Super Admin";

    const exists = await User.findOne({ email });
    if (!exists) {
      const u = new User({ email, password, name });
      await u.save(); // will auto-hash password (thanks to pre('save'))
      console.log(`SuperAdmin created: ${email}`);
    } else {
      console.log(`SuperAdmin already exists: ${email}`);
    }
  } catch (err) {
    console.error("Error creating SuperAdmin:", err.message);
  }
};
