package pl.library.domain.user;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import pl.library.adapters.mysql.model.book.Book;
import pl.library.adapters.mysql.model.user.User;
import pl.library.domain.book.exception.BookNotFoundException;
import pl.library.domain.book.repository.BookRepository;
import pl.library.domain.user.exception.UserExistsException;
import pl.library.domain.user.exception.UserNotFoundException;
import pl.library.domain.user.repository.UserRepository;

import javax.transaction.Transactional;
import java.util.Optional;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class UserService implements UserDetailsService {
    private final UserRepository userRepository;
    private final BookRepository bookRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

        Optional<User> user = userRepository.findByEmail(email);

        user.orElseThrow(() -> new UsernameNotFoundException(email + " not found."));

        return user.map(UserDetailsImpl::new).get();
    }

    public User getUserById(Long id) throws UserNotFoundException {
        return userRepository.findById(id).orElseThrow(()
                -> new UserNotFoundException("User with '" + id + "' ID not found!"));
    }

    public User getUserByEmail(String email) throws UserNotFoundException {
        return userRepository.findByEmail(email).orElseThrow(()
                -> new UserNotFoundException("User with email: '" + email + "' not found!"));
    }

    public User loginUser(String email, String password) throws UserNotFoundException {
        return userRepository.findByEmailAndPassword(email, password).orElseThrow(()
                -> new UserNotFoundException("User with that email and password doesn't exists!"));
    }

    @Transactional
    public User registerUser(User user) throws UserExistsException {
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new UserExistsException("User with '" + user.getEmail() + "' email already exists!");
        } else
            return userRepository.save(user);
    }

    @Transactional
    public User updateUserProfile(Long id, User userDetails) throws UserNotFoundException, UserExistsException {
        User user = userRepository.findById(id).orElseThrow(()
                -> new UserNotFoundException("User with " + id + " ID not found!"));

        user.setFirstName(userDetails.getFirstName());
        user.setLastName(userDetails.getLastName());
        user.setPassword(userDetails.getPassword());
        if (userRepository.existsByEmail(userDetails.getEmail())) {
            throw new UserExistsException("User with '" + userDetails.getEmail() + "' email already exists!");
        } else {
            user.setEmail(userDetails.getEmail());
            return userRepository.save(user);
        }
    }

    @Transactional
    public User addFavoriteBookToUser(Long user_id, Long book_id) throws UserNotFoundException {
        User user = userRepository.findById(user_id).orElseThrow(()
                -> new UserNotFoundException("User with " + user_id + " ID not found!"));
        Book book = bookRepository.findById(book_id).orElseThrow(()
                -> new BookNotFoundException("Book with " + book_id + " ID not found!"));

        Set<Book> favorites = user.getFavoriteBooks();
        favorites.add(book);
        user.setFavoriteBooks(favorites);

        return userRepository.save(user);
    }

    @Transactional
    public void subtractFavoriteBookFromUser(Long user_id, Long book_id) throws UserNotFoundException {
        User user = userRepository.findById(user_id).orElseThrow(()
                -> new UserNotFoundException("User with " + user_id + " ID not found!"));
        Book book = bookRepository.findById(book_id).orElseThrow(()
                -> new BookNotFoundException("Book with " + book_id + " ID not found!"));

        Set<Book> favorites = user.getFavoriteBooks();
        favorites.remove(book);
        user.setFavoriteBooks(favorites);

        userRepository.save(user);
    }
}
