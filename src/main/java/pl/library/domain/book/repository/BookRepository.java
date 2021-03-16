package pl.library.domain.book.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import pl.library.adapters.mysql.model.book.Book;

import java.util.List;

public interface BookRepository extends JpaRepository<Book, Long> {
    @Query(value = "SELECT * FROM books WHERE title LIKE %:phrase% or author LIKE %:phrase% ORDER BY title ASC", nativeQuery = true)
    List<Book> searchAllByTitleOrAuthorLike(@Param("phrase") String phrase);
    List<Book> findAllByGenres(String genre);
    Boolean existsByTitleAndAuthor(String title, String author);
}