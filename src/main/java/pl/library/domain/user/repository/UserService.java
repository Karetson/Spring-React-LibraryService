package pl.library.domain.user.repository;

import pl.library.adapters.mysql.model.user.User;
import pl.library.adapters.mysql.model.user.UserRole;
import pl.library.domain.user.exception.UserExistsException;
import pl.library.domain.user.exception.UserNotFoundException;

import java.util.List;

public interface UserService {
    User getById(Long id) throws UserNotFoundException;
    User getByEmail(String email) throws UserNotFoundException;
    List<User> getAll() throws UserNotFoundException;
    List<User> getByFirstNameOrLastName(String firstName, String lastName) throws UserNotFoundException;
    List<User> getByRole(UserRole role) throws UserNotFoundException;
    User registry(User user) throws UserExistsException;
    User login(String email, String password) throws UserNotFoundException;
    User update(Long id, User user) throws UserNotFoundException, UserExistsException;
    void delete(Long id) throws UserNotFoundException;
}