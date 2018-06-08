import { Component, OnInit} from '@angular/core';
import { Http , Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { AlignerService } from '../aligner.service';
import { promise } from 'protractor';
import { stringify } from '@angular/compiler/src/util';

@Component({
  selector: 'app-bcv-search',
  templateUrl: './bcv-search.component.html',
  styleUrls: ['./bcv-search.component.css']
})
export class BcvSearchComponent implements OnInit {

  Books:any;
  Chapters:any;
  Verses:any;    
  bookName:any;
  chapterNumber:string;
  bookNumber:string;
  verseNumber:string;
  BCV:any;


  constructor(private _http:Http) { }


  ngOnInit() {
    this._http.get('http://127.0.0.1:5000/alignments/books')
    .subscribe(data => {
      this.Books = data.json().books;
      //console.log (data.json())
    })
  }


  bookChange(x){
    var data = new FormData();
    data.append("bookname", x);    
    this.bookName = x;
    this._http.post('http://127.0.0.1:5000/search/chapternumbers', data)
    .subscribe(data => {
      this.Chapters = data.json().chapter_numbers;
      //console.log (data.json())
    })
  }

  chapterChange(x:string,y){
    var data = new FormData();
    data.append("chapternumber", x);
    data.append("bookname", y);

    this._http.post('http://127.0.0.1:5000/search/versenumbers',data)
    .subscribe(data => {
      this.Verses = data.json().verse_numbers;
      // console.log (data.json())
      enum booknumber {"GEN" = "01","EXO" = "02","LEV" = "03","NUM" = "04","DEU" = "05",
      "JOS" = "06","JDG" = "07","RUT" = "08",'1SA' = "09","2SA" = 10,"1KI" = 11,"2KI" = 12,
      "1CH" = 13,"2CH" = 14,"EZR" = 15,"NEH" = 16,"EST" = 17,"JOB" = 18,"PSA" = 19
      ,"PRO" = 20,"ECC" = 21,"SNG" = 22,"ISA" = 23,"JER" = 24,"LAM" = 25,"EZK" = 26,
      "DAN" = 27,"HOS" = 28,"JOL" = 29,"AMO" = 30,"OBA" = 31,"JON" = 32,"MIC" = 33,
      "NAM" = 34,"HAB" = 35,"ZEP" = 36,"HAG" = 37,"ZEC" = 38,"MAL" = 39,"MAT" = 40,
      "MRK" = 41,"LUK" = 42,"JHN" = 43,"ACT" = 44,"ROM" = 45,"1CO" = 46,"2CO" = 47,
      "GAL" = 48,"EPH" = 49,"PHP" = 50,"COL" = 51,"1TH" = 52,"2TH" = 53,"1TI" = 54,
      "2TI" = 55,"TIT" = 56,"PHM" = 57,"HEB" = 58,"JAS" = 59,"1PE" = 60,"2PE" = 61,
      "1JN" = 62,"2JN" = 63,"3JN" = 64,"JUD" = 65,"REV" = 66};

      this.bookNumber = booknumber[this.bookName];
      //console.log(booknumber[this.bookName]);

      if (x.length > 2){this.chapterNumber = x} 
      else if(x.length >1) {this.chapterNumber  = '0'+ x}
      else if(x.length === 1) {this.chapterNumber = '00'+ x}  ;
      //console.log(this.chapterNumber)
    })
  }

   verseChange(x:string){
    if (x.length > 2){this.verseNumber = x} 
    else if(x.length >1) {this.verseNumber  = '0'+ x}
    else if(x.length === 1) {this.verseNumber = '00'+ x};

    this.BCV = this.bookNumber + this.chapterNumber + this.verseNumber;
  }

  prevOnclick(){
    document.getElementById("saveButton").style.display = "none";
    if(this.chapterNumber && this.verseNumber){
              
              (Number(this.verseNumber) <= this.Verses.length
               && Number(this.verseNumber) > 1) 
               ? this.verseNumber = stringify((Number(this.verseNumber) - 1))
               : this.verseNumber
         
            
            
            let U:string = this.verseNumber;
            if (U.length > 2){this.verseNumber = U} 
            else if(U.length >1) {this.verseNumber  = '0'+ U}
            else if(U.length === 1) {this.verseNumber = '00'+ U};
            //console.log(this.verseNumber)

            //console.log('prev' + this.bookNumber + this.chapterNumber + this.verseNumber);
            this.BCV = this.bookNumber + this.chapterNumber + this.verseNumber;
            //console.log (this.BCV + "  " + "prev")
          }
            
  }

  nextOnClick(){
    document.getElementById("saveButton").style.display = "none";
    (Number(this.verseNumber) < this.Verses.length
    && Number(this.verseNumber) > 0) 
    ? this.verseNumber = stringify((Number(this.verseNumber) + 1))
    : this.verseNumber 
 
    let U:string = this.verseNumber;
    if (U.length > 2){this.verseNumber = U} 
    else if(U.length >1) {this.verseNumber  = '0'+ U}
    else if(U.length === 1) {this.verseNumber = '00'+ U};
    //console.log(this.verseNumber)

    //console.log('prev' + this.bookNumber + this.chapterNumber + this.verseNumber);
    this.BCV = this.bookNumber + this.chapterNumber + this.verseNumber;
    //console.log (this.BCV + "  " + "next")
}

}
