package pl.library.domain.user.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.library.adapters.mysql.model.user.User;
import pl.library.adapters.mysql.model.user.UserRole;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    List<User> findByFirstNameOrLastName(String firstName, String lastName);
    List<User> findByRole(UserRole role);
    Boolean existsByEmail(String email);
    Optional<User> findByEmailAndPassword(String email, String password);
}