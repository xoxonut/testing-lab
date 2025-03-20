import { describe, expect, it, vi, beforeEach } from 'vitest'
describe('Todo Service', () => {
  const mockTodo = { id: '1', title: 'Test Todo', status: false };
  const mockTodoBody = { title: 'New Todo', status: false };

  const repo = {
    findAllTodos: vi.fn(),
    createTodo: vi.fn(),
    updateTodoById: vi.fn(),
    deleteTodoById: vi.fn(),
  };

  const getTodos = async () => repo.findAllTodos();
  const addTodo = async (todo: typeof mockTodoBody) => repo.createTodo(todo);
  const updateTodoStatus = async (id: string, status: boolean) =>
    repo.updateTodoById(id, { status });
  const deleteTodo = async (id: string) => repo.deleteTodoById(id);

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getTodos', () => {
    it('should return a list of todos', async () => {
      vi.spyOn(repo, 'findAllTodos').mockResolvedValue([mockTodo]);

      const todos = await getTodos();

      expect(repo.findAllTodos).toHaveBeenCalledTimes(1);
      expect(todos).toEqual([mockTodo]);
    });
  });

  describe('addTodo', () => {
    it('should add a new todo and return it', async () => {
      vi.spyOn(repo, 'createTodo').mockResolvedValue(mockTodo);

      const newTodo = await addTodo(mockTodoBody);

      expect(repo.createTodo).toHaveBeenCalledWith(mockTodoBody);
      expect(newTodo).toEqual(mockTodo);
    });
  });

  describe('updateTodoStatus', () => {
    it('should update the status of a todo and return the updated todo', async () => {
      const updatedTodo = { ...mockTodo, status: true };
      vi.spyOn(repo, 'updateTodoById').mockResolvedValue(updatedTodo);

      const result = await updateTodoStatus('1', true);

      expect(repo.updateTodoById).toHaveBeenCalledWith('1', { status: true });
      expect(result).toEqual(updatedTodo);
    });
  });

  describe('deleteTodo', () => {
    it('should delete a todo and return the result', async () => {
      const mockResult = { acknowledged: true, deletedCount: 1 };
      vi.spyOn(repo, 'deleteTodoById').mockResolvedValue(mockResult);

      const result = await deleteTodo('1');

      expect(repo.deleteTodoById).toHaveBeenCalledWith('1');
      expect(result).toEqual(mockResult);
    });
  });
});