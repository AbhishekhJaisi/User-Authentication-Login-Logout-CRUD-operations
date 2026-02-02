1. Registering a USER for the first time process.

// Save to database
await User.create(userData);
```
**Correct!** ✅
- Save all the data (with hashed password) to MongoDB

---

## Complete Flow You Understood:
```
User fills form → Sends data to backend
                        ↓
                validateUser() checks data
                        ↓
                Hash the password
                        ↓
        Create userData object (all info + hashed password)
                        ↓
                Save to MongoDB
                        ↓
            Send success response