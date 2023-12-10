import {
  AfterViewInit,
  Component,
  ElementRef,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { EditorConfig } from '@ckeditor/ckeditor5-core/src/editor/editorconfig';
// @ts-ignore
import * as Editor from '../../ckeditor5-custom-build/build/ckeditor.js';
import { WordCountService } from './word-count.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  value = 'demo';
  public Editor: any = Editor;

  showEditor = false;

  public config: any = {
    toolbar: {
      items: [
        'undo',
        'redo',
        '|',
        'bold',
        'heading',
        'italic',
        'fontFamily',
        'fontSize',
        'highlight',
        'alignment',
        'bulletedList',
        'numberedList',
        '|',
        'outdent',
        'indent',
        '|',
        'blockQuote',
      ],
    },
    link: {
      addTargetToExternalLinks: true,
    },
    wordCount: {
      onUpdate: (stat: any) => {
        console.log(stat);
      },
    }
  };

  @ViewChild('ckEditor')
  ckEditor!: ElementRef;

  private documentClickListener: any;

  constructor(private renderer: Renderer2, public wordCountService: WordCountService) {}

  ngAfterViewInit(): void {
    
  }

  onClick(event: any) {
    this.showEditor = true;
    event.stopImmediatePropagation();
  }

  // Method to dynamically add document click listener
  addDocumentClickListener(): void {
    this.documentClickListener = this.renderer.listen(
      'document',
      'click',
      (event: Event) => {
        this.finishEditing(event);
        
      }
    );
  }

  finishEditing(event: any) {
    if (
      this.showEditor &&
      this.ckEditor?.nativeElement &&
      !this.ckEditor.nativeElement?.contains(event.target)
    ) {
      // Clicked outside CKEditor, handle the event as needed
      console.log('Clicked outside CKEditor');
      this.showEditor = false;
      console.log(this.wordCountService.getCount(this.value));
      if (this.documentClickListener) {
        this.documentClickListener(); 
        this.documentClickListener = null;
      }
    }
  }
  
  onReady(params: any) {
    console.log(params);
    this.addDocumentClickListener();
  }
}
