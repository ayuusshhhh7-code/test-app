class WalletService {
  constructor() {
    this.balance = 1; // The "Database"
  }

  async getBalance() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.balance);
      }, 500); // Simulate network delay
    });
  }

  async updateBalance(newAmount) {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.balance = newAmount;
        resolve({ success: true, newBalance: this.balance });
      }, 500); // Simulate network delay
    });
  }
}

export default WalletService;
