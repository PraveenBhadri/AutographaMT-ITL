export class GlobalUrl {

    // For developement environment

    /*

    //In case of get request this api Returns list of positional pairs, list of Hindi words, list of strong numbers for the bcv queried. 
    // and in case of post it updates the corresponding Verses alignments as per the corrections made by user.
    getnUpdateBCV : string = 'http://127.0.0.1:5000/v2/alignments';

    // Returns a list of books whose alignments are available
    getBooks : string = 'http://127.0.0.1:5000/v2/alignments/books';

    //Returns a list of chapter number of the book queried.
    getChapters : string = 'http://127.0.0.1:5000/v2/alignments/chapternumbers/';

    //Returns a list containing the verse numbers for the particular chapter number of a book.
    getVerses : string = 'http://127.0.0.1:5000/v2/alignments/versenumbers/';   

    */
    

    
    // For Production Environment
    //In case of get request this api Returns list of positional pairs, list of Hindi words, list of strong numbers for the bcv queried. 
    // and in case of post it updates the corresponding Verses alignments as per the corrections made by user.
    getnUpdateBCV : string = 'https://stagingapi.autographamt.com/v2/alignments';

    // Returns a list of books whose alignments are available
    getBooks : string = 'https://stagingapi.autographamt.com/v2/alignments/books';

    //Returns a list of chapter number of the book queried.
    getChapters : string = 'https://stagingapi.autographamt.com/v2/alignments/chapternumbers/';

    //Returns a list containing the verse numbers for the particular chapter number of a book.
    getVerses : string = 'https://stagingapi.autographamt.com/v2/alignments/versenumbers/';   

}