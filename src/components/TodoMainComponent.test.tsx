import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import TodoMainComponent from './TodoMainComponent';
import '@testing-library/jest-dom';

describe('TodoMainComponent', () => {
  test('добавление задачи', () => {
    render(<TodoMainComponent />);
    const input = screen.getByPlaceholderText(/добавить задачу/i);
    fireEvent.change(input, { target: { value: 'Тестовая задача' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
    expect(screen.getByText('Тестовая задача')).toBeInTheDocument();
  });

  test('переключение статуса задачи', () => {
    render(<TodoMainComponent />);
    const input = screen.getByPlaceholderText(/добавить задачу/i);
    fireEvent.change(input, { target: { value: 'Задача' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

    const checkbox = screen.getByText('Задача').closest('li')?.querySelector('span');
    expect(checkbox).not.toBeNull();
    if (checkbox) fireEvent.click(checkbox);

    expect(screen.getByText('Задача')).toHaveStyle('text-decoration: line-through');
  });

  test('фильтрация задач', async () => {
    render(<TodoMainComponent />);
    const input = screen.getByPlaceholderText(/добавить задачу/i);
    fireEvent.change(input, { target: { value: 'Активная' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
    fireEvent.change(input, { target: { value: 'Выполненная' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
    const doneLi = Array.from(document.querySelectorAll('li')).find(li => li.textContent?.includes('Выполненная'));
    const doneCheckbox = doneLi?.querySelector('span');
    expect(doneCheckbox).not.toBeNull();
    if (doneCheckbox) fireEvent.click(doneCheckbox);
    fireEvent.click(screen.getAllByText('Completed')[0]);
    await screen.findByText('Выполненная');
    expect(screen.queryByText('Активная')).not.toBeInTheDocument();
    fireEvent.click(screen.getAllByText('Active')[0]);
    await screen.findByText('Активная');
    expect(screen.queryByText('Выполненная')).not.toBeInTheDocument();
  });

  test('очистка выполненных задач', async () => {
    render(<TodoMainComponent />);
    const input = screen.getByPlaceholderText(/добавить задачу/i);
    fireEvent.change(input, { target: { value: 'Выполнить' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
    const li = Array.from(document.querySelectorAll('li')).find(li => li.textContent?.includes('Выполнить'));
    const checkbox = li?.querySelector('span');
    expect(checkbox).not.toBeNull();
    if (checkbox) fireEvent.click(checkbox);
    fireEvent.click(screen.getByText(/Clear completed/i));
    await waitFor(() => {
      expect(screen.queryByText('Выполнить')).not.toBeInTheDocument();
    });
  });

  test('отображение сообщения о пустом списке', () => {
    render(<TodoMainComponent />);
    fireEvent.click(screen.getAllByText('Completed')[0]);
    expect(screen.getByText(/No completed tasks/i)).toBeInTheDocument();
    fireEvent.click(screen.getAllByText('Active')[0]);
    expect(screen.getByText(/No active tasks/i)).toBeInTheDocument();
  });
}); 