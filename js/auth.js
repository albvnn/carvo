// Authentication service
class AuthService {
  constructor() {
    this.users = [];
    this.currentUser = null;
    this.loadUsers();
  }

  loadUsers() {
    const usersJson = localStorage.getItem('users');
    this.users = usersJson ? JSON.parse(usersJson) : [];
  }

  saveUsers() {
    localStorage.setItem('users', JSON.stringify(this.users));
    return true;
  }

  register(email, password, name) {
    this.loadUsers();
    if (this.users.some(user => user.email === email)) {
      throw new Error('User already exists');
    }

    const newUser = {
      id: Date.now().toString(),
      email,
      password, // In a real app, this should be hashed
      name,
      createdAt: new Date().toISOString()
    };

    this.users.push(newUser);
    this.saveUsers();
    this.currentUser = { ...newUser };
    delete this.currentUser.password;
    return this.currentUser;
  }

  login(email, password) {
    this.loadUsers();
    const user = this.users.find(u => u.email === email && u.password === password);
    if (!user) {
      throw new Error('Invalid credentials');
    }
    this.currentUser = { ...user };
    delete this.currentUser.password;
    return this.currentUser;
  }

  logout() {
    this.currentUser = null;
  }

  isAuthenticated() {
    return !!this.currentUser;
  }

  getCurrentUser() {
    return this.currentUser;
  }
}

// Create a singleton instance
const authService = new AuthService();
export default authService; 