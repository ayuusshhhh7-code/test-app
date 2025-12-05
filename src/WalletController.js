class WalletController {
  constructor(walletService) {
    this.walletService = walletService;
  }

  async deposit(currentBalance, amountToAdd) {
    if (amountToAdd <= 0) {
      throw new Error("Amount must be positive");
    }

    const newTotal = currentBalance + amountToAdd;
    if (newTotal > 10) {
      throw new Error("Wallet Full");
    }

    return await this.walletService.updateBalance(newTotal);
  }

  async withdraw(currentBalance, amountToTake) {
    if (amountToTake <= 0) {
      throw new Error("Amount must be positive");
    }

    const newTotal = currentBalance - amountToTake;
    if (newTotal < 0) {
      throw new Error("Insufficient Funds");
    }

    return await this.walletService.updateBalance(newTotal);
  }
}

export default WalletController;
