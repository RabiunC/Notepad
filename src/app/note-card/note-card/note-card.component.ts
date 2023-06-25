import { Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-note-card',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.scss']
})
export class NoteCardComponent implements OnInit {

  @ViewChild('truncator') truncator: ElementRef<HTMLElement>;
  @ViewChild('bodyText') bodyText: ElementRef<HTMLElement>;

  @Input() title: string;
  @Input() body: string;

  constructor(private renderer: Renderer2) { }

  ngOnInit() {/*

    let style = window.getComputedStyle(this.bodyText.nativeElement,null);
    let viewableHeight = parseInt(style.getPropertyValue("height"), 10);

    /*if (this.bodyText.nativeElement.scrollHeight > viewableHeight){
      //If there is text overflow, show the fade out truncator
      this.renderer.setStyle(this.truncator.nativeElement, 'display', 'block');
    }
    else{
      this.renderer.setStyle(this.truncator.nativeElement, 'display', 'none');
    }*/
  }

}
