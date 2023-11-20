import { AfterViewInit, Component, ElementRef, Renderer2, ViewChild } from '@angular/core';


import * as Editor from 'ckeditor5-custom-build/build/ckeditor.js'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  value = 'demo';
  public Editor: any = Editor;

  showEditor = false;

  public config = {
    // plugins: ['Link', 'Bold', 'Italic', 'Undo', 'Redo'],
    // toolbar: ['bold', 'italic', 'link', '|', 'undo', 'redo'],
    link: {
      // autoLink: true,
      addTargetToExternalLinks: true,
    },
    // fontFamily: {
    //   options: [
    //     'default',
    //     'Arial, Helvetica, sans-serif',
    //     'Courier New, Courier, monospace',
    //     'Georgia, serif',
    //     'Lucida Sans Unicode, Lucida Grande, sans-serif',
    //     'Tahoma, Geneva, sans-serif',
    //     'Times New Roman, Times, serif',
    //     'Trebuchet MS, Helvetica, sans-serif',
    //     'Verdana, Geneva, sans-serif',
    //   ],
    //   supportAllValues: false,
    // },
    // fontSize: {
    //   options: [9, 10, 11, 12, 14, 'default', 18, 24, 36, 64],
    //   supportAllValues: true,
    // },
    indentBlock: {
      offset: 4,
      unit: 'em',
    },
    wordCount: {
      onUpdate: (stat: any) => {
          console.log(stat);
      },
    },
    // table: {
    //   contentToolbar: [
    //     'tableColumn',
    //     'tableRow',
    //     'mergeTableCells',
    //     'tableProperties',
    //     'tableCellProperties',
    //   ],

    //   // Set the palettes for tables.
    //   tableProperties: {},

    //   // Set the palettes for table cells.
    //   tableCellProperties: {},
    // },
    // toolbar: {
    //   items: [
    //     'undo',
    //     'redo',
    //     'heading',
    //     'bold',
    //     'italic',
    //     'link',
    //     'bulletedList',
    //     'numberedList',
    //     'indent',
    //     'outdent',
    //     'insertTable',
    //   ],
    // },
    autosave: {},
    removePlugins: [],
  };

  @ViewChild('ckEditor')
  ckEditor!: ElementRef;

  private documentClickListener: any

  constructor(private renderer: Renderer2) {}

  

  ngAfterViewInit(): void {
    // this.Editor.
    // this.ckEditor.change
    this.addDocumentClickListener()
  }

  onClick(event: any) {
    this.showEditor = true;
    event.stopImmediatePropagation();
  }

   // Method to dynamically add document click listener
   addDocumentClickListener(): void {
    this.documentClickListener = this.renderer.listen('document', 'click', (event: Event) => {
      this.finishEditing(event);
    });
  }

  finishEditing(event: any) {
    if (this.showEditor && this.ckEditor?.nativeElement && !this.ckEditor.nativeElement?.contains(event.target)) {
      // Clicked outside CKEditor, handle the event as needed
      console.log('Clicked outside CKEditor');
      this.showEditor = false;
    }
  }

  onReady(params: any) {
    console.log(params);
  }
}
