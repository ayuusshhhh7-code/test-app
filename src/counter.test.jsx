import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from 'vitest';
import Counter from "./Counter";
import WalletService from "./WalletService";
import WalletController from "./WalletController";

// Mock WalletService globally so Counter.jsx uses it
vi.mock('./WalletService', () => {
  return {
    default: class MockWalletService {
      constructor() {
        this.balance = 0;
      }
      async getBalance() { return this.balance; }
      async updateBalance(amount) { 
        this.balance = amount;
        return { success: true, newBalance: this.balance }; 
      }
    }
  };
});

describe('Wallet Logic', () => {
    let service;
    let controller;

    beforeEach(async () => {
        // We can instantiate the mocked service directly for unit tests too
        const MockService = (await import('./WalletService')).default;
        service = new MockService();
        controller = new WalletController(service);
    });

    it('should initialize with 0 balance', async () => {
        const balance = await service.getBalance();
        expect(balance).toBe(0);
    });

    it('should deposit 1 correctly', async () => {
        const result = await controller.deposit(0, 1);
        expect(result.newBalance).toBe(1);
    });

    it('should withdraw 1 correctly', async () => {
        await controller.deposit(0, 1);
        const result = await controller.withdraw(1, 1);
        expect(result.newBalance).toBe(0);
    });

    it('should throw error when depositing 1 above limit (10)', async () => {
        // Simulate wallet being full (10)
        await expect(controller.deposit(10, 1)).rejects.toThrow("Wallet Full");
    });

    it('should throw error when withdrawing 1 below limit (0)', async () => {
        await expect(controller.withdraw(0, 1)).rejects.toThrow("Insufficient Funds");
    });
});

describe('Counter Component', () => {
    it('should render initial loading state', () => {
        render(<Counter />);
        expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    it('should display balance after loading', async () => {
        render(<Counter />);
        await waitFor(() => {
            expect(screen.getByText('$0')).toBeInTheDocument();
        });
    });
});