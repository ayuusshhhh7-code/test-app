import Counter from "./Counter";
import { render, screen, fireEvent } from "@testing-library/react";

describe('Counter', () => {
    it('should render the initial count of 20', () => {
        render(<Counter />);
        expect(screen.getByText('Counter')).toBeInTheDocument();
        expect(screen.getByText('20')).toBeInTheDocument();
    });

    it('should increment the count when + button is clicked', () => {
        render(<Counter />);
        const incrementBtn = screen.getByText('+');
        fireEvent.click(incrementBtn);
        expect(screen.getByText('21')).toBeInTheDocument();
    });

    it('should decrement the count when - button is clicked', () => {
        render(<Counter />);
        const decrementBtn = screen.getByText('-');
        fireEvent.click(decrementBtn);
        expect(screen.getByText('19')).toBeInTheDocument();
    });

    it('should reset the count to 0 when Reset button is click', () => {
        render(<Counter />);
        const resetBtn = screen.getByText('Reset');
        const incrementBtn = screen.getByText('+');
        fireEvent.click(incrementBtn);
        
        fireEvent.click(resetBtn);
        expect(screen.getByText('0')).toBeInTheDocument();
    });
});