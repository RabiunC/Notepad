import { trigger, transition, style, animate, query, stagger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Note } from 'src/app/shared/note.model';
import { NotesService } from 'src/app/shared/notes.service';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.scss'],
  animations: [
    trigger('itemAnim', [
      transition('void => *', [
        style({
          height: 0,
          opacity: 0,
          transform: 'scale(0.85)',
          'margin-bottom':0,
          paddingTop:0,
          paddingBottom:0,
          paddingLeft:0,
          paddingRight:0,
        }),
        animate('50ms', style({
          height: '*',
          'margin-bottom': '*',
          paddingTop: '*',
          paddingBottom: '*',
          paddingLeft: '*',
          paddingRight: '*',
        })),
        animate(100)
      ]),

      transition('* => void', [
        animate(50, style({
          transform: 'scale(1.05)'
        })),
        animate(50, style({
          transform: 'scale(1)',
          opacity: 0.75
        })),
        animate('80ms ease-out', style({
          transform: 'scale(0.68)',
          opacity: 0
        })),
        animate('150ms ease-out', style({
          height: 0,
          paddingTop: 0,
          paddingBottom: 0,
          paddingLeft: 0,
          paddingRight: 0,
          'margin-bottom': '0'
        }))
      ])
    ]),

    trigger('listAnim', [
      transition('* => *', [
        query(':enter', [
          style({
            opacity: 0,
            height: 0
          }),
          stagger(100, [
            animate('0.2s ease')
          ])
        ], {
          optional: true
        })
      ])
    ])
  ]
})

export class NotesListComponent implements OnInit {

  //cardTitle: string = 'abc';
  notes: Note[] = new Array<Note>();
  filteredNotes: Note[] = new Array<Note>();

  constructor(private notesService: NotesService) { }

  ngOnInit(): void {
    this.notes = this.notesService.getAll();
    this.filteredNotes = this.notes;
  }

  deleteNote(id: number) {
    this.notesService.delete(id);
  }

  filter(query:string) {
    query = query.toLowerCase().trim();
    let allResults: Note[] = new Array<Note>();
    
    //split the query into individual words
    let terms: string[] = query.split(' ');

    //remove duplicates
    terms = this.removeDuplicates(terms);
    terms.forEach( (term) => {
      let results: Note[] = this.relevantNotes(term);
      allResults = [...allResults, ...results];
    });
    let uniqueResults = this.removeDuplicates(allResults);
    this.filteredNotes = uniqueResults;
  }

  removeDuplicates(arr: Array<any>) {
    let uniqueResults: Set<any> = new Set<any>();
    //loop through the input array and add items to the set

    arr.forEach(e => uniqueResults.add(e));
    return Array.from(uniqueResults);
  }

  relevantNotes(query: string) {
    query = query.toLowerCase().trim();
    let relevantNotes = this.notes.filter(note => {
        if(note.title && note.title.toLowerCase().includes(query)){
          return true;
        }
        if(note.body && note.body.toLowerCase().includes(query)){
          return true;
        }
        return false;
        })    
      return relevantNotes;
    }

}
