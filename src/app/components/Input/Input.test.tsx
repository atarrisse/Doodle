import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Input from './Input';

const props = {
    label: "label",
    id: "id"
};

describe('Input component', () => {
    it('displays the correct value', () => {
        const { getByRole } = render(<Input {...props} value="hello" onChange={() => { } }  />);
        expect(getByRole('textbox')).toHaveValue('hello');
    });

    it('calls onChange when input changes', () => {
        const handleChange = jest.fn();
        const { getByRole } = render(<Input {...props} value="" onChange={handleChange} />);
        fireEvent.change(getByRole('textbox'), { target: { value: 'test' } });
        expect(handleChange).toHaveBeenCalled();
    });

    it('supports placeholder prop', () => {
        const { getByPlaceholderText } = render(
            <Input {...props} value="" onChange={() => {}} placeholder="Type here..." />
        );
        expect(getByPlaceholderText('Type here...')).toBeInTheDocument();
    });
});