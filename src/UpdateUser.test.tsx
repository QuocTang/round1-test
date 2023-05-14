import { render, screen } from '@testing-library/react';
import UpdateUser from './pages/User/UpdateUser/UpdateUser';

test('renders Update User component', () => {
    render(<UpdateUser />);
    const linkElement = screen.getByText(/Edit Form/i);
    expect(linkElement).toBeInTheDocument();
});
