package pl.library.domain.book.repository;

import pl.library.adapters.mysql.model.book.Book;

import java.util.List;

public interface BookService {
    List<Book> getAllByPhrase(String phrase);
    List<Book> getAllByGenres(String genre);
    Book addition(Book book);
    Book addAmount(Long id, Integer amount);
    Book subtractAmount(Long id, Integer amount);
    void bookDeletion(Long id);
}